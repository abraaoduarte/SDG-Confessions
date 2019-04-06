import express from 'express';
import Chapter from './chapter.controller';

let router = express.Router();

router.get('/', Chapter.list);
router.get('/create/:id?', Chapter.create);
router.get('/edit/:confession_id/:chapter_id', Chapter.edit);
router.put('/update/:id', Chapter.update);
router.post('/store', Chapter.store);
router.delete('/delete/:id', Chapter.delete);

module.exports = router;
