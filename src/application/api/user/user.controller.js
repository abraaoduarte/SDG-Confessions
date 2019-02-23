import bcrypt from 'bcrypt';
import { NotFound } from 'httperrors';
import User from '../../../infrastructure/schemas/user.schema';
import composeController from '../../../infrastructure/helpers/compose-controller';

class UserController {
  static list(req, res, next) {
    return User.find()
      .then((users) => {
        res.status(200).responseComposer(users);
      });
  }

  static show(req, res, next) {
    return User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return next(new NotFound(`No User with id [${req.params.id}] was found`));
        }

        res.status(200).responseComposer(user);
      });
  }

  static create(req, res, next) {
    const hash = bcrypt.hashSync(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      password: hash,
      email: req.body.email
    });

    const error = user.validateSync();

    if (error) {
      return res.status(422).send({
        success: false,
        data: error.errors,
        message: error.toString(),
      });

    }

    return user.save()
      .then((user) => {
        res.status(200).responseComposer(user);
      });
  }

  static update(req, res, next) {
    return User.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    )
      .then((user) => {
        res.status(200).responseComposer(user);
      })
  }

  static delete(req, res, next) {
    return User.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(204).send();
      });
  }
}

export default composeController(UserController);
