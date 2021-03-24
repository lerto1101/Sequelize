import {Router} from 'express';
import user from './user';

const router =  Router();

router.use('/',(req,res)=>{
    res.status(200).json({Message:'gfdsdg'});
})

export default router;