import userData from '../data/users.mjs';
import validation from '../Helper/validation_checker.mjs';
import { Router } from 'express';
import path from 'path';
import xss from 'xss';

const router = Router();

router.route('/').get(async (req, res) => {
    if (req.session.user) {
        return res.status(200).redirect('/protected');
    } else {
        return res.status(200).render('login', { title: 'Login' });
    }
});

router.route('/login')
    .get(async (req, res) => {
        try {
            // Your login logic here

            // If login is successful, you can redirect to a different route
            return res.redirect('/dashboard');
        } catch (e) {
            // If an error occurs, send a status code and redirect to the 'notfound' route
            return res.status(404).redirect('/notfound');
        }
    });

// Define the 'notfound' route
router.route('/notfound')
    .get((req, res) => {
        // Handle the 'notfound' route logic here
        return res.status(404).send('Not Found'); // You can customize the response as needed
    })
    .post(async (req, res, next) => {
        try {
            let email = xss(req.body.email);
            let password = xss(req.body.password);

            // Validate email and password
            email = validation.checkEmail(email);
            password = validation.checkPassword(password);

            const sessionUser = await userData.checkUser(email, password);

            if (sessionUser && !req.session.user) {
                req.session.user = {
                    userName: sessionUser.userName,
                    email: sessionUser.Email
                };
            }

            return res.redirect('/protected');
        } catch (e) {
            return res.status(401).json({
                success: false,
                email: req.body.email,
                password: req.body.password,
                error: e
            });
        }
    });



router.route('/protected').get(async (req, res) => {
    // Assuming these variables are defined somewhere in your code
    const userId = req.session.user ? req.session.user.userId : undefined;
    const userName = req.session.user ? req.session.user.userName : undefined;
    const postList = []; // Assuming you fetch posts from somewhere
    const resu = {}; // Assuming you fetch events from somewhere

    return res.render('protected', {
        userId: userId,
        userName: userName,
        posts: postList,
        events: resu,
        title: 'protected'
    });
});


router.route('/profile')
    .get(async (req, res) => {
        const userId = req.session.user ? req.session.user.userId : undefined;
        const userName = req.session.user ? req.session.user.userName : undefined;

        return res.render('profile', {
            userId: userId,
            userName: userName,
            title: 'User Profile'
        });
    });


export default router;
