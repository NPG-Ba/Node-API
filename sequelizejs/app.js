var express = require("express")
var bodyParser = require("body-parser")

var Employee = require("./routes/employee.router")
var cors = require("cors")
var config = require('./config.js');

const db = require('./database/mysql.config')

var app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Check connections database

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit();
  });

  // server listen

app.listen(config.port, function () {
    console.log('Server started on port ' + config.port)
})

Employee(app); //register the route