import passport from 'passport';
import LocalStrategy from 'passport-local';
import UserService from '../services/user';
import {Strategy as jwtStrategy, ExtractJwt} from 'passport-jwt';
import truncate from 'lodash.truncate';


require('dotenv').config();
//jwt option
const options = {
    secretOrKey: process.env.APP_KEY,
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(new LocalStrategy({
    //改用email當帳號
    usernameField: 'email',
    passwordField:'password'
    },async (email, password, callback) => {
        let user;
        try {
            user = await UserService.getUser(email);
            if(!user) {
                return callback({status:404,message:'沒有該用戶'},false)
            }
            if(password !== user.password){
                return callback({status:404,message:'密碼錯誤!'},false)
            }
        } catch(error) {
            console.log(error);
            return callback({status:500,message:"Server Error"},false);
        }
        return callback(null,user);
    }
));

passport.use(new jwtStrategy(options,(payload,callback) => {
    const status = calcExpireTime(payload);
    if(!status){
        return callback({status:401, message:'Token 時間到期，請重新登入!'}); //http code 404 not applicable
    }
    return callback(null, payload)
}))

const calcExpireTime = (payload) => {
    const {expireTime}=payload;
    const currentTime = new Date().getTime();

    if(currentTime > expireTime){
        return false;
    }
    return true;
}

export default passport;