import Confession from '../../../infrastructure/schemas/confession.schema';

class ConfessionController {
  static async list(req, res, next) {
    const confessions = await Confession.find({ active: true });

    res.render('confissoes/index', {confessions: confessions});
  }

  static create(req, res, next) {
    res.render('confissoes/create');
  }

  static store(req, res, next) {
    const confession = new Confession({
      title: req.body.nome,
      author: req.session.user.id
    });

    const error = confession.validateSync();

    if (error) {
      res.render('confissoes/create');

    }

    return confession.save()
      .then(() => {
        res.flash('info', 'Categoria criada com sucesso!')

        return res.redirect('/admin/confissoes');
      });
  }

  static async edit(req, res, next) {
    const confession = await Confession.findById(req.params.id);

    res.render('confissoes/edit', {confession: confession});
  }

  static update(req, res, next) {
    return Confession.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    )
      .then(() => {
        res.flash('info', 'Categoria atualizada com sucesso!')

        return res.redirect('/admin/confissoes');
      })
  }

  static delete(req, res, next) {
    return Confession.deleteOne({ _id: req.params.id })
      .then(() => {
        res.flash('error', 'Categoria apagada com sucesso!')

        return res.redirect('/admin/confissoes');
      });
  }
}

export default ConfessionController;