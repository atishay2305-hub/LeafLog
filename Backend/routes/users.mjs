// import { Router } from 'express';
// import path from 'path';
// import userData from '../data/users.mjs';
// import validation from '../Helper/validation_checker.mjs';
// import xss from 'xss';

// const router = Router();

// // Define a middleware for checking authentication
// const checkAuth = (req, res, next) => {
//     if (req.session.user) {
//         next(); // Continue to the next middleware or route handler
//     } else {
//         res.status(401).redirect('/login'); // Redirect to login if not authenticated
//     }
// };

// // Define the home route
// router.route('/')
//     .get(async (req, res) => {
//         if (req.session.user) {
//             return res.status(200).redirect('/protected');
//         } else {
//             return res.status(200).render('login', { title: 'Login' });
//         }
//     });

// // Define the login route
// router.route('/login')
//     .get(async (req, res) => {
//         try {
//             // Your login logic here

//             // If login is successful, redirect to the protected route
//             return res.redirect('/protected');
//         } catch (e) {
//             // If an error occurs, send a status code and redirect to the 'notfound' route
//             return res.status(404).redirect('/notfound');
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

//             if (sessionUser && !req.session.user) {
//                 req.session.user = {
//                     userId: sessionUser.userId, // Assuming you have userId in the session
//                     userName: sessionUser.userName,
//                     email: sessionUser.Email
//                 };
//             }

//             return res.redirect('/protected');
//         } catch (e) {
//             return res.status(401).json({
//                 success: false,
//                 email: req.body.email,
//                 password: req.body.password,
//                 error: e.message // Use e.message for a more informative error response
//             });
//         }
//     });

// // Define the 'notfound' route
// router.route('/notfound')
//     .get((req, res) => {
//         // Handle the 'notfound' route logic here
//         return res.status(404).send('Not Found'); // You can customize the response as needed
//     });

// // Protected route - requires authentication
// router.route('/protected')
//     .all(checkAuth) // Apply the checkAuth middleware to all HTTP methods for this route
//     .get(async (req, res) => {
//         const userId = req.session.user ? req.session.user.userId : undefined;
//         const userName = req.session.user ? req.session.user.userName : undefined;
//         const postList = []; // Assuming you fetch posts from somewhere
//         const resu = {}; // Assuming you fetch events from somewhere

//         return res.render('protected', {
//             userId,
//             userName,
//             posts: postList,
//             events: resu,
//             title: 'Protected'
//         });
//     });

// // Profile route - requires authentication
// router.route('/profile')
//     .all(checkAuth) // Apply the checkAuth middleware to all HTTP methods for this route
//     .get(async (req, res) => {
//         const userId = req.session.user ? req.session.user.userId : undefined;
//         const userName = req.session.user ? req.session.user.userName : undefined;

//         return res.render('profile', {
//             userId,
//             userName,
//             title: 'User Profile'
//         });
//     });

//     // Update user route - requires authentication
// router.route('/updateProfile')
// .all(checkAuth) // Apply the checkAuth middleware to all HTTP methods for this route
// .get(async (req, res) => {
//     const userId = req.session.user ? req.session.user.userId : undefined;
//     const userName = req.session.user ? req.session.user.userName : undefined;

//     return res.render('updateProfile', {
//         userId,
//         userName,
//         title: 'Update Profile'
//     });
// })
// .post(async (req, res) => {
//     try {
//         const userId = req.session.user ? req.session.user.userId : undefined;
        
//         // Assuming you have a form with updated user data in req.body.updatedData
//         const updatedData = req.body.updatedData;

//         // Perform the update
//         const updatedUserInfo = await userData.updateUser(userId, updatedData);

//         // Update session user data
//         req.session.user = {
//             userId,
//             userName: updatedUserInfo.userName,
//             email: updatedUserInfo.Email
//         };

//         return res.redirect('/profile');
//     } catch (e) {
//         return res.status(400).json({
//             success: false,
//             error: e.message
//         });
//     }
// });


// export default router;
