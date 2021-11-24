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

let Rides = sequelize.define('Rides', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    kilometer: {
        type: Sequelize.BIGINT,
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
    jorneyID: {
        type: Sequelize.BIGINT,
        allowNull: true
    }

},
    {
        timestamps: true,
        tableName: 'te_rides'
    }
);

Rides.associate = (models) => {
    Rides.belongsTo(models['Journey'], { foreignKey: 'jorneyID', onDelete: 'RESTRICT' });
};


Rides.sync();
module.exports = Rides;
