
// create_Account_User_Controller.js (Node)

const { mySqlPool } = require("../../config/db");
const bcrypt = require('bcrypt');

const create_Account_User_Controller = async (req, res) => {
    try {
        
        const {name, email, password} = req.body;

        if (!name || !email || !password) {

            console.log("All the input are mandatory".bgRed);

            return res.status(400).json({

                success : false,
                message : "All the input are mandatory",
            })
        }

        const [isUser] = await mySqlPool.query("SELECT * FROM user WHERE email=?", [email]); 

        if (isUser.length > 0) {
            
            console.log("this user have alredy an account".bgRed);
            
            res.status(409).json({

                success : false,
                message : "All the input are mandatory",
                redirect : "/user-login"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        console.log(hashPassword);
        
        await mySqlPool.query("INSERT INTO user (name, email, password) VALUES (?,?,?)", [name, email, hashPassword])

        console.log("Account created Successfully".bgGreen);
        
        res.status(200).json({

            success : true,
            message : "Account created Successfully",
            redirect : "/user-login"
        })

    } catch (error) {
        
        console.log(`Error in create_Account_User_Controller API : ${error.message}`.bgRed);
        
        res.status(500).json({
            
            success : false,
            message : `Error in create_Account_User_Controller API : ${error.message}`
        })
    }
}

exports.create_Account_User_Controller = create_Account_User_Controller



