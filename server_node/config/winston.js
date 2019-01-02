const logDir = 'logs';
const fs = require('fs');
var winston = require('winston');
require('winston-daily-rotate-file');

    // kiểm tra nếu tồn tại 
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    // Cấu hình file log
    var transport = new (winston.transports.DailyRotateFile)({
    filename: `${logDir}`+'/report-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    handleExceptions: true,
    maxSize: '20m',
    maxFiles: '14d'
    });

    transport.on('rotate', function(oldFilename, newFilename) {
    // do something fun
    console.log(new Date(), oldFilename, newFilename)
    });

    var logger = winston.createLogger({
    transports: [
        transport
    ],
    exitOnError: false,
    });

    logger.stream = {
        write: function(message, encoding) {
          // use the 'info' log level so the output will be picked up by both transports (file and console)
          logger.info(message);
        },
      };
      
    module.exports = logger;