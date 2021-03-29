import passport from 'passport';
import LocalStrategy from 'passport-local';
import UserService from '../services/user';

passport.use(new LocalStrategy({
    //改用email當帳號
    usernameFild: 'email',

},(async(email, password, cb)=>{
    const user = await UserService.getUser(email);
    if(!user) {
        return cb({status:400,message:'沒有該用戶'},false)
    }
    return cb(null,user);
})));
export default passport;