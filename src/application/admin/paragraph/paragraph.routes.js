import express from 'express';
import Paragraph from './paragraph.controller';

let router = express.Router();

router.get('/', Paragraph.list);
router.get('/create/:id?', Paragraph.create);
router.get('/edit/:confession_id/:chapter_id', Paragraph.edit);
router.put('/update/:id', Paragraph.update);
router.post('/store', Paragraph.store);
router.delete('/delete/:id', Paragraph.delete);

module.exports = router;
