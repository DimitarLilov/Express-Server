const encryption = require('../util/encryption');
const User = require('mongoose').model('User');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async(req, res) => {
        const requestUser = req.body;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, requestUser.password);
        try {
            const user = await User.create({
                username: requestUser.username,
                hashedPass: hashedPass,
                salt: salt,
                firstName: requestUser.firstName,
                lastName: requestUser.lastName,
                roles: []
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err.message;
                    res.render('users/register', user);
                    return;
                } else {
                    res.redirect('/');
                }
            });

        } catch (e) {
            console.log(e);
            res.locals.globalError = e.message;
            res.render('users/register');
        }
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },
    loginPost: async(req, res) => {
        let reqUser = req.body;
        const user = await User.findOne({
            username: reqUser.username
        });

        try {
            if (!user) {
                errorHandling('Invalid username or password');
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                errorHandling('Invalid username or password');
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/login', user);
                    return;
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandling(e);
        }

        function errorHandling(err) {
            res.locals.globalError = err;
            res.render('users/login');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    }
};