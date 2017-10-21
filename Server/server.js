/*-------------- ЗАГОЛОВКИ ------------------*/
/*global require*/
var ws_module = require('./core/ws');
var log_module = require('./core/log');


/*-------------- LOG ------------------*/
var log = log_module.Log();


/*-------------- СОЗДАНИЕ WS-СЕРВЕРА ------------------*/
var ws_server = ws_module.WS(function (error) { // eslint-disable-line no-unused-vars
    'use strict';

    if (!error) {
        log.info("The server part was successfully started.");
    } else {
        log.fatal("Unable to start the server part.");
    }
});
