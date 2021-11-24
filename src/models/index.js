'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config.json');
const db = {};
const sequelize = new Sequelize(config.db_database, config.db_user, config.db_pass, {
    host: config.db_host,
    port: config.db_port,
    dialect: 'mysql',
    timezone: config.db_timezone,
    dialectOptions:{
        dateStrings: true,
        timezone: config.db_timezone,
        typeCast: function(field, next){
            if(field.type === 'DATETIME'){
                return new Date(field.string() + 'Z');
            }
            return next();
        }
    }
});

module.exports.initDBStructure = function(){
    fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file));
        db[model.name] = model;
    });

    Object.keys(db).forEach(modelName => {
        if(db[modelName].associate){
            db[modelName].associate(db);
        }
    });
}

module.exports.db = db;
module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
