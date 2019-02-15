import express from 'express';
import Paragraph from './paragraph.controller';

let router = express.Router();

router.get('/', Paragraph.list);
router.get('/:id', Paragraph.show);
router.post('/', Paragraph.create);
router.put('/:id', Paragraph.update);
router.patch('/:id', Paragraph.update);
router.delete('/:id', Paragraph.delete);

module.exports = router;
