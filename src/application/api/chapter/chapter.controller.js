import { NotFound } from 'httperrors';
import Chapter from '../../../infrastructure/schemas/chapter.schema';
import Confession from '../../../infrastructure/schemas/confession.schema';
import composeController from '../../../infrastructure/helpers/compose-controller';

class ChapterController {
  static list(req, res, next) {
    return Chapter.find()
      .then((chapters) => {
        res.status(200).responseComposer(chapters);
      });
  }

  static show(req, res, next) {
    return Chapter.findById(req.params.id)
      .then((chapter) => {
        if (!chapter) {
          return next(new NotFound(`No Chapter with id [${req.params.id}] was found`));
        }

        res.status(200).responseComposer(chapter);
      });
  }

  static async create(req, res, next) {
    const confession = await Confession.findById(req.body.confession.confession_id);

    const chapter = new Chapter({
      title: req.body.title,
      order: req.body.order,
      confession: {
        confession_id: confession._id,
        title: confession.title,
      }
    });

    const error = chapter.validateSync();

    if (error) {
      return res.status(422).send({
        success: false,
        data: error.errors,
        message: error.toString(),
      });

    }

    return chapter.save()
      .then(async (chapter) => {

        const confessionChapter = [{
          _id: chapter._id,
          title: chapter.title,
          order: chapter.order
        }];

        await Confession.updateOne(
          { _id: confession._id },
          { $push: { chapters: confessionChapter } },
          { runValidators: true }
        );

        res.status(200).responseComposer(chapter);
      });
  }

  static update(req, res, next) {
    return Chapter.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    )
      .then((chapter) => {
        res.status(200).responseComposer(chapter);
      })
  }

  static delete(req, res, next) {
    return Chapter.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(204).send();
      });
  }
}

export default composeController(ChapterController);
