import express from 'express';
let router = express.Router();

router.get('/', function (req, res) {
  res.render('home', {layout: 'layout'});
});

export default router;
