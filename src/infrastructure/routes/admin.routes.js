import express from 'express';
import dashboard from '../../application/admin/dashboard/dashboard.routes';
import Authentication from '../../application/admin/auth/auth.controller';
import confession from '../../application/admin/confession/confession.routes';
import chapter from '../../application/admin/chapter/chapter.routes';

let router = express.Router();

router.use('/home', Authentication.isLogged, dashboard);
router.use('/confissoes', Authentication.isLogged, confession);
router.use('/capitulos', Authentication.isLogged, chapter);

export default router;
