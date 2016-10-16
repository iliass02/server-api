var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    mysql = require('mysql'),
    sequelize = new Sequelize('DATABASE', 'USER', 'PASSWORD', {
    host: "localhost",
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    logging: false
}),
    mysqlConnection = mysql.createConnection({
    user: 'USER',
    password: 'PASSWORD',
    database: 'DATABASE',
    debug: false
}),
    port = process.env.PORT || 3000,
    router = express.Router();

// MYSQL Connection
mysqlConnection.connect(function(err) {
    if (err) {
        console.log("connection to the database fail");
    } else {
        console.log("Connection to the database succeeds");
    }
});

// Set header
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Use bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/api/v1/', function(req, res) {
    res.send("API V1");
});

require('./api/routes/mainRoute.js')(router, sequelize);

app.use('/api/v1/', router);
app.listen(port);
console.log("Port : " + port);