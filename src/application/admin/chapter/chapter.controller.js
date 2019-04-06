import Confession from '../../../infrastructure/schemas/confession.schema';
import { head } from 'ramda';

class ChapterController {
  static async list(req, res, next) {
    const confession = await Confession.find({
      active: true,
      _id: req.query.id
    });

    const confessions = await Confession.find({
      active: true,
    });

    res.render('capitulos/index', {
      confession: head(confession),
      confessions: confessions,
    });
  }

  static async create(req, res, next) {
    const confessions = await Confession.find({
      active: true,
    });

    res.render('capitulos/create', {
      confessions: confessions,
      params: req.params
    });
  }

  static store(req, res, next) {
    const chapter = {
      name: req.body.name,
      order: req.body.order,
    };

    return Confession.findOneAndUpdate(
      { _id: req.body.confession_id },
      {
        $push: {'chapters': chapter }
      },
      { runValidators: true }
    )
    .then(() => {
      res.flash('info', 'Capítulo criado com sucesso!')

      res.redirect(`/admin/capitulos?id=${req.body.confession_id}`);
    })
    .catch((error) => {
      res.redirect(`/admin/capitulos/index?id=${req.body.confession_id}`);
    });

  }

  static async edit(req, res, next) {
    const confession = await Confession.findOne({
      _id: req.params.confession_id,
      "chapters._id": req.params.chapter_id},
      {"chapters.$": 1}
    )

    const confessions = await Confession.find({
      active: true,
    });

    const chapter = head(confession.chapters);

    res.render('capitulos/edit', {
      chapter: chapter,
      params: req.params,
      confessions: confessions,
    });
  }

  static update(req, res, next) {
    return Confession.updateOne(
      {
        _id: req.body.confession_id,
        'chapters._id': req.params.id
      },
      {
        "$set": {
          "chapters.$.name": req.body.name,
          "chapters.$.order": req.body.order,
        }
    },
      { runValidators: true }
    )
      .then(() => {
        res.flash('info', 'Categoria atualizada com sucesso!')

        res.redirect(`/admin/capitulos?id=${head(req.body.confession_id)}`);
      })
  }

  static delete(req, res, next) {

    Confession.findOneAndUpdate(
      { _id: req.body.confession_id },
      { $pull: { chapters: { _id: req.params.id } } }
    )
    .then(() => {
      res.flash('error', 'Capítulo deletado com sucesso!')

      res.redirect(`/admin/capitulos?id=${req.body.confession_id}`);
    })
    .catch((error) => {
      res.flash('error', `Um erro ocorreu. ${error}`)

      res.redirect(`/admin/capitulos/index?id=${req.body.confession_id}`);
    });
    /*
    return Confession.deleteOne({ _id: req.params.id })
      .then(() => {
        res.flash('error', 'Categoria apagada com sucesso!')

        return res.redirect('/admin/confissoes');
      });*/
  }
}

export default ChapterController;