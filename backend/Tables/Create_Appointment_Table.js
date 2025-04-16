
// Create_Appointment_Table.js (Node)

const { mySqlPool } = require("../config/db");

const Create_Appointment_Table = async () => {
    try {
        await mySqlPool.query(`
            CREATE TABLE IF NOT EXISTS appointment (
                id INT PRIMARY KEY AUTO_INCREMENT,
                date DATE NOT NULL,
                slote_id INT NOT NULL,
                doctor_id INT NOT NULL,
                patient_id INT NOT NULL,
                payment VARCHAR(50) DEFAULT 'Success',
                FOREIGN KEY (slote_id) REFERENCES slote(id) ON DELETE CASCADE,
                FOREIGN KEY (doctor_id) REFERENCES doctor(id) ON DELETE CASCADE,
                FOREIGN KEY (patient_id) REFERENCES patient(id) ON DELETE CASCADE
            )
        `);

        console.log("Appointment Table Created Successfully".bgGreen);

    } catch (error) {
        console.log(`Error in Create_Appointment_Table: ${error.message}`.bgRed);
    }
};

Create_Appointment_Table();


