// Controller logic for user routes
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Company = require('../models/Company');
function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
}
exports.getLoginPage = (req, res) => {
    const userType = 'User'; // Assuming you've set userType in your middleware
    console.log("User Type:", userType);
    res.render('login', { userType: 'User',errorMessage:null });
};



exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user with the provided email exists and is registered by the admin
        const user = await Company.findOne({ email: username });

        if (user && (await bcrypt.compare(password, user.password))) {
            // User authentication successful
            const tokenPayload = {
                userType: 'user',
                userId: user._id // Include the user's ID in the token payload
            };

            const token = jwt.sign(tokenPayload, jwtSecret); // Create a JWT token
            res.cookie('token', token); // Set the token as a cookie (you can also send it as a response)

            // Redirect the user to the update-details page
            res.render('userIndex');
        } else {
            // Authentication failed
            res.status(400).render('login.ejs', { userType: 'Admin',errorMessage: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        // Handle login error here
        res.status(500).send('Error during login');
    }
};
exports.extractUserIdFromToken= (req, res, next)=>{
    const token =  req.cookies.token;

    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (!err && decoded.userId) {
                req.userId = decoded.userId; // Attach the user ID to the request object
            }
            next();
        });
    } else {
        next();
    }
};

// GET request for the update details page
exports.getUpdateDetailsPage = async (req, res) => {
    try {
        // Assuming you're using JWT for authentication
        const userId = req.userId;

        // Retrieve the user's current details from the database
        const user = await Company.findById(userId);

        // Render the update details form with the current data
        res.render('updateDetails', { user });
    } catch (error) {
        console.error(error);
        // Handle error if data retrieval fails
        res.status(500).send('Error fetching user data');
    }
};


exports.postUpdateDetails = async (req, res) => {
    try {
        const email = req.body.email; // Get the user ID from the request object

        if (!email) {
            // Handle the case where the user ID is not available
            res.status(401).send('Unauthorized'); // You can customize the response as needed
            return;
        }

        // Retrieve the updated data from the form
        const updatedData = req.body;

        // Update the user's details in the database using Mongoose
        await Company.findOneAndUpdate({ email: req.body.email}, updatedData);

        // Redirect the user to their dashboard or another page
        res.render('userIndex')
    } catch (error) {
        console.error(error);
        // Handle the update error here
        res.status(500).send('Error updating user details');
    }
};

exports.forgotPassword = (req, res) => {
   
    res.render('forgotPassword'); // Render the forgot_password view
};

exports.sendPasswordResetEmail = async (req, res) => {
    try {
        // Extract the user's email from the request
        const { email } = req.body;

        // Generate a new random password for the user
        const newPassword = generateRandomPassword(8); // Adjust the length as needed
        const saltRounds = 10;
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds); // Make sure saltRounds is defined

        // Update the user's password in the database with the new hashed password
        await Company.updateOne({ email }, { password: hashedPassword });

        const mailOptions = {
            from: 'nikhil.212708111@vcet.edu.in', // Set your email address
            to: email,
            subject: 'Password Reset',
            text: `Your new password is: ${newPassword}`,
        };

        // Send the password reset email
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'nikhil.212708111@vcet.edu.in',
                pass: 'hzhquqgmcajxiqkz'
            }
          });
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                // Handle email sending error here
            } else {
                console.log('Email sent: ' + info.response);
                // Redirect or render a success page
                res.render('login', { userType: 'User',errorMessage:null });
            }
        });
          
    } catch (error) {
        console.error(error);
        // Handle password reset error here
        res.status(500).send('Error resetting password');
    }
};



