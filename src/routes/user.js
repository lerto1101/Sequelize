import { Router } from 'express';
// import UserController from '../controllers/user';
// import UserMiddleware from '../middlewares/user';
import controller from '../controllers/user.js'
import userServer from '../middlewares/user'

const router =  Router();

// GET: /api/user

// router.get('/',UserController.getUser);
// router.post('/',UserController.postUser);
// router.post('/delete',UserController.deleteUser);
// router.post('/update',UserController.updateUser);
// router.post('/find',UserMiddleware.Authenticate);
// router.patch('/');
// router.delete('/');

router.get('/get', userServer.jwtAuthenticate, controller.getUser);
router.post('/find', userServer.Authenticate, controller.getUser);
router.post('/', controller.postUser);
router.delete('/', controller.deleteUser);
router.patch('/', controller.updateUser);

export default router;