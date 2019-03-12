import Confession from '../../../infrastructure/schemas/confession.schema';

class ConfessionController {
  static list(req, res, next) {
    res.render('confissoes/index');
  }
}

export default ConfessionController;