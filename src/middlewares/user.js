import passport from './passport';


class UserMiddleware {
    Authenticate = (req, res, next) => {
        passport.authenticate('local',{ session:false},async(error,user) =>{
            if(error){
                const{status,message} = error;
                res.status(status).json({message});
                return;
            }
            if(!user){
                res.status(400).json({message:'登入失敗'});
                return;
            }
            res.status(200).json({message:'找尋成功'});            
        })(req,res,next)
    };
}
export default new UserMiddleware();