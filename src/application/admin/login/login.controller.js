import { has } from 'ramda';
class LoginController {
  static login(req, res, next) {

    //req.session.destroy();

    if (has('session', req) && has('user', req.session))
      return res.redirect('/admin/home');

    res.render('login', {
      layout: false
    });
  }
}

export default LoginController;