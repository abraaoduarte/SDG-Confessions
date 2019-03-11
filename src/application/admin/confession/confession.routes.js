import express from 'express';
import Confession from './confession.controller';
import Authentication from '../application/admin/auth/auth.controller';
let router = express.Router();

router.get('/', Authentication.isLogged, Confession.list);

module.exports = router;
