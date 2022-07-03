const model = require("../model/index");
require("dotenv").config();
const controller = {};
const cloudinary = require('../middleware/cloudinary_helper')


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

controller.newBanner = async function (req, res) {
    try {
        const uploadImage = await cloudinary.uploader.upload(req.file.path, {
            public_id: `holland`,
            width: 500,
            height: 500,
            crop: "fill",
        });
        await model.banner
            .create({
                image: uploadImage.url,
            }).then((result) => {
                res.status(201).json({
                    status: true,
                    message: "Banner successful created",
                });
            });

    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
}
controller.editBanner = async function (req, res) {
    try {
        const uploadImage = await cloudinary.uploader.upload(req.file.path, {
            public_id: `holland`,
            width: 500,
            height: 500,
            crop: "fill",
        });
        await model.banner
            .update({
                image: uploadImage.url,
            }, { where: { id: req.body.id } }).then((result) => {
                res.status(201).json({
                    status: true,
                    message: "Banner successful Change",
                });
            });

    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
}
controller.deleteBanner = async function (req, res) {
    try {
        await model.banner
            .destroy({ where: { id: req.params.id } }).then((result) => {
                res.status(201).json({
                    status: true,
                    message: "Banner successful delete",
                });
            });

    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
}
module.exports = controller;
