
// Insert_Slote_Router.js (Node)

const express = require('express');
const { insert_Slote_Controller } = require('../../Controller/User_Controller/Insert_Slote_Controller');

const Insert_Slote_Router = express.Router();

Insert_Slote_Router.get("/insert-slote", insert_Slote_Controller);

exports.Insert_Slote_Router = Insert_Slote_Router;

