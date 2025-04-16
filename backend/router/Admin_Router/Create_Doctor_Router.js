
// create_Doctor_Router.js (NOde)

const express = require('express');
const { create_Doctor_Controller } = require('../../Controller/Admin_Controller/Create_Doctor_Controller');

const create_Doctor_Router = express.Router();

create_Doctor_Router.post("/admin/create-doctor-submit", create_Doctor_Controller);

exports.create_Doctor_Router = create_Doctor_Router;



