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

let Receipt = sequelize.define('Receipt', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    category: {
        type: Sequelize.STRING,
        allowNull: true
    },
    paymentType: {
        type: Sequelize.STRING,
        allowNull: true
    },
    date: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    currency: {
        type: Sequelize.STRING,
        allowNull: true
    },
    grossAmount: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    vat: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    image: {
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
    jorneyID: {
        type: Sequelize.BIGINT,
        allowNull: true
    }

},
    {
        timestamps: true,
        tableName: 'te_receipt'
    }
);

Receipt.associate = (models) => {
    Receipt.belongsTo(models['Journey'], { foreignKey: 'jorneyID', onDelete: 'RESTRICT' });
};

Receipt.sync();
module.exports = Receipt;
