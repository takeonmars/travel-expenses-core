let config = require('../config.json');
let Sequelize = require('sequelize'),
    sequelize = new Sequelize(config.db_database, config.db_user, config.db_pass, {
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

let Travel = sequelize.define( 'Travel', {
        travelId: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true
        }        
    },
    {
        timestamps: true,
        tableName: 'travel_table'
    }
);

Travel.sync();
module.exports = Travel;
