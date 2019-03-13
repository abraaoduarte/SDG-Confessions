import express from 'express';
import Confession from './confession.controller';

let router = express.Router();

router.get('/', Confession.list);
router.get('/create', Confession.create);

module.exports = router;
