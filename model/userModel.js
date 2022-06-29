const sequelize = require("sequelize");
const db = require("../config/database");
const role = require('./roleModel')

var user = db.define(
    "user",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        nama: { type: sequelize.STRING },
        username: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
        alamat: { type: sequelize.STRING },
        token: { type: sequelize.STRING },
        id_role: { type: sequelize.INTEGER },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
user.belongsTo(role, { foreignKey: 'id_role' });
module.exports = user;