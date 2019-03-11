import express from 'express';
import Auth from './auth.controller';

let router = express.Router();

router.post('/', Auth.authetication);
router.get('/logout', Auth.logout);

module.exports = router;
