import { Router } from 'express';
import userData from '../data/auth.mjs';
import validation from '../Helper/validation_checker.mjs';

const router = Router();

const checkAuth = (req, res, next) => {
    if (req.session.user) {
        next(); // Continue to the next middleware or route handler
    } else {
        res.status(401).redirect('/login'); // Redirect to login if not authenticated
    }
};

router.route('/')
    .get(async (req, res) => {
        if (req.session.user) {
            return res.status(200).redirect('/protected');
        } else {
            return res.status(200).render('login', { title: 'Login' });
        }
    });

router
    .route('/register')
    .get((req, res) => res.render('register', { title: "Register" }))
    .post(async (req, res) => {
        try {
            if (!req.body) return res.status(400).send("Error: Body cannot be empty");

            let {
                firstNameInput: firstName,
                lastNameInput: lastName,
                emailAddressInput: emailAddress,
                passwordInput: password,
                confirmPasswordInput,
                roleInput: role
            } = req.body;

            validate(firstName.trim(), lastName.trim(), emailAddress.trim(), password, role.trim());

            if (password !== confirmPasswordInput)
                return res.status(400).render('register', { title: 'Register', error: "400 - Error: Both password & confirm password should match." });

            let newUser = await userData.createUser(firstName, lastName, emailAddress, password, role);

            if (newUser.insertedUser) return res.redirect("/login");
        } catch (err) {
            console.error(err);

            if (typeof err === "string")
                return err.startsWith("VError") ?
                    res.status(400).render('register', { title: "Register", error: `400 - ${err.substr(1)}` }) :
                    res.status(400).render('register', { title: "Register", error: `400 - ${err}` });

            return res.status(500).send("Internal Server Error");
        }
    });

router
    .route('/login')
    .get((req, res) => res.render('login', { title: "Login" }))
    .post(async (req, res) => {
        try {
            if (!req.body) return res.status(400).send("Error: Email and password are required");
            let { emailAddressInput: emailAddress, passwordInput: password } = req.body;
            validation(emailAddress.trim(), password.trim());

            let user = await userData.checkUser(emailAddress, password);
            req.session.user = user;

            return (user.role === "admin") ? res.redirect("/admin") : res.redirect("/protected");
        } catch (err) {
            console.error(err);

            if (typeof err === "string")
                return err.startsWith("VError") ?
                    res.status(400).render('login', { title: "Login", error: `400 - ${err.substr(1)}` }) :
                    res.status(400).render('login', { title: "Login", error: `400 - ${err}` });

            return res.status(500).send("Internal Server Error");
        }
    });

// Define the 'notfound' route
router.route('/notfound')
    .get((req, res) => {
        // Handle the 'notfound' route logic here
        return res.status(404).send('Not Found'); // You can customize the response as needed
    });

router.route('/protected').get((req, res) => {
    let data = {
        title: "Protected",
        isAdmin: (req.session.user.role === "admin"),
        firstName: req.session.user.firstName,
        currentTime: new Date().toUTCString(),
        role: req.session.user.role
    };
    return res.render("protected", data);
});

// Profile route - requires authentication
router.route('/profile')
    .all(checkAuth) // Apply the checkAuth middleware to all HTTP methods for this route
    .get(async (req, res) => {
        const userId = req.session.user ? req.session.user.userId : undefined;
        const userName = req.session.user ? req.session.user.userName : undefined;

        return res.render('profile', {
            userId,
            userName,
            title: 'User Profile'
        });
    });

// Update user route - requires authentication
router.route('/updateProfile')
    .all(checkAuth) // Apply the checkAuth middleware to all HTTP methods for this route
    .get(async (req, res) => {
        const userId = req.session.user ? req.session.user.userId : undefined;
        const userName = req.session.user ? req.session.user.userName : undefined;

        return res.render('updateProfile', {
            userId,
            userName,
            title: 'Update Profile'
        });
    })
    .post(async (req, res) => {
        try {
            const userId = req.session.user ? req.session.user.userId : undefined;

            // Assuming you have a form with updated user data in req.body.updatedData
            const updatedData = req.body.updatedData;

            // Perform the update
            const updatedUserInfo = await userData.updateUser(userId, updatedData);

            // Update session user data
            req.session.user = {
                userId,
                userName: updatedUserInfo.userName,
                email: updatedUserInfo.email
            };

            return res.redirect('/profile');
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.message
            });
        }
    });


// Export the router
export default router;
