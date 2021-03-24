import models from '../models/index';
import _ from 'lodash';
import { QueryTypes } from 'sequelize';

const { users } = models;

class UserController {
    getUser = async (req,res) => {
        const {body} = req;
        const {email} = body
        const user = await users.findAll({
            where:{
                email,
            }
        });
        // const response = _.map(user,o =>{
        //     return{
        //         ...o.dataValues,
        //         vip:true
        //     };
        // });
        res.status(200).json({user});
    };

    postUser = async (req,res) => {
        const { body } = req;
        const { email,password } = body;
        const user = await users.create({
            email,
            password
        });
        res.status(200).json({ user });
    };

    deleteUser = async(req,res) =>{
        const {body} = req;
        const {email} = body
        const user = await users.destroy({
            where:{
                email,
            }
        });
        res.status(200).json({ user });
    }

    updateUser = async(req,res) =>{
        const {body} = req;
        const {email,password} = body
        const user = await users.update({
            password
        },{
            where:{
                email,
            }
        });
        res.status(200).json({ user });
    }
}

export default new UserController();