import express from 'express';
import Chapter from './chapter.controller';

let router = express.Router();

router.get('/', Chapter.list);
router.get('/:id', Chapter.show);
router.post('/', Chapter.create);
router.put('/:id', Chapter.update);
router.patch('/:id', Chapter.update);
router.delete('/:id', Chapter.delete);

module.exports = router;
