import express from 'express';
import login from '../../application/admin/login/login.routes';
import auth from '../../application/admin/auth/auth.routes';

let router = express.Router();

router.use('/login', login);
router.use('/auth', auth);

export default router;
