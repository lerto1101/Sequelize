import path from 'path';
import fs from 'fs';
import Sequelize from 'sequelize';
import _ from 'lodash';
// import config from '../config/config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

const db = {};

fs.readdirSync(__dirname)
    .filter(
        file=>
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
    .forEach(file => {
        const model = _.invoke(sequelize,'import', path.resolve(__dirname,file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if(db[modelName].associate){
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;