const model = require("../model/index");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const controller = {};

controller.getAll = async function (req, res) {
    try {
        await model.user.findAll({
            include: [model.role]
        }).then((result) => {
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

controller.login = async function (req, res) {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send("username and password are required");
        }
        const userCek = await model.user.findAll({
            where: { [Op.and]: [{ username: username }, { password: password }] },
        });
        if (userCek.length > 0) {
            const token = jwt.sign(
                {
                    username: username,
                    password: password,
                    iat: Math.floor(Date.now()),
                },
                process.env.TOKEN_JWT,
                {
                    expiresIn: "24h",
                }
            );
            await model.user.update(
                {
                    token: token,
                },
                {
                    where: { [Op.and]: [{ username: username }, { password: password }] },
                }
            );
            const userUpdate = await model.user.findAll({
                include: [model.role],
                where: { [Op.and]: [{ username: username }, { password: password }] },
            });
            res.status(200).json({ "status": true, message: "Success", data: userUpdate[0] });
        } else {
            res.status(400).json({ "status": false, message: "Invalid username or password" });
        }
    } catch (error) { }
};

controller.getUsername = async function (req, res) {
    try {
        var userData = await model.user.findAll({
            where: { username: { [Op.like]: `%${req.params.username}%` } },
        });
        if (userData.length > 0) {
            res
                .status(200)
                .json({ status: true, message: "Connection successful", data: userData });
        } else {
            res.status(200).json({ status: false, message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
};

controller.createNew = async function (req, res) {
    try {
        //   check data has already been created
        const checkData = await model.user.findAll({
            where: {
                [Op.or]: {
                    username: req.body.username,
                    password: req.body.password,
                },
            },
        });
        if (checkData.length > 0) {
            res.status(500).json({ message: "username/password has already in use" });
        } else {
            await model.user
                .create({
                    nama: req.body.name,
                    username: req.body.username,
                    password: req.body.password,
                    alamat: req.body.alamat,
                    token: req.body.username + req.body.password,
                    id_role: req.body.role,
                })
                .then((result) => {
                    res.status(201).json({
                        status: true,
                        message: "user successful created", data: {
                            nama: req.body.name,
                            username: req.body.username,
                            password: req.body.password,
                            alamat: req.body.alamat,
                            token: req.body.username + req.body.password,
                            id_role: req.body.role,
                        },
                    });
                });
        }
    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
};
controller.editAt = async function (req, res) {
    try {
        await model.user
            .findAll({ where: { id: req.body.id } })
            .then(async (result) => {
                if (result.length > 0) {
                    await model.user.update(
                        {
                            nama: req.body.name,
                            username: req.body.username,
                            password: req.body.password,
                            alamat: req.body.alamat,
                            token: req.body.username + req.body.password,
                            id_role: req.body.role,
                        },
                        { where: { id: req.body.id } }
                    );
                    res.status(200).json({
                        status: true,
                        message: "update successful",
                        data: {
                            id: req.body.id,
                            nama: req.body.name,
                            username: req.body.username,
                            password: req.body.password,
                            alamat: req.body.alamat,
                            token: req.body.username + req.body.password,
                            id_role: req.body.role,
                        },
                    });
                } else {
                    res.status(500).json({ status: false, message: "update failed" });
                }
            });
    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
};

controller.deleteUser = async function (req, res) {
    try {
        await model.user
            .findAll({ where: { id: req.body.id } })
            .then(async (result) => {
                if (result.length > 0) {
                    await model.user.destroy({ status: true, where: { id: req.body.id } });
                    res.status(200).json({ message: "delete user successfully" });
                } else {
                    res.status(404).json({ status: false, message: "id user not found" });
                }
            });
    } catch (error) {
        res.status(404).json({ status: false, message: error });
    }
};

module.exports = controller;
