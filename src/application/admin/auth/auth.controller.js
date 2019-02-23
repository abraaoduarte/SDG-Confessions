import bcrypt from 'bcrypt';
import User from '../../../infrastructure/schemas/user.schema';

class AuthController {
  static authetication(req, res, next) {

    return User.findOne({ email: req.body.email })
      .then((user) => {

        if (bcrypt.compareSync(req.body.password, user.password)) {
          return res.send('Você conseguiu, você venceu!');
        }

        res.send('Senha incorreta');
      })
      .catch((error) => {
        res.send('Usuário não encontrado!');
      });

  }
}

export default AuthController;