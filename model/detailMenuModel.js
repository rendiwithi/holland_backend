const sequelize = require("sequelize");
const db = require("../config/database");
const menu = require('./menuModel')
const toko = require('./tokoModel')

var detailMenu = db.define(
    "detail_menu",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        id_toko: { type: sequelize.INTEGER },
        id_menu: { type: sequelize.INTEGER },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
detailMenu.belongsTo(menu, { foreignKey: 'id_menu' })
detailMenu.belongsTo(toko, { foreignKey: 'id_toko' })
module.exports = detailMenu;