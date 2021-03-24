import {Router} from 'express';

const router =  Router();

router.use('/user',(req,res)=>{
    res.status(200).json({Message:'hi464856'});
})

export default router;