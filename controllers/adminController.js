// Controller logic for admin routes
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const Company = require('../models/Company');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'sachin.212638112@vcet.edu.in',
        pass: 'hzhquqgmcajxiqkz'
    }
  });
  
const saltRounds = 10;
 exports.checkAdminAuthorization = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.redirect('/admin/login'); // Redirect unauthorized users to the admin login page
        return;
    }

    jwt.verify(token, jwtSecret , (err, decoded) => {
        if (err) {
            res.redirect('/admin/login'); // Redirect unauthorized or tampered tokens to the admin login page
        } else {
            req.userType = decoded.userType;
            next(); // User is authorized, continue to the route handler
        }
    });
};
exports.postLogin = (req, res) => {
    const { username, password } = req.body;


    if (username === 'admin' && password === '123456') {
        // Admin authentication successful
        const token = jwt.sign({ userType: 'Admin' }, jwtSecret); // Create a JWT token
        res.cookie('token', token); // Set the token as a cookie (you can also send it as a response)
        res.redirect('/admin/index');
    } else {
        
        res.status(400).render('login.ejs', { userType: 'Admin',errorMessage: 'Invalid username or password' });

    }
};

exports.getLoginPage = (req, res) => {
    res.render('login', { userType: 'Admin',errorMessage:null }); // Render the login page
};
exports.getRegisterPage = (req, res) => {
    res.render('register'); // Render the login page
};
exports.getFaqPage = (req, res) => {
    res.render('faq'); // Render the login page
};
// adminController.js
exports.logout = (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    res.redirect('/admin/login');
};
exports.getIndex=(req,res)=>{
    res.render('index');
}
function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
}
exports.registerCompany = async (req, res) => {
    try {
        // Extract company details from the form
        const { companyName, ownerName, gstNo, address, state, city, email } = req.body;

        // Generate a random password for the company (you can implement your logic here)
        const password = generateRandomPassword();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new company instance
        const newCompany = new Company({
            companyName,
            ownerName,
            gstNo,
            address,
            state,
            city,
            email,
            password: hashedPassword // Save the hashed password
        });

        // Save the company to the database
        await newCompany.save();

        const mailOptions = {
            from: 'nikhil.212708111@vcet.edu.in',
            to: email,
            subject: 'Login Credentials',
            text: `Username: ${email}\nPassword: ${password}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                // Handle email sending error here
            } else {
                console.log('Email sent: ' + info.response);
                // Redirect or render a success page
                res.render('index');
            }
        });
    } catch (error) {
        console.error(error);
        // Handle registration error here
        res.status(500).send('Error registering company');
    }
};
exports.getDashboard = async (req, res) => {
    try {
        // Fetch all registered companies from the database
        const companies = await Company.find();

        
        // Extract unique states and cities from the companies
        const statesSet = new Set();
        const citiesSet = new Set();

        companies.forEach(company => {
            statesSet.add(company.state);
            citiesSet.add(company.city);
        });

        // Convert sets to arrays
        const states = Array.from(statesSet);
        const cities = Array.from(citiesSet);

        res.render('dashboard', { companies, states, cities });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching companies');
    }
};



