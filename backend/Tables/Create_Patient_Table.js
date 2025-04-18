
// patientTable.js (Node)

const { mySqlPool } = require("../config/db");

const Create_Patient_Table = async () => {
    try {
        const patientTable = await mySqlPool.query(`
            CREATE TABLE IF NOT EXISTS patient1 (
                id INT PRIMARY KEY AUTO_INCREMENT, 
                name VARCHAR(100) NOT NULL, 
                contact VARCHAR(10) NOT NULL, 
                address VARCHAR(100) NOT NULL,
                doctor_id INT NOT NULL,
                FOREIGN KEY (doctor_id) REFERENCES doctor1(id)  ON DELETE CASCADE
            )
        `);

        console.log("patientTable created successfully".bgGreen);       

    } catch (error) {
        console.log(`Error in Create_Patient_Table : ${error.message}`.bgRed);
    }
}

Create_Patient_Table();



