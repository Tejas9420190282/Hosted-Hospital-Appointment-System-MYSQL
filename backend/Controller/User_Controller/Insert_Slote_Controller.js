
// insert_Slote_Controller.js (Node)

const { mySqlPool } = require("../../config/db");

const insert_Slote_Controller = async (req, res) => {

    try {
        const {id, patientId, selectedSlot, selectedDate} =  req.query  ;

        if (!id) {
            
            console.log("Input Mandatory".bgRed);
            
            return res.status(401).json({
                success : false,
                message : "Input Mandatory"
            });
        } 
        
        // shows slotes
       // const [slote] = await mySqlPool.query("SELECT * FROM slote WHERE doctor_id=?", [id]); 
 
        const [slote] = await mySqlPool.query("SELECT s.* FROM slote s LEFT JOIN appointment a ON s.id = a.slote_id AND a.doctor_id = s.doctor_id AND a.date = ? WHERE s.doctor_id = ? ", [selectedDate, id]);
 

        console.log("Slotes Shows Successfully");

        console.log(slote);

        const [doctorFeesRows] = await mySqlPool.query(
            "SELECT fees FROM doctor WHERE id = ?", 
            [id]
        );

        // Extract the first row (if exists)
        const doctorFees = doctorFeesRows[0]?.fees;

        console.log("Doctor fees:", doctorFees);
        
        
        res.status(200).json({
            
            success : true,
            message : "Slotes Shows Successfully",
            slote : slote,
            doctorFees : doctorFees
        })
        
    } catch (error) {
        
        console.log(`Error in insert_Slote_Controller API : ${error.message}`.bgRed);
        
        res.status(500).json({

            success : false,
            message : `Error in insert_Slote_Controller API : ${error.message}`,
        })
    }
}

exports.insert_Slote_Controller = insert_Slote_Controller


