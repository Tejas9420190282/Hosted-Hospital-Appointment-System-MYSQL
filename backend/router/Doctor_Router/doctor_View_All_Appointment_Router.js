
// doctor_View_All_Appointment_Router.js (Node)

const express = require('express');
const { doctor_View_All_Appointment_Controller } = require('../../Controller/Doctor_Controller/doctor_View_All_Appointment_Controller');

const doctor_View_All_Appointment_Router = express.Router();

doctor_View_All_Appointment_Router.post("/get-doctor-all-apointment", doctor_View_All_Appointment_Controller);

exports.doctor_View_All_Appointment_Router = doctor_View_All_Appointment_Router;

