import express from 'express';
import DashBoard from './dashboard.controller';

let router = express.Router();

router.get('/', DashBoard.home);

module.exports = router;
