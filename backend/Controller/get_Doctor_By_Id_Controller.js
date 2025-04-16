
// get_Doctor_By_Id_Controller.js (Node)

const { mySqlPool } = require("../config/db");

const get_Doctor_By_Id_Controller = async (req, res) => {
    try {

        const {id} = req.params;

        const [doctor] = await mySqlPool.query("SELECT * FROM doctor WHERE id=?", [id]);


        if (!doctor || doctor.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        console.log("Doctor data featch Successfully.......!");

        res.status(200).json({
            success: true,
            message : "Doctor data featch Successfully.......!",
            doctor: doctor[0]
        });
        
    } catch (error) {
        
        console.error(`Error in getDoctorById: ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: "Error fetching doctor details"
        });
    }
}

exports.get_Doctor_By_Id_Controller = get_Doctor_By_Id_Controller;

