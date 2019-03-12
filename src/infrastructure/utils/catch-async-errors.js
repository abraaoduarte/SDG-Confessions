export default function catchAsyncErrors(fn) {
  return (req, res, next) => {
    const routePromise = fn(req, res, next);
    if (routePromise && routePromise.catch) {
      routePromise.catch((err) => {
        console.log(err);
        next(err);
      });
    }
  };
}
