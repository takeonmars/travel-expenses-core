let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
//let bcrypt = require('bcryptjs');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const controllerMethods = require('./ControllerMethods');
const dbIndex = require('../models/index');
const sequelizeDBInstance = dbIndex.sequelize;
let util = require('../_helpers/util');
let Sequelize = dbIndex.Sequelize;
const Op = Sequelize.Op;

router.get('/', getAllTravels);

async function getAllTravels(req, res) {
    res.status(200).json('OK');
    // try{
    //     let travels = await controllerMethods.getTravel();
    //     res.status(200).json(travels);
    // } catch(e) {
    //     console.log(e);
    //     res.sendStatus(500);
    // }
}

module.exports = router;
