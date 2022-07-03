const model = require("../model/index");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const controller = {};

controller.getAll = async function (req, res) {
    try {
        await model.detailPesanan.findAll(
            {
                include: [model.user, model.detailMenu, model.status, model.toping],
                where: { status: "4" }
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
controller.createNew = async function (req, res) {
    try {
        await model.detailPesanan
            .create({
                id_user: req.body.id_user,
                id_detail_menu: req.body.id_detail_menu,
                topping: req.body.topping,
                status: 4,
                keterangan: req.body.keterangan,
                harga: req.body.harga
            })
            .then((result) => {
                res.status(201).json({
                    status: true,
                    message: "Pesanan diterima",
                });
            });
    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
};
controller.editAt = async function (req, res) {
    try {
        await model.detailPesanan
            .findAll({ where: { id: req.body.id } })
            .then(async (result) => {
                if (result.length > 0) {
                    await model.detailPesanan.update(
                        {
                            status: req.body.status,
                        },
                        { where: { id: req.body.id } }
                    );
                    res.status(200).json({
                        status: true,
                        message: "update successful",
                    });
                } else {
                    res.status(500).json({ status: false, message: "update failed" });
                }
            });
    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
};
controller.editDisc = async function (req, res) {
    try {
        await model.detailPesanan
            .findAll({ where: { id: req.body.id } })
            .then(async (result) => {
                if (result.length > 0) {
                    await model.detailPesanan.update(
                        {
                            harga: req.body.harga,
                        },
                        { where: { id: req.body.id } }
                    );
                    res.status(200).json({
                        status: true,
                        message: "update successful",
                    });
                } else {
                    res.status(500).json({ status: false, message: "update failed" });
                }
            });
    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
};
controller.deletePesanan = async function (req, res) {
    try {
        await model.detailPesanan
            .destroy({ where: { id: req.body.id } }).then((result) => {
                res.status(201).json({
                    status: true,
                    message: "Pesanan successful delete",
                });
            });
    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
}
module.exports = controller;
