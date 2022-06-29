const sequelize = require("sequelize");
const db = require("../config/database");

var banner = db.define(
    "banner",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        image: { type: sequelize.STRING },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
module.exports = banner;