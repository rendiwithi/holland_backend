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

controller.newDetailMenu = async function (req, res) {
    try {
        await model.detailMenu
            .create({
                id_toko:1,
                id_menu: req.body.idMenu,
            }).then((result) => {
                res.status(201).json({
                    status: true,
                    message: "Detail Menu successful created",
                });
            });
    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
}

module.exports = controller;
