// Set Node.js to Developer Environment
process.env.NODE_ENV = 'development';

// Set necessary credentials
const HEROKU_DATABASE_CREDENTIALS = 'mysql://bc2af50727d180:285a035f@us-cdbr-east-02.cleardb.com/heroku_a566b55f09df9d3?reconnect=true';

const LOCAL_DATABASE_CREDENTIALS = {
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'bc2af50727d180', // put your DB username here
    password: '285a035f', // put your DB password here
    database: 'heroku_a566b55f09df9d3', // put your DB name here
};

module.exports = {
    LOCAL_DATABASE_CREDENTIALS : LOCAL_DATABASE_CREDENTIALS,
};