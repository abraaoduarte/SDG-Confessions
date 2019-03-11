import Confession from '../../../infrastructure/schemas/confession.schema';

class ConfessionController {
  static list(req, res, next) {
    res.render('home');
  }
}

export default ConfessionController;