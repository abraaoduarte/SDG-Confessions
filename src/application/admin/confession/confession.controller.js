import Confession from '../../../infrastructure/schemas/confession.schema';

class ConfessionController {
  static async list(req, res, next) {
    const confessions = await Confession.find({ active: true });

    res.render('confissoes/index', {confessions: confessions});
  }

  static create(req, res, next) {
    res.render('confissoes/create');
  }
}

export default ConfessionController;