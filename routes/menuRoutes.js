const express = require("express");
const router = express.Router();
const controller = require("../controller/indexController");
const image = require("../middleware/storage");


router.get("/", controller.menu.getAll);
router.post("/upload", image.single("image"), controller.menu.newMenu);
// router.post("/login", controller.user.login);
// router.post("/login", controller.user.login);
// router.post("/", controller.user.createNew);
// router.put("/", controller.user.editAt);
// router.delete("/", controller.user.deleteUser);
module.exports = router;