import { Router } from 'express';
import UserController from '../controllers/user';

const router =  Router();

// GET: /api/user
router.get('/',UserController.getUser)
router.post('/',UserController.postUser)
router.post('/delete',UserController.deleteUser)
router.post('/update',UserController.updateUser)
router.patch('/')
router.delete('/')

export default router;