import express from 'express';
import Confession from './confession.controller';

let router = express.Router();

router.get('/', Confession.list);
router.get('/create', Confession.create);
router.get('/edit/:id', Confession.edit);
router.put('/update/:id', Confession.update);
router.post('/store', Confession.store);
router.delete('/delete/:id', Confession.delete);

module.exports = router;
