
// create_Account_User_Router.js (Node)

const express = require('express');
const { create_Account_User_Controller } = require('../../Controller/User_Controller/Create_Account_User_Controller');

const create_Account_User_Router = express.Router();

create_Account_User_Router.post("/user-create-account", create_Account_User_Controller);

exports.create_Account_User_Router = create_Account_User_Router

