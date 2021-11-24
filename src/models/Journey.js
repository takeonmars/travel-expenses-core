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

let Journey = sequelize.define('Journey', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    userID: {
        type: Sequelize.STRING,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    start: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    end: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    costCenter: {
        type: Sequelize.STRING,
        allowNull: true
    },
    costObject: {
        type: Sequelize.STRING,
        allowNull: true
    },
    startLocation: {
        type: Sequelize.STRING,
        allowNull: true
    },
    destLocation: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    updatedAt: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    assigne: {
        type: Sequelize.STRING,
        allowNull: true
    }
},
    {
        timestamps: true,
        tableName: 'te_journey'
    }
);

Journey.sync();
module.exports = Journey;
