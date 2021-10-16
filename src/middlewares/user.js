import passport from './passport';
import jwt from 'jsonwebtoken';

class UserMiddleware {
    Authenticate = async (req, res, next) => {
        passport.authenticate('local',{ session:false},async(err,user) =>{
            if(err){
                const{status, message} = err;
                return res.status(status).json({message});
            }
            const data = {
                id:user.id,
                expireTime:new Date().getTime()+10*60*1000
            }
            let token;
            try {
                token = jwt.sign(data,process.env.APP_KEY);
            } catch(error) {
                console.log(error);
                return res.status(403).send("Bad Request");
            } finally {
                if (token==undefined)
                    return res.status(403).send("Bad Request");
            }
            return res.status(200).json({message:`找尋成功!`,token:`${token}`});
        })(req,res,next);
    };


    //解密
    decodeToken = async (token)=>{
        try {
            return jwt.verify(token,process.env.APP_KEY);
        } catch(err) {
            return err;
        };
    };

    jwtAuthenticate = async (req, res, next)=>{
        passport.authenticate('jwt',{session:false},async (err, user, info)=>{
            //In javascript error handle always the priority
            if(err){
                const {status, message} = err;
                return res.status(status).json({message});
            }

            if(info){
                //if user not login yet, just reject this request
                return res.status(401).json({message:'尚未登入!'})
            }
            
            // const {id} = user.id;
            // req.id = id;

            if(user.id){
                req.id = user.id;
            }else{
                return res.status(403).send("Bad Request");
            }
            next(); //i don't return next() becasue after next() passport still handle something
        })(req,res,next);
    }
}

export default new UserMiddleware();