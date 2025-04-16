
// main.js

const express = require('express');
const colors = require('colors');
const { mySqlPool } = require('./config/db');

const cors = require('cors');
const { admin_Doctor_Login_Router } = require('./router/Admin_Router/Admin_Doctor_Login_Router');
const { create_Doctor_Router } = require('./router/Admin_Router/Create_Doctor_Router');
const { admin_Show_All_Doctors_Router } = require('./router/Admin_Router/Admin_Show_All_Doctor_Router');
const { get_Doctor_By_Id_Router } = require('./router/get_Doctor_By_Id_Router');
const { create_Account_User_Router } = require('./router/User/Create_Account_User_Router');
const { login_User_Router } = require('./router/User/Login_User_Router');
const { create_Patient_Data_Router } = require('./router/User/Create_Patient_Data_Router');
const { Insert_Slote_Router } = require('./router/User/Insert_Slote_Router');
const { payment_Router } = require('./router/User/Payment_Router');
const { User_View_Scedule_Appointment_Router } = require('./router/User/User_View_Scedule_Appointment_Router');
const { doctor_View_All_Appointment_Router } = require('./router/Doctor_Router/doctor_View_All_Appointment_Router');



const app = express();

app.use(cors({origin:"http://localhost:5173", credentials:true}))

app.use(express.json({ limit: '50mb' })); // For JSON requests
app.use(express.urlencoded({ limit: '50mb', extended: true })); // For URL-encoded requests

app.use(admin_Doctor_Login_Router);
app.use(create_Doctor_Router);
app.use(admin_Show_All_Doctors_Router);
app.use(get_Doctor_By_Id_Router);


// User
app.use(create_Account_User_Router);
app.use(login_User_Router);
app.use(create_Patient_Data_Router);
app.use(Insert_Slote_Router);
app.use(payment_Router);
app.use(User_View_Scedule_Appointment_Router);


// Doctors
app.use(doctor_View_All_Appointment_Router);


const PORT = 1212;
mySqlPool.query("SELECT 1").then(() => {

    console.log("DB Connected Successfully".bgGreen);
    
    app.listen(PORT, () => {

        console.log(`Server running on http://localhost:${PORT}`.bgGreen);
    })

}).catch((err) => {
    
    console.log(`Error : ${err.message}`.bgRed);
})

