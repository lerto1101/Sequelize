import models from '../models/index';
import _ from 'lodash';
// import { QueryTypes } from 'sequelize';

const { users } = models;

class UserController {
    getUser = async (req,res,next) => {
        const {email} = req.body;
        let user;
        try{
            user = await users.findAll({
                where:{
                    email,
                }
            });
        } catch(error) {
            console.log(error);
            return res.status(403).send("Bad Request");
        } finally {
            if (user==undefined)
                return res.status(403).send("Bad Request");
        }
        res.status(200).json({user});
    };

    postUser = async (req,res,next) => {
        const { email,password } = req.body;
        let user;
        try {
            user = await users.create({
                email,
                password
            });
        } catch(error) {
            console.log(error);
            return res.status(403).send("Bad Request");
        } finally {
            if (user==undefined)
                return res.status(403).sned("Bad Request");
        }
        res.status(200).json({ user });
    };

    deleteUser = async(req,res,next) =>{
        const {email} = req.body
        let user;
        try{
            user = await users.destroy({
                where:{
                    email,
                }
            });
        } catch(error) {
            console.log(error);
            return res.status(403).send("Bad Request");
        } finally {
            if(user == undefined)
                return res.status(403).send("Bad Request");
        }
        res.status(200).json({ user });
    }

    updateUser = async(req,res,next) =>{
        const {email,password} = req.body
        let user;
        try{
            user = await users.update({
                password
            },{
                where:{
                    email,
                }
            });
        } catch(error) {
            console.log(error);
            return res.status(403).send("Bad Request");
        } finally {
            if (user == undefined)
                return res.status(403).send("Bad Request");
        }
        res.status(200).json({ user });
    }
}

export default new UserController();