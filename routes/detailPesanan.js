const express = require("express");
const router = express.Router();
const controller = require("../controller/indexController");
router.get("/", controller.detailPesanan.getAll);
router.put("/disc", controller.detailPesanan.editDisc);
router.post("/", controller.detailPesanan.createNew);
router.put("/", controller.detailPesanan.editAt);
router.delete("/", controller.detailPesanan.deletePesanan);
module.exports = router;