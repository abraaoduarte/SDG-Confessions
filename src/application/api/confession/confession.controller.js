import { NotFound } from 'httperrors';
import Confession from '../../../infrastructure/schemas/confession.schema';
import composeController from '../../../infrastructure/helpers/compose-controller';

class ConfessionController {
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
    const confession = new Confession({
      title: req.body.title,
      author: req.body.author
    });

    const error = confession.validateSync();

    if (error) {
      return res.status(422).send({
        success: false,
        data: error.errors,
        message: error.toString(),
      });

    }

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

export default composeController(ConfessionController);
