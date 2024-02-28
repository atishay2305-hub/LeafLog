import userData from '../data/users.mjs';
import validation from '../validation_checker.mjs';
import { Router } from 'express';
import path from 'path';
import xss from 'xss';

const router = Router();

// router.route('/').get(async (req, res) => {
//     if (req.session.user) {
//         return res.status(200).redirect('/homepage');
//     } else {
//         return res.status(200).render('login', { title: 'Login' });
//     }
// });

// router.route('/login')
//     .get(async (req, res) => {
//         try {
//             return res.render('login', { title: 'Login' });
//         } catch (e) {
//             return res.sendFile(path.resolve('/public/notFound.html'));
//         }
//     })
//     .post(async (req, res, next) => {
//         try {
//             let email = xss(req.body.email);
//             let password = xss(req.body.password);

//             // Validate email and password
//             email = validation.checkEmail(email);
//             password = validation.checkPassword(password);

//             const sessionUser = await userData.checkUser(email, password);

//             if (!req.session.user) {
//                 req.session.user = {
//                     userName: sessionUser.userName,
//                     email: sessionUser.Email
//                 };
//             }

//             return res.redirect('/homepage');
//         } catch (e) {
//             return res.status(401).json({
//                 success: false,
//                 email: req.body.email,
//                 password: req.body.password,
//                 error: e
//             });
//         }
//     });

// router.route('/register')
//     .get(async (req, res) => {
//         return res.status(200).render('register', { title: 'Register Page' });
//     })
//     .post(async (req, res) => {
//         try {
//             let firstName = xss(req.body.firstName);
//             let lastName = xss(req.body.lastName);
//             let userName = xss(req.body.userName);
//             let email = xss(req.body.email);
//             let password = xss(req.body.password);
//             let DOB = xss(req.body.DOB);

//             // Validate email, password, and DOB
//             email = validation.checkEmail(email);
//             password = validation.checkPassword(password);
//             DOB = validation.checkDOB(DOB);

//             // Check if user already exists
//             const existingUser = await userData.checkUser(email, password);
//             if (existingUser) {
//                 return res.status(401).json({
//                     success: false,
//                     firstName: req.body.firstName,
//                     lastName: req.body.lastName,
//                     userName: req.body.userName,
//                     email: req.body.email,
//                     DOB: req.body.DOB,
//                     password: req.body.password,
//                     authentication: req.body.authentication || '',
//                     message: 'Either username or email already exists.'
//                 });
//             }

//             // Create new user
//             const user = await userData.createUser(firstName, lastName, userName, email, password, DOB);

//             if (user.insertedUser) {
//                 return res.redirect('/login');
//             }

//             return res.status(200).json({
//                 success: true,
//                 message: 'Registration complete',
//                 data: req.session.user
//             });
//         } catch (e) {
//             return res.status(400).json({
//                 success: false,
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 userName: req.body.userName,
//                 email: req.body.email,
//                 DOB: req.body.DOB,
//                 password: req.body.password,
//                 error: e
//             });
//         }
//     });

// router.route('/homepage').get(async (req, res) => {
//     // Assuming these variables are defined somewhere in your code
//     const userId = req.session.user ? req.session.user.userId : undefined;
//     const userName = req.session.user ? req.session.user.userName : undefined;
//     const postList = []; // Assuming you fetch posts from somewhere
//     const resu = {}; // Assuming you fetch events from somewhere

//     return res.render('homepage', {
//         userId: userId,
//         userName: userName,
//         posts: postList,
//         events: resu,
//         title: 'Homepage'
//     });
// });


// router.route('/profile')
//     .get(async (req, res) => {
//         const userId = req.session.user ? req.session.user.userId : undefined;
//         const userName = req.session.user ? req.session.user.userName : undefined;

//         return res.render('profile', {
//             userId: userId,
//             userName: userName,
//             title: 'User Profile'
//         });
//     });


export default router;
