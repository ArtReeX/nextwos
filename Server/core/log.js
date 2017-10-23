/*----------- ЗАГОЛОВКИ -----------*/
/*globals require*/
var config_module = require('../config');
var log4js_module = require('log4js');


/*---------------------------- LOG -------------------------------*/
var Log = function () {
    
    'use strict';

    // задание параметров логирования
    log4js_module.configure(

        {
            "appenders": {

                "console": {
                    type: "console"
                },

                "cheeseLogs": {
                    "type": "file",
                    "filename": config_module.log.file,
                    "maxLogSize": config_module.log.file_size,
                    "backups": config_module.log.file_backup
                }

            },

            categories: {

                "cheese": {
                    "appenders": ["cheeseLogs"],
                    "level": config_module.log.level
                },

                "another": {
                    "appenders": ["console"],
                    "level": config_module.log.level
                },

                "default": {
                    "appenders": ["console", "cheeseLogs"],
                    "level": config_module.log.level
                }

            }

        }
    );

    // создание логера
    var logger = log4js_module.getLogger();

    return logger;
};


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports.Log = Log;