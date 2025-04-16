
// create_User_Table.js (Node)
const { mySqlPool } = require("../config/db");
require('colors'); // To use color formatting for console messages

const create_User_Table = async () => {
    try {
        await mySqlPool.query(`
            CREATE TABLE IF NOT EXISTS user (
                id INT PRIMARY KEY AUTO_INCREMENT, 
                name VARCHAR(45), 
                email VARCHAR(45) UNIQUE, 
                password VARCHAR(1000)
            )
        `);

        console.log(`userTable Created Successfully`.bgBlack);

    } catch (error) {
        console.log(`Error in create_User_Table: ${error.message}`.bgRed);   
    }
}

create_User_Table();

