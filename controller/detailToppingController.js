const model = require("../model/index");
const { Op, where } = require("sequelize");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const controller = {};

controller.getAll = async function (req, res) {
    try {
        await model.detailToping.findAll(
            {
                include: [model.menu, model.toping]
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
controller.getDetail = async function (req, res) {
    try {
        const { idMenu } = req.body;
        await model.detailToping.findAll(
            {
                include: [model.menu, model.toping],
                where: { id_menu: idMenu },
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
