import express from 'express';
import login from '../../application/admin/login/login.routes';
import auth from '../../application/admin/auth/auth.routes';
import dashboard from '../../application/admin/dashboard/dashboard.routes';
import Auth from '../../application/admin/auth/auth.controller';

let router = express.Router();

router.use('/login', login);
router.use('/auth', auth);
router.use('/home', Auth.isLogged, dashboard);

export default router;
