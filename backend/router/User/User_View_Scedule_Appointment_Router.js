
// User_View_Scedule_Appointment_Router.js (Node)

const express = require('express');
const { User_View_Scedule_Appointment_Controller } = require('../../Controller/User_Controller/User_View_Scedule_Appointment_Controller');

const User_View_Scedule_Appointment_Router = express.Router();

User_View_Scedule_Appointment_Router.get("/user/view-scedule-appointment", User_View_Scedule_Appointment_Controller);

exports.User_View_Scedule_Appointment_Router = User_View_Scedule_Appointment_Router;

