const sequelize = require("sequelize");
const db = require("../config/database");

var statusOrder = db.define(
    "status_order",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        name: { type: sequelize.STRING },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
module.exports = statusOrder;