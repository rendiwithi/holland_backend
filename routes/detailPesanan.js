const express = require("express");
const router = express.Router();
const controller = require("../controller/indexController");
router.get("/", controller.detailPesanan.getAll);
// router.post("/login", controller.user.login);
router.post("/", controller.detailPesanan.createNew);
router.put("/", controller.detailPesanan.editAt);
// router.delete("/", controller.user.deleteUser);
module.exports = router;