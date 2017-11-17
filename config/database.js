const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.Promise = global.Promise;

module.exports = config => {
    mongoose.connect(config.dbPath, {
        useMongoClient: true
    });
    const db = mongoose.connection;
    db.once('open', err => {
        if(err) throw err;
        User.seedAdminUser();
        console.log('DB ready');            
    });

    db.on('error', reason => {
        console.log(reason);        
    });
};