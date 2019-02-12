import mongoose from 'mongoose';

const { ValidationError } = mongoose.Document;

export default function catchAsyncErrors(fn) {
  return (req, res, next) => {
    const routePromise = fn(req, res, next);
    if (routePromise.catch) {
      routePromise.catch(err => {
        if (err instanceof ValidationError) {
          return res.status(422).send({
            success: false,
            data: err.errors,
            message: err.toString(),
          });
        }

        next(err);
      });
    }
  }
}
