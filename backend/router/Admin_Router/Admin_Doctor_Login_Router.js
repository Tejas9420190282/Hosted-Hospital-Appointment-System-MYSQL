
// admin_Doctor_Login_Router.js

const express = require('express');
const { admin_Doctor_Login_Controller } = require('../../Controller/Admin_Controller/Admin_Doctor_Login_Controller');


const admin_Doctor_Login_Router = express.Router();

admin_Doctor_Login_Router.post("/admin-doctor-login-submit", admin_Doctor_Login_Controller);

exports.admin_Doctor_Login_Router = admin_Doctor_Login_Router;


