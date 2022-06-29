const sequelize = require("sequelize");
const db = require("../config/database");

var toko = db.define(
    "toko",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        nama: { type: sequelize.STRING },
        alamat: { type: sequelize.STRING },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
module.exports = toko;