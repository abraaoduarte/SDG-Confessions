import bcrypt from 'bcrypt';
import { has } from 'ramda';
import User from '../../../infrastructure/schemas/user.schema';

class AuthController {
  static authetication(req, res, next) {

    return User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.redirect('/login');
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
          AuthController.createSession(req, user);
          console.log('teste: ');
          return res.redirect('/home');
        }

        return res.redirect('/login');
      })
      .catch((error) => {
        return res.send(`Um erro ocorreu! ${error.message}`);
      });
  }

  static createSession(req, user) {
    return req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      active: user.active,
    };
  }

  static isLogged (req, res, next) {

    if (has('session', req) && has('user', req.session)) {
      return User.findOne({ email: req.body.email })
        .then(() => next())
        .catch(() => res.redirect('/login'));
    }

    return res.redirect('/login');

  }

  static logout (req, res, next) {
    req.session.destroy();

    return res.redirect('/login');
  }

}

export default AuthController;