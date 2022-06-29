const model = require("../model/index");
require("dotenv").config();
const controller = {};

controller.getAll = async function (req, res) {
    try {
        await model.banner.findAll().then((result) => {
            if (result.length > 0) {
                res
                    .status(200)
                    .json({ status: true, message: "Connection successful", data: result });
            } else {
                res.status(200).json({ status: false, message: "Connection failed", data: [] });
            }
        });
    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
};


module.exports = controller;
