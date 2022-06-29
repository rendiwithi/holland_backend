const sequelize = require("sequelize");
const db = require("../config/database");

var role = db.define(
    "role",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        nama: { type: sequelize.STRING },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);

module.exports = role;