import catchAsyncErrors from './catch-async-errors';

const IGNORED_PROPERTIES = [
  'length',
  'name',
  'prototype',
];

export default function composeController(controller) {
  const staticMethods = Object.getOwnPropertyNames(controller);
  staticMethods.forEach((method) => {
    if (!IGNORED_PROPERTIES.includes(method)) {
      controller[method] = catchAsyncErrors(controller[method]);
    }
  });

  return controller;
}
