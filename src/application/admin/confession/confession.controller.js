import Confession from '../../../infrastructure/schemas/confession.schema';

class ConfessionController {
  static async list(req, res, next) {
    const confessions = await Confession.find({ active: true });

    console.log('confessios', confessions);
    res.render('confissoes/index', {confessions: confessions});
  }
}

export default ConfessionController;