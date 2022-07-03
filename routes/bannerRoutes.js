const express = require("express");
const router = express.Router();
const controller = require("../controller/indexController");
const image = require("../middleware/storage");

router.get("/", controller.banner.getAll);
router.post("/upload", image.single("image"), controller.banner.newBanner);
router.put("/edit", image.single("image"), controller.banner.editBanner);
router.delete("/delete/:id", controller.banner.deleteBanner);

module.exports = router;