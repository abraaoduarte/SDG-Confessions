import { NotFound } from 'httperrors';
import Confession from '../../../infrastructure/schemas/confession.schema';
import composeController from '../../../infrastructure/helpers/compose-controller';

class ChapterController {
  static list(req, res, next) {
    return Confession.find()
      .then((confessions) => {
        res.status(200).responseComposer(confessions);
      });
  }

  static show(req, res, next) {
    return Confession.findById(req.params.id)
      .then((confession) => {
        if (!confession) {
          return next(new NotFound(`No Confession with id [${req.params.id}] was found`));
        }

        res.status(200).responseComposer(confession);
      });
  }

  static create(req, res, next) {

    const chapter = {
      name: req.body.name,
      order: req.body.order
    };

    return Confession.findByIdAndUpdate(
      { _id: req.body.confession_id },
      {
        $push: {'chapters': chapter }
      },
      { runValidators: true }
    )
    .then((confession) => {
      res.status(200).responseComposer(confession);
    });

    return confession.save()
      .then((confession) => {
        res.status(200).responseComposer(confession);
      });
  }

  static update(req, res, next) {
    return Confession.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    )
      .then((confession) => {
        res.status(200).responseComposer(confession);
      })
  }

  static delete(req, res, next) {
    return Confession.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(204).send();
      });
  }
}

export default composeController(ChapterController);
