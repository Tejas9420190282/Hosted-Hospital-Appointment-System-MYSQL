
// admin_Show_All_Doctors_Router.js (Node)

const express = require('express');
const { admin_Show_All_Doctors_Controller } = require('../../Controller/Admin_Controller/Admin_Show_All_Doctor_Controller');

const admin_Show_All_Doctors_Router = express.Router();

admin_Show_All_Doctors_Router.get("/show-all-doctors-list", admin_Show_All_Doctors_Controller);

exports.admin_Show_All_Doctors_Router = admin_Show_All_Doctors_Router

