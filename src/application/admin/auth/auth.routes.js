import express from 'express';
import Auth from './auth.controller';

let router = express.Router();

router.post('/', Auth.authetication.bind(Auth));
router.get('/logout', Auth.logout.bind(Auth));

module.exports = router;
