class LoginController {
  static login(req, res, next) {

    res.render('login', {
      layout: false
    });
  }
}

export default LoginController;