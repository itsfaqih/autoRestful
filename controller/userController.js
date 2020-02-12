'use strict';

const Controller = require('./Controller.js')
const User = require('../model/User.js')

const UserController = new Controller(User)

module.exports = UserController