
// create_Doctor_Controller.js

const { mySqlPool } = require("../../config/db");
const { createSlotsForDoctor } = require("../../Tables/slote_Creation");

const create_Doctor_Controller = async (req, res) => {
    try {
        
        const {
            email, password,  name, contact,
            doctorType, education, educationPlace,
            experience, about, fees, imageUrl, startTime,
            endTime,
        } = req.body;

        if (
            !email || !password || !name ||
            !contact || !doctorType || !education || 
            !experience || !about || !fees || !imageUrl
            || !educationPlace || !startTime || !endTime
        ) {

            console.log("All the inputs are mandatory");
            
            return res.status(400).json({
                
                success : false,
                message : "All the inputs are mandatory",
            })
        }

        console.log(req.body);

        // Remove the Base64 validation checks
        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                message: "Profile image is required",
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            
            console.log("Invalid email format".bgRed);
            
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            })
        }

        // Validate password strength
        if (password.length < 8) {

            console.log("Password must be at least 8 characters".bgRed);
            

            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }

        // Validate contact number
        if (!/^\d{10,15}$/.test(contact)) {

            console.log("Invalid contact number (10-15 digits)".bgRed);
            

            return res.status(400).json({
                success: false,
                message: "Invalid contact number (10-15 digits)",
            });
        }

        const [doctorData] = await mySqlPool.query("INSERT INTO doctor (email, password, name, contact, doctor_type, education, education_place, experience, about, fees, img, start_time, end_time) values (?,?,?,?,?,?,?,?,?,?,?,?,?)", [email, password,  name, contact, doctorType, education, educationPlace, experience, about, fees, imageUrl, startTime, endTime,])

        if (doctorData.length == 0) {
            
            console.log("Doctor data is not inserted in doctor table".bgRed);

            return res.status(400).json({
                success : false,
                message : "Successfully Doctor data inserted in doctor table"
            })
        }

        const doctorId = doctorData.insertId;

        createSlotsForDoctor(doctorId, startTime,
            endTime);
        
        console.log("Successfully Doctor data is inserted in doctor table and Slotes also created".bgGreen);

        res.status(200).json({
            
            success : true,
            message : "Successfully Doctor data is inserted in doctor table",
        })

    } catch (error) {

        console.log(`Error in create_Doctor_Controller API : ${error.message}`.bgRed);
        
        res.status(500).json({

            success : false,
            message : `Error in create_Doctor_Controller API : ${error.message}`
        })
    }
};

exports.create_Doctor_Controller = create_Doctor_Controller;

