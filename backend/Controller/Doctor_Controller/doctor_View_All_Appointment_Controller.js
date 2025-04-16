
// doctor_View_All_Appointment_Controller.js (Node)

const { mySqlPool } = require("../../config/db");

const doctor_View_All_Appointment_Controller = async (req, res) => {
    
    try {
        const { doctorId } = req.body;

        const [appointments] = await mySqlPool.query(
            "SELECT patient.name, patient.contact, patient.address, appointment.date, slote.start_time, slote.end_time FROM appointment JOIN patient ON appointment.patient_id = patient.id JOIN slote ON appointment.slote_id = slote.id WHERE appointment.doctor_id = ?",
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



