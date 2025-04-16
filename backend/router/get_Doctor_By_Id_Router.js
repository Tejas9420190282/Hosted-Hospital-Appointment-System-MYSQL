
// get_Doctor_By_Id_Router.js

const express = require('express');
const { get_Doctor_By_Id_Controller } = require('../Controller/get_Doctor_By_Id_Controller');

const get_Doctor_By_Id_Router = express.Router();

get_Doctor_By_Id_Router.get("/doctor/:id", get_Doctor_By_Id_Controller);

exports.get_Doctor_By_Id_Router = get_Doctor_By_Id_Router;

