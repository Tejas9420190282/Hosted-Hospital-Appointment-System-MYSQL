
// create_Patient_Data_Controller.js (Node)

const { mySqlPool } = require("../../config/db");

const create_Patient_Data_Controller = async (req, res) => {
    try {

        const { name, contact, address, id } = req.body;

        console.log(req.body);
                

        if (!name || !contact || !address) {
            
            console.log("All the inputs are Mandatory...".bgRed);
            
            return res.status(400).json({
                success : false,
                message : "All the inputs are Mandatory...",
            })
        }

        const [patientData] = await mySqlPool.query("INSERT INTO patient ( name, contact, address, doctor_id) VALUES (?, ?, ?, ?)", [name, contact, address, id]);

        const patientId = patientData.insertId;

        console.log("Patient Values Inserted Successfully...".bgGreen);

        console.log(`patientId : ${patientId}`);
        

        res.status(200).json({
            success : true,
            message : "Patient Values Inserted Successfully...",
            patientId : patientId,
        })
        

    } catch (error) {

        console.log(
            `Error in create_Patient_Data_Controller API : ${error.message}`
        );

        res.status(500).json({
            success: false,
            message: `Error in create_Patient_Data_Controller API : ${error.message}`,
        });
    }
};

exports.create_Patient_Data_Controller = create_Patient_Data_Controller;



