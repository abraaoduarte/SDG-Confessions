import express from 'express';
import Login from './login.controller';

let router = express.Router();

router.get('/', Login.login);

module.exports = router;
