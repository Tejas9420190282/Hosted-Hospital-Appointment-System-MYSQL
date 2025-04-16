// User_View_Scedule_Appointment_Controller.js (Node)

const { mySqlPool } = require("../../config/db");

const User_View_Scedule_Appointment_Controller = async (req, res) => {
    try {
        const { sloteId, doctorId, patientId } = req.query;

        console.log(req.query);

        if (!sloteId || !doctorId || !patientId) {
            console.log("All the inputd are Mandatory..".bgRed);

            return res.status(400).json({
                success: false,
                message: "All the inputd are Mandatory..",
            });
        }

        // Fixed SQL syntax - removed extra comma after status
        const [slote] = await mySqlPool.query(
            "SELECT start_time, end_time, status FROM slote WHERE id=? AND doctor_id=?",
            [sloteId, doctorId]
        );

        console.log("Slote data fetched successfully");

        // Fixed query - removed doctor_id condition since patient table doesn't need it
        const [patient] = await mySqlPool.query(
            "SELECT name, contact, address FROM patient WHERE id=?",
            [patientId]
        );

        console.log("Patient data fetched successfully");

        const [doctor] = await mySqlPool.query(
            "SELECT email, name, contact, doctor_type, education, experience FROM doctor WHERE id=?",
            [doctorId]
        );

        console.log("Doctor data fetched successfully");

        const [appointment] = await mySqlPool.query(
            "SELECT date FROM appointment WHERE slote_id=? AND doctor_id=? AND patient_id=?",
            [sloteId, doctorId, patientId]
        );

        const formattedDate = appointment[0]
            ? new Date(appointment[0].date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
              })
            : "No date found";

        console.log("Slote:", slote);
        console.log("Patient:", patient);
        console.log("Doctor:", doctor);
        console.log("Appointment: ", formattedDate);

        res.status(200).json({
            success: true,
            message: "All data fetched successfully",
            slote: slote[0],
            patient: patient[0],
            doctor: doctor[0],
            appointmentDate: formattedDate, // Send just the formatted string
            slotTime: `${slote[0].start_time} To ${slote[0].end_time}`, // Pre-formatted time string
        });
    } catch (error) {
        console.log(
            `Error in User_View_Scedule_Appointment_Controller API : ${error.message}`
                .bgRed
        );

        res.status(500).json({
            success: false,
            message: `Error in User_View_Scedule_Appointment_Controller API : ${error.message}`,
        });
    }
};

exports.User_View_Scedule_Appointment_Controller =
    User_View_Scedule_Appointment_Controller;
