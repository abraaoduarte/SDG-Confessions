import express from 'express';
import User from './user.controller';

let router = express.Router();

router.get('/', User.list);
router.get('/:id', User.show);
router.post('/', User.create);
router.put('/:id', User.update);
router.patch('/:id', User.update);
router.delete('/:id', User.delete);

module.exports = router;
