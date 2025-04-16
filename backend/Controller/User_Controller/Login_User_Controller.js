
// login_User_Controler.js (Node)

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { mySqlPool } = require("../../config/db");

const login_User_Controler = async (req, res) => {
    const SECRET_KEY = "secret-key";

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log(`All the inputs are mandatory`.bgRed);

            return res.status(400).json({
                success: false,
                message: `All the inputs are mandatory`,
            });
        }

        const [userResult] = await mySqlPool.query(
            "SELECT * FROM user WHERE email=?",
            [email]
        );

        const user = userResult[0];

        if (!user) {
            console.log("User is not Fount, Please Firstly Create an Account!");

            return res.status().json({
                success: false,
                message: "User is not Fount, Please Firstly Create an Account!",
                
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("Invalid Password....".bgRed);

            return res.status().json({
                success: false,
                message: "Invalid Password....",
            });
        }

        const token = jwt.sign(
            {
                id: user.id, email: user.email, password: user.password }, SECRET_KEY, { expiresIn: "1h" }
        );

        console.log("Successfully Logged in as User!".bgGreen);

        const userName = user.name;
        console.log("userName : ", userName);
        
        res.status(200).json({
            success: true,
            message: "Successfully Logged in user!",                
            token,
            userName: user.name, 
            redirect: "/user/user-home",
        });

    } catch (error) {
        console.log(`Error in login_User_Controler API : ${error.message}`);

        res.status(500).json({
            success: false,
            message: `Error in login_User_Controler API : ${error.message}`,
        });
    }
};

exports.login_User_Controler =  login_User_Controler;





