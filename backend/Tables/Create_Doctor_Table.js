
// Create_Doctor_Table.js (Node)

const { mySqlPool } = require("../config/db");

const Create_Doctor_Table = async () => {
    try {
        const doctorTable = await mySqlPool.query(`
            CREATE TABLE IF NOT EXISTS doctor (
                id INT AUTO_INCREMENT PRIMARY KEY, 
                email VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                name VARCHAR(45) NOT NULL, 
                contact VARCHAR(11) NOT NULL UNIQUE, 
                doctor_type VARCHAR(25) NOT NULL, 
                education VARCHAR(100) NOT NULL, 
                education_place VARCHAR(100) NOT NULL, 
                experience VARCHAR(50) NOT NULL, 
                about VARCHAR(1000) NOT NULL, 
                fees DECIMAL(10,2) NOT NULL, 
                img VARCHAR(1000),
                start_time TIME NOT NULL,
                end_time TIME NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("Doctor Table Created Successfully".bgGreen);

    } catch (error) {
        console.log(`Error in Create_Doctor_Table: ${error.message}`.bgRed);
    }
};

Create_Doctor_Table();


