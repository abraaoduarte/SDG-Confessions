import express from 'express';
import Confession from './confession.controller';

let router = express.Router();

router.get('/', Confession.list);
router.get('/:id', Confession.show);
router.post('/', Confession.create);
router.put('/:id', Confession.update);
router.patch('/:id', Confession.update);
router.delete('/:id', Confession.delete);

module.exports = router;
