
// admin_Show_All_Doctors_Controller.js (Node)

const { mySqlPool } = require("../../config/db");

const admin_Show_All_Doctors_Controller = async (req, res) => {

    try {

        const [allDoctors] = await mySqlPool.query("SELECT id, email, password, name, contact, doctor_type, education, education_place, experience, about, fees, img, start_time, end_time FROM doctor");

        if (!allDoctors || allDoctors.length === 0) {
            console.log("Doctors Data not Available".bgRed);
            return res.status(200).json({ // Changed to 404 for "Not Found"
                success: false, // Changed to false since this is an error case
                message: "Doctors Data not Available",
            });
        }

        console.log(allDoctors);

        res.status(200).json({
            success: true, // Fixed typo (was 'message: true')
            message: "Successfully fetched the doctor's data", // Fixed typo in "fetched"
            doctors: allDoctors
        });
        
        
    } catch (error) {
        
        console.log(`Error in admin_Show_All_Doctors_Controller api : ${error.message}`.bgRed);
        
        return res.status(400).json({
            success : false,
            message : `Error in admin_Show_All_Doctors_Controller api : ${error.message}`
        })
    }
}

exports.admin_Show_All_Doctors_Controller = admin_Show_All_Doctors_Controller;




