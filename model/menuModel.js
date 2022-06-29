const sequelize = require("sequelize");
const db = require("../config/database");

var menu = db.define(
    "menu",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        title: { type: sequelize.STRING },
        desc: { type: sequelize.STRING },
        img: { type: sequelize.STRING },
        harga: { type: sequelize.INTEGER },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
module.exports = menu;