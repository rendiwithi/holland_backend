const sequelize = require("sequelize");
const db = require("../config/database");

var toping = db.define(
    "toping",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        title: { type: sequelize.STRING },
        harga: { type: sequelize.INTEGER },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
module.exports = toping;