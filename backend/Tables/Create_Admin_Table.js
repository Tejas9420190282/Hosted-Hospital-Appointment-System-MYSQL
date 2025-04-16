
// Admin_Table_Creation.js

const { mySqlPool } = require("../config/db");

const Admin_Table_Creation = async () => {
    try {
        const admin = await mySqlPool.query(
            "CREATE TABLE IF NOT EXISTS admin(id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(45), password VARCHAR(45))"
        );

        console.log(`Admin table created`.bgGreen);
    
    } catch (error) {

        console.log(`Error in Admin_Table_Creation : ${error.message}`);    
    }
};

Admin_Table_Creation();
