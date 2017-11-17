const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/about', restrictedPages.isAuthenticate, controllers.home.about);
    app.get('/admin', restrictedPages.isInRole('Admin'), controllers.admin.index);
    app.get('/user/register', controllers.user.registerGet);
    app.post('/user/register', controllers.user.registerPost);
    app.get('/user/login', controllers.user.loginGet);
    app.post('/user/login', controllers.user.loginPost);
    app.post('/user/logout', controllers.user.logout);

    app.all('*', (req,res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};
