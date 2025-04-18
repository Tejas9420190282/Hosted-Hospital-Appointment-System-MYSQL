
// doctor_View_All_Appointment_Controller.js (Node)

const { mySqlPool } = require("../../config/db");

const doctor_View_All_Appointment_Controller = async (req, res) => {
    
    try {
        const { doctorId } = req.body;

        const [appointments] = await mySqlPool.query(
            "SELECT patient1.name, patient1.contact, patient1.address, appointment1.date, slote1.start_time, slote1.end_time FROM appointment1 JOIN patient1 ON appointment1.patient_id = patient1.id JOIN slote1 ON appointment.slote_id = slote1.id WHERE appointment1.doctor_id = ?",
            [doctorId]
        );


        console.log(appointments);
        
        res.status(200).json({
            success : true,
            message : "Successfully featch the data",
            allAppointment : appointments
        })

    } catch (error) {
        console.log(
            `Error in doctor_View_All_Appointment_Controller API : ${error.message}`.bgRed
        );

        res.status(400).json({
            success: false,
            message: `Error in doctor_View_All_Appointment_Controller API : ${error.message}`,
        });
    }
};

exports.doctor_View_All_Appointment_Controller =
    doctor_View_All_Appointment_Controller;



