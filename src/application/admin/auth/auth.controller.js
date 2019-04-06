import bcrypt from 'bcrypt';
import { has } from 'ramda';
import User from '../../../infrastructure/schemas/user.schema';
import controller from 'infrastructure/utils/compose-controller';

const authetication = () => async (req, res) => {

  return User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.flash('error', 'Usuário não encontrado!')

        return res.redirect('/login');
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        createSession(req, user);

        return res.redirect('/admin/home');
      }

      res.flash('error', 'Senha incorreta!')

      return res.redirect('/login');
    })
    .catch((error) => {
      return res.send(`Um erro ocorreu! ${error.message}`);
    });
};

const createSession = async (req, user) => {
  return req.session.user = {
    id: user._id,
    name: user.name,
    email: user.email,
    admin: user.admin,
    active: user.active,
  };
};

const isLogged = () => async (req, res, next) => {

  if (has('session', req) && has('user', req.session)) {
    return await User.findOne({ email: req.body.email })
      .then(() => {
        return next()
      })
      .catch(() => {
        return res.redirect('/login')
      });
  }

  return res.redirect('/login');

};

const logout = () => async (req, res) => {
  req.session.destroy();

  return res.redirect('/login');
}
class AuthController {}

AuthController.authetication = authetication();
AuthController.isLogged = isLogged();
AuthController.logout = logout();

export default controller(AuthController);