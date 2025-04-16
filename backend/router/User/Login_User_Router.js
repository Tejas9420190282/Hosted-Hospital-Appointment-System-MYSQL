
// login_User_Router.js (NODE)

const express = require('express');
const { login_User_Controler } = require('../../Controller/User_Controller/Login_User_Controller');

const login_User_Router = express.Router();

login_User_Router.post("/login-user", login_User_Controler);

exports.login_User_Router = login_User_Router;


