const winston = require('winston');
const LogstashTransport = require("winston-logstash/lib/winston-logstash-latest");

const { combine, timestamp, json , cli, colorize} = winston.format;


// creating logger instance
const logger = winston.createLogger({
    level: 'info',
    format: combine(
        json(),
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A', // 2022-01-25 03:23:10.350 PM
          })
    ),
    transports: [
        new winston.transports.Console(),
        new LogstashTransport({
            host: 'localhost',
            port: 5044,
            max_connect_retries: -1,
            index:"express-log"
          }),
        new winston.transports.File({
        filename:'info.log'
    }),
    new winston.transports.File({
        filename:'error.log',
        level:'error'
    })
],

});


module.exports = logger