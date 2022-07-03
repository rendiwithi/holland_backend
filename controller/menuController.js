const model = require("../model/index");
require("dotenv").config();
const controller = {};
const cloudinary = require('../middleware/cloudinary_helper')

controller.getAll = async function (req, res) {
    try {
        await model.menu.findAll().then((result) => {
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
controller.newMenu = async function (req, res) {
    try {
        const uploadImage = await cloudinary.uploader.upload(req.file.path, {
            public_id: `holland`,
            width: 500,
            height: 500,
            crop: "fill",
        });
        await model.menu
            .create({
                title: req.body.title,
                desc: req.body.desc,
                img: uploadImage.url,
                harga: req.body.harga,
            }).then((result) => {
                res.status(201).json({
                    status: true,
                    message: "Menu successful created",
                });
            });
    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
}
controller.editMenu = async function (req, res) {
    try {
        const uploadImage = await cloudinary.uploader.upload(req.file.path, {
            public_id: `holland`,
            width: 500,
            height: 500,
            crop: "fill",
        });
        await model.menu
            .update({
                title: req.body.title,
                desc: req.body.desc,
                img: uploadImage.url,
                harga: req.body.harga, 
            }, { where: { id: req.body.id } }).then((result) => {
                res.status(201).json({
                    status: true,
                    message: "Menu successful Change",
                });
            });

    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
}
controller.deleteMenu = async function (req, res) {
    try {
        await model.menu
            .destroy({ where: { id: req.params.id } }).then((result) => {
                res.status(201).json({
                    status: true,
                    message: "Menu successful delete",
                });
            });

    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
}

module.exports = controller;
