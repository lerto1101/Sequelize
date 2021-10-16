'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname,"..","config","config.json"))[env]; //use path regex file_path. dos & unix very different
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

let workflow = new Promise((resolve,reject) => {
    fs.readdir(path.join(__dirname),(err,files) => {
        if (err) {
            console.log(err);
            reject(err);
        }
        files.filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            const model = sequelize['import'](path.join(__dirname, file));
            db[model.name] = model;
        })

        resolve(db);
    });
})
workflow
  .then(db => {
      //i try use for-in ,but I'm not sure if it works.
      //for-in preformance less then Object.keys (node v10)
      //but use for-in looks cleaner
      //remember try..catch that there is a performance loss
      try {
          for(let obj in db) {
              if (obj.associate) 
                  obj.associate(db);
          }
      } catch(error) {
          console.log(error);
          Object.keys(db).forEach(modelName => {
              if (db[modelName].associate) {
                  db[modelName].associate(db);
              }
          });
      } finally {
          module.exports = {
              sequelize = sequelize,
              Sequelize = Sequelize
          }
      }
  })
  .catch(error =>{
      console.log(error);
  });