
// create_Patient_Data_Router.js (Node)

const express = require('express');
const { create_Patient_Data_Controller } = require('../../Controller/User_Controller/Create_Patient_Data_Controller');

const create_Patient_Data_Router = express.Router();

create_Patient_Data_Router.post("/create-patient", create_Patient_Data_Controller);

exports.create_Patient_Data_Router = create_Patient_Data_Router;


