import model from '../models/index';

const { users } = model;

class UserService{
    getUser = async(email)=>{
        const user = await users.findOne({
            where:{
                email,
            },
        });
        return user;
    }
}
export default new UserService();