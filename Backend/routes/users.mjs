import { exportedMethods } from '../data/users.mjs';
import { Router } from 'express';
import path from "path";
import bcrypt from 'bcrypt';
import xss from 'xss';
import { ObjectId } from 'mongodb';
import { users } from '../config/mongoCollections.mjs';

const router = Router();

router.route('/').get(async (req, res) => {
    if (req.session.user) {
        return res.status(200).redirect('/homepage');
    } else {
        return res.status(200).render('login', { title: 'Login' });
    }
});

router.route('/login')
    .get(async (req, res) => {
        try {
            return res.render("login", { title: "Login" });
        } catch (e) {
            return res.sendFile(path.resolve("/public/notFound.html"));
        }
    })
    .post(async (req, res, next) => {
        try {
            let email = xss(req.body.email);
            let password = xss(req.body.password);
            // You need to define the validation object with checkEmail and checkPassword methods
            // const validation = require('path to validation module'); // Import your validation module
            email = validation.checkEmail(email);
            password = validation.checkPassword(password);
            const sessionUser = await exportedMethods.checkUser(email, password);

            req.session.user = {
                userName: sessionUser.userName,
                email: sessionUser.Email
            };
            return res.redirect('/homepage');
        } catch (e) {
            return res.status(401).json({
                success: false,
                email: req.body.email,
                password: req.body.password,
                error: e
            });
        }
    });

router.route('/register')
    .get(async (req, res) => {
        return res.status(200).render('register', { title: "Register Page" });
    })
    .post(async (req, res) => {
        try {
            let firstName = xss(req.body.firstName);
            let lastName = xss(req.body.lastName);
            let userName = xss(req.body.userName);
            let email = xss(req.body.email);
            let password = xss(req.body.password);
            let DOB = xss(req.body.DOB);
            DOB = validation.checkDOB(DOB);
            let user;
            const userCollection = await users();
            const existingUser = await userCollection.findOne({ email: email });

            if (existingUser) {
                return res.status(401).json({
                    success: false,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    email: req.body.email,
                    DOB: req.body.DOB,
                    password: req.body.password,
                    authentication: req.body.authentication || "",
                    message: "either username or email already exists."
                });
            }

            // You need to define the userData object with createUser method
            // const userData = require('path to user data module'); // Import your user data module
            user = await userData.createUser(firstName, lastName, userName, email, password, DOB, role, department, authentication);

            if (user.insertedUser) {
                return res.redirect('/login');
            }
            return res.status(200).json({
                success: true,
                message: "Registration complete",
                data: req.session.user
            });
        } catch (e) {
            return res.status(400).json({
                success: false,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                email: req.body.email,
                DOB: req.body.DOB,
                password: req.body.password,
                error: e,
            });
        }
    });

router.route('/homepage').get(async (req, res) => {
    return res.render('homepage', {
        userId: userId, // Assuming these variables are defined somewhere in your code
        userName: userName,
        posts: postList,
        events: resu,
        title: 'Homepage'
    });
});

export default router;
