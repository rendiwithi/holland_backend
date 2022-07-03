const adminJS = require("adminjs");
const adminJSSequelize = require("@adminjs/sequelize");

adminJS.registerAdapter(adminJSSequelize);

const model = require("../config/database");

const adminJsDB = new adminJS({
    databases:[model],
    rootPath:"/admin"
});
module.exports = adminJsDB;