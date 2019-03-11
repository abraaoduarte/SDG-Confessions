import express from 'express';
import login from '../../application/admin/login/login.routes';
import auth from '../../application/admin/auth/auth.routes';
import dashboard from '../../application/admin/dashboard/dashboard.routes';
import Authentication from '../../application/admin/auth/auth.controller';
import confession from '../../application/admin/confession/confession.controller';

let router = express.Router();

router.use('/login', login);
router.use('/auth', auth);
router.use('/home', Authentication.isLogged, dashboard);
router.use('/admin/confissoes', Authentication.isLogged, confession);

export default router;
