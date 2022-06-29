const sequelize = require("sequelize");
const db = require("../config/database");
const detailMenu = require('./detailMenuModel')
const user = require('./userModel')
const statusM = require('./statusOrderModel')
const toping = require('./topingModel')

var detailPesanan = db.define(
    "detail_pesanan",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        id_user: { type: sequelize.INTEGER },
        id_detail_menu: { type: sequelize.INTEGER },
        topping: { type: sequelize.INTEGER },
        status: { type: sequelize.INTEGER },
        keterangan: { type: sequelize.STRING },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
detailPesanan.belongsTo(statusM, { foreignKey: 'status' });
detailPesanan.belongsTo(detailMenu, { foreignKey: 'id_detail_menu' });
detailPesanan.belongsTo(user, { foreignKey: 'id_user' });
detailPesanan.belongsTo(toping, { foreignKey: 'topping' });
module.exports = detailPesanan;