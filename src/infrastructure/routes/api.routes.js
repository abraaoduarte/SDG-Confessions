import express from 'express';
import user from '../../application/api/user/user.routes';

let router = express.Router();

router.use('/users', user);

export default router;
