
// admin_Doctor_Login_Controller.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mySqlPool } = require("../../config/db");

const admin_Doctor_Login_Controller = async (req, res) => {
    const SECRET_KEY = "secret-key";

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"
            });
        }

        // Check admin first
        const [adminData] = await mySqlPool.query(
            "SELECT * FROM admin WHERE email=?",
            [email]
        );

        if (adminData.length > 0) {
            const admin = adminData[0];
            
            if (password === admin.password) {
                const token = jwt.sign(
                    {
                        email: admin.email,
                        id: admin.id,
                        role: 'admin'
                    },
                    SECRET_KEY,
                    { expiresIn: "1h" }
                );

                return res.status(200).json({
                    success: true,
                    message: "Admin login successful",
                    token,
                    redirect: "/admin/admin-home",
                    user: admin,
                    role: 'admin'
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }
        }

        // Check doctor if not admin
        const [doctorData] = await mySqlPool.query(
            "SELECT * FROM doctor WHERE email=?",
            [email]
        );

        if (doctorData.length > 0) {
            const doctor = doctorData[0];
            
            if (password === doctor.password) {
                const token = jwt.sign(
                    {
                        email: doctor.email,
                        id: doctor.id,
                        role: 'doctor'
                    },
                    SECRET_KEY,
                    { expiresIn: "1h" }
                );

                console.log(`doctorId : ${doctor.id}`);

                return res.status(200).json({
                    success: true,
                    message: "Doctor login successful",
                    token,
                    redirect: "/doctor/home",
                    doctorName : doctor.name,
                    doctorIMG : doctor.img,
                    doctorID : doctor.id,
                    user: doctor,
                    role: 'doctor'
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }
        }

        // If no user found
        return res.status(404).json({
            success: false,
            message: "User not found"
        });

    } catch (error) {
        console.error(`Login error: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
};

exports.admin_Doctor_Login_Controller = admin_Doctor_Login_Controller;







