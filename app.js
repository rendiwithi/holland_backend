// import module/package
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoutes");
const menuRoute = require("./routes/menuRoutes");
const detailMenuRoute = require("./routes/detailMenu");
const detailTopingRoute = require("./routes/detailToping");
const detailPesananRoute = require("./routes/detailPesanan");
const bannerRoute = require("./routes/bannerRoutes");
const adminJSExpress = require("@adminjs/express");
const adminJSDB = require("./config/databaseAdmin");

const app = express();
const routerAdminJS = adminJSExpress.buildRouter(adminJSDB);
// setting middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userRoute);
app.use("/menu", menuRoute);
app.use("/detail_menu", detailMenuRoute);
app.use("/detail_toping", detailTopingRoute);
app.use("/pesanan", detailPesananRoute);
app.use("/banner", bannerRoute);
app.use(adminJSDB.options.rootPath, routerAdminJS);

// setting error path
app.use((req, res, next) => {
    const err = new Error(`${req.url} not found in this server`);
    err.status = 404;
    next(err);
});
// setting another error program
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});
// export app
module.exports = app;