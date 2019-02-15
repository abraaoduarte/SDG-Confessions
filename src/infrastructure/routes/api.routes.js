import express from 'express';
import user from '../../application/api/user/user.routes';
import confession from '../../application/api/confession/confession.routes';
import chapter from '../../application/api/chapter/chapter.routes';
import paragraph from '../../application/api/paragraph/paragraph.routes';

let router = express.Router();

router.use('/users', user);
router.use('/confessions', confession);
router.use('/chapters', chapter);
router.use('/paragraphs', paragraph);

export default router;
