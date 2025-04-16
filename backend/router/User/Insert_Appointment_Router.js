
const express = require('express');
const { insert_Appointment_Controller } = require('../../Controller/User_Controller/Insert_Appointment_Controller');

const Insert_Appointment_Router = express.Router();

Insert_Appointment_Router.post("/insert-appointment", insert_Appointment_Controller);

exports.Insert_Appointment_Router = Insert_Appointment_Router;