var config = {};

config.port = 8081;

//Authentication
config.auth = false;

//Database
config.database = 'employeedb';
config.username = 'root';
config.password = '123456';
config.host= 'localhost';
config.dialect= 'mysql';
config.operatorsAliases= false;

config.table_prefix = '';

//Pagination
config.paginate = true;
config.page_limit = 10;

module.exports = config;