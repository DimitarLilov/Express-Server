const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const app = require('express')();

require('./config/database')(config);
require('./config/express')(app);
require('./config/routes')(app);
require('./config/passport')();

app.listen(config.port);


