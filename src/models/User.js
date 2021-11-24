let config = require('../config.json');
let Sequelize = require('sequelize'),
    sequelize = new Sequelize(config.db_database, config.db_user, config.db_pass, {
        host: config.db_host,
        port: config.db_port,
        dialect: 'mysql',
        timezone: config.db_timezone,
        dialectOptions: {
            dateStrings: true,
            timezone: config.db_timezone,
            typeCast: function (field, next) {
                if (field.type === 'DATETIME') {
                    return new Date(field.string() + 'Z');
                }
                return next();
            }
        }
    });

let User = sequelize.define('User', {
    userId: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    userIdExternal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    password: Sequelize.STRING,
    address: Sequelize.TEXT,
    manuallyProcessing: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    payForSubscription: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    payForLiteSubscription: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    payForCloud: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    payForNtrip: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    isAdmin: Sequelize.BOOLEAN,
    isReseller: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
},
    {
        timestamps: true,
        tableName: 'crm_users'
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['userIdExternal']
            }
        ]
    }
);

User.sync();
module.exports = User;
