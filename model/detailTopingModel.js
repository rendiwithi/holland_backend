const sequelize = require("sequelize");
const db = require("../config/database");
const menu = require('./menuModel')
const toping = require('./topingModel')

var detailtoping = db.define(
    "detail_toping",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        id_menu: { type: sequelize.INTEGER },
        id_toping: { type: sequelize.INTEGER },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
detailtoping.belongsTo(menu, { foreignKey: 'id_menu' })
detailtoping.belongsTo(toping, { foreignKey: 'id_toping' })
module.exports = detailtoping;