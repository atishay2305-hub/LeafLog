import { Router } from 'express';
import userData from '../data/auth.mjs';
import validation from '../Helper/validation_checker.mjs';

const router = Router();

const checkAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).redirect('/login');
    }
};

router.route('/')
    .get(async (req, res) => {
        if (req.session.user) {
            return res.status(200).redirect('/protected');
        } else {
            return res.status(200).json({ message: 'Not authenticated' });
        }
    });

router
    .route('/register')
    .get((req, res) => res.status(200).json({ message: 'Register page' }))
    .post(async (req, res) => {
        try {
            if (!req.body) return res.status(400).json({ error: "Body cannot be empty" });

            let {
                firstNameInput: firstName,
                lastNameInput: lastName,
                emailAddressInput: emailAddress,
                passwordInput: password,
                confirmPasswordInput,
                roleInput: role
            } = req.body;

            validation(firstName.trim(), lastName.trim(), emailAddress.trim(), password, role.trim());

            if (password !== confirmPasswordInput)
                return res.status(400).json({ error: "Both password & confirm password should match." });

            let newUser = await userData.createUser(firstName, lastName, emailAddress, password, role);

            if (newUser.insertedUser) return res.status(200).json({ message: 'User created successfully' });
        } catch (err) {
            console.error(err);

            if (typeof err === "string")
                return err.startsWith("VError") ?
                    res.status(400).json({ error: err.substr(1) }) :
                    res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router
    .route('/login')
    .get((req, res) => res.status(200).json({ message: 'Login page' }))
    .post(async (req, res) => {
        try {
            if (!req.body) return res.status(400).json({ error: "Email and password are required" });
            let { emailAddressInput: emailAddress, passwordInput: password } = req.body;
            validation(emailAddress.trim(), password.trim());

            let user = await userData.checkUser(emailAddress, password);
            req.session.user = user;

            return (user.role === "admin") ? res.status(200).json({ message: 'Admin login' }) : res.status(200).json({ message: 'User login' });
        } catch (err) {
            console.error(err);

            if (typeof err === "string") {
                return err.startsWith("VError") ?
                    res.status(400).json({ error: err.substring(1) }) :
                    res.status(500).json({ error: "Internal Server Error" });
            }
        } 
    });


// Define the 'notfound' route
router.route('/notfound')
    .get((req, res) => res.status(404).json({ error: 'Not Found' }));

router.route('/protected').get((req, res) => {
    if (req.session.user) {
        let data = {
            message: 'Protected Route',
            isAdmin: (req.session.user.role === "admin"),
            firstName: req.session.user.firstName,
            currentTime: new Date().toUTCString(),
            role: req.session.user.role
        };
        return res.status(200).json(data);
    } else {
        return res.status(401).json({ error: 'Not authenticated' });
    }
});

// Profile route - requires authentication
router.route('/profile')
    .all(checkAuth)
    .get(async (req, res) => {
        const userId = req.session.user ? req.session.user.userId : undefined;
        const userName = req.session.user ? req.session.user.userName : undefined;

        return res.status(200).json({
            userId,
            userName,
            message: 'User Profile'
        });
    });

// Update user route - requires authentication
router.route('/updateProfile')
    .all(checkAuth)
    .get(async (req, res) => {
        const userId = req.session.user ? req.session.user.userId : undefined;
        const userName = req.session.user ? req.session.user.userName : undefined;

        return res.status(200).json({
            userId,
            userName,
            message: 'Update Profile'
        });
    })
    .post(async (req, res) => {
        try {
            const userId = req.session.user ? req.session.user.userId : undefined;
            const updatedData = req.body.updatedData;
            const updatedUserInfo = await userData.updateUser(userId, updatedData);
            req.session.user = {
                userId,
                userName: updatedUserInfo.userName,
                email: updatedUserInfo.email
            };

            return res.status(200).json({ message: 'Profile updated successfully' });
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    });

router.route('/logout')
    .get((req, res) => {
        req.session.destroy();
        return res.status(200).json({ message: 'Logout successful' });
    });

export default router;
