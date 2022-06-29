const model = require("../model/index");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const controller = {};

controller.getAll = async function (req, res) {
    try {
        await model.detailMenu.findAll(
            {
                include: [model.menu, model.toko]
            }
        ).then((result) => {
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
