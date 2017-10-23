/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var config_module = require('../config');
var log_module = require('./log');
var handlers_module = require('./handlers');
var http_module = require('http');
var express_module = require('express');
var io_module = require('socket.io');
var mysql_module = require('mysql');
var async_module = require('async');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*-------------------------- WS-СЕРВЕР -----------------------------*/
var WS = function (callback) {
    
    'use strict';

    // СОЗДАНИЕ КЛИЕНТА MYSQL
    var mysql_client = mysql_module.createPool(config_module.mysql);

    // проверка подключения MySQL
    mysql_client.getConnection(function (error) {

        if (error) {

            // обработка ошибок
            log.fatal("Error connecting to MySQL database: " + error);
            callback(new Error());
            return;

        } else {

            /***************************** ПРОВЕРКА ЦЕЛОСТНОСТИ БД *****************************/
            async_module.series([

                function (done) {

                    // если БД повреждена, выполняем восстановление структуры БД в случае отсутствия таблиц
                    handlers_module.service.database.create(mysql_client, function () {

                        done();

                    });

                },

                function (done) {

                    // если БД повреждена, выполняем восстановление стандатрных записей БД
                    handlers_module.service.database.fill(mysql_client, function () {

                        done();

                    });

                }

            ],

                function () {

                    // запись в лог
                    log.debug("Database successfully verified.");

                    /***************************** СОЗДАНИЕ СЕРВЕРА *****************************/
                    var express = express_module(),
                        app = http_module.createServer(express),
                        io_serv = io_module.listen(app, config_module.server.options);

                    // открытие доступа извне к директории на сервере
                    express.use(express_module['static'](config_module.dir.files_directory));

                    // начало прослушивание порта
                    app.listen(config_module.server.port, function (error) {

                        if (error) {

                            // обработка ошибок
                            log.fatal("Could not create WS connection: " + error);
                            callback(new Error());
                            return;

                        } else {

                            // основная часть
                            log.debug("The server started on port " + config_module.server.port + ".");
                            callback();

                            // установка обработчиков
                            io_serv.sockets.on('connection', function (socket) {

                                // подключение клиента
                                log.info("User " + socket.id + ", IP: " + socket.request.connection.remoteAddress + " connected.");


                                //************ данные авторизированного пользователя **************//

                                var session = {

                                    account: {

                                        identificator: null

                                    }

                                };


                                //************ разбор сообщений от клиентов **************//


                                // * АККАУНТ ПОЛЬЗОВАТЕЛЯ

                                // - обработчик запроса авторизации пользователя
                                socket.on('general_account-authorize', function (username, password) {

                                    // запись сообщения клиента в отладку
                                    log.info("User " + socket.id + " get method \"account-authorize\" (login: " + String(username) + ", password: " + String(password) + ")");

                                    handlers_module.custom.generals.account.authorize(mysql_client, {
                                        "username": String(username),
                                        "password": String(password)
                                    }, function (result) {

                                        if (result.error) {

                                            // ОБРАБОТКА ОШИБОК

                                            // отправка результата
                                            log.trace("Sending method \"result_general_account-authorize\" results to " + socket.id + ":");
                                            log.trace({
                                                "error": {
                                                    "type": result.error.type
                                                },
                                                "data": null
                                            });

                                            socket.emit('result_general_account-authorize', {
                                                "error": {
                                                    "type": result.error.type
                                                },
                                                "data": null
                                            });

                                        } else {

                                            // ОБРАБОТКА ОТВЕТОВ

                                            // запись идентификатора пользователя для работы в сессии
                                            session.account.identificator = Number(result.data.identificator);

                                            // отключение от комнaты со всеми клиентами для данного пользователя
                                            socket.leave(session.account.identificator);

                                            // подключение к комнате со всеми клиентами для данного пользователя
                                            socket.join(session.account.identificator);

                                            // отправка результата
                                            log.trace("Sending method \"result_general_account-authorize\" results to " + socket.id + ":");
                                            log.trace({
                                                "error": null,
                                                "data": {
                                                    "result_authorize": result.data.result_authorize
                                                }
                                            });

                                            socket.emit('result_general_account-authorize', {
                                                "error": null,
                                                "data": {
                                                    "result_authorize": result.data.result_authorize
                                                }
                                            });

                                        }

                                    });
                                });

                                // - обработчик запроса деавторизации пользователя
                                socket.on('general_account-deauthorize', function () {

                                    // отключение от комнaты со всеми клиентами для данного пользователя
                                    socket.leave(session.account.identificator);

                                    // сброс данных авторизированного пользователя
                                    session.account.identificator = null;

                                    // запись сообщения клиента в отладку
                                    log.info("User " + socket.id + " get method \"general_account-deauthorize\"");

                                });

                                // - обработчик запроса регистрации пользователя
                                socket.on('general_account-register', function (username, password, first_name, second_name) {

                                    // запись сообщения клиента в отладку
                                    log.info("User " + socket.id + " get method \"general_account-register\" (login: " + String(username) + ", password: " + String(password) + ", first_name: " + String(first_name) + ", second_name: " + String(second_name) + ")");

                                    handlers_module.custom.generals.account.register(mysql_client, {
                                        "username": String(username),
                                        "password": String(password),
                                        "first_name": String(first_name),
                                        "second_name": String(second_name)
                                    }, function (result) {

                                        if (result.error) {

                                            // ОБРАБОТКА ОШИБОК

                                            // отправка результата
                                            log.trace("Sending method \"result_general_account-register\" results to " + socket.id + ":");
                                            log.trace({
                                                "error": {
                                                    "type": result.error.type
                                                },
                                                "data": null
                                            });

                                            socket.emit('result_general_account-register', {
                                                "error": {
                                                    "type": result.error.type
                                                },
                                                "data": null
                                            });

                                        } else {

                                            // ОБРАБОТКА ОТВЕТОВ

                                            // отправка результата
                                            log.trace("Sending method \"result_general_account-register\" results to " + socket.id + ":");
                                            log.trace({
                                                "error": null,
                                                "data": {
                                                    "result_register": result.data.result_register
                                                }
                                            });

                                            socket.emit('result_general_account-register', {
                                                "error": null,
                                                "data": {
                                                    "result_register": result.data.result_register
                                                }
                                            });

                                        }

                                    });
                                });


                                // * СООБЩЕНИЯ ОБ ОШИБКАХ

                                // ОБРАБОТЧИК ЗАПРОСА ПРИЁМА СООБЩЕНИЯ ОБ ОШИБКЕ
                                socket.on('general_bug-createReport', function (category_id, error) {

                                    // запись сообщения клиента в отладку
                                    log.info("User " + socket.id + " get method \"general_bug-createReport\" (category_id: " + Number(category_id) + ", error: " + String(error) + ")");

                                    handlers_module.custom.generals.bug.createReport(mysql_client, {
                                        "category_id": Number(category_id),
                                        "error": String(error),
                                        "identificator": Number(session.account.identificator)
                                    }, function (result) {

                                        if (result.error) {

                                            // ОБРАБОТКА ОШИБОК

                                            // отправка результата
                                            log.trace("Sending method \"result_general_bug-createReport\" results to " + socket.id + ":");
                                            log.trace({
                                                "error": {
                                                    "type": result.error.type
                                                },
                                                "data": null
                                            });

                                            socket.emit('result_general_bug-createReport', {
                                                "error": {
                                                    "type": result.error.type
                                                },
                                                "data": null
                                            });

                                        } else {

                                            // ОБРАБОТКА ОТВЕТОВ

                                            // отправка результата
                                            log.trace("Sending method \"result_general_bug-createReport\" results to " + socket.id + ":");
                                            log.trace({
                                                "error": null,
                                                "data": {
                                                    "result_create": result.data.result_create
                                                }
                                            });

                                            socket.emit('result_general_bug-createReport', {
                                                "error": null,
                                                "data": {
                                                    "result_create": result.data.result_create
                                                }
                                            });

                                        }

                                    });
                                });

                                // ОБРАБОТЧИК ЗАПРОСА ПОЛУЧЕНИЯ КАТЕГОРИИ ОТЧЁТОВ ОБ ОШИБКЕ
                                socket.on('general_bug-getCategories', function () {

                                    // запись сообщения клиента в отладку
                                    log.info("User " + socket.id + " get method \"general_bug-getCategories\"");

                                    handlers_module.custom.generals.bug.getCategories(mysql_client,
                                        function (result) {

                                            if (result.error) {

                                                // ОБРАБОТКА ОШИБОК

                                                // отправка результата
                                                log.trace("Sending method \"result_general_bug-getCategories\" results to " + socket.id + ":");
                                                log.trace({
                                                    "error": {
                                                        "type": result.error.type
                                                    },
                                                    "data": null
                                                });

                                                socket.emit('result_general_bug-getCategories', {
                                                    "error": {
                                                        "type": result.error.type
                                                    },
                                                    "data": null
                                                });

                                            } else {

                                                // ОБРАБОТКА ОТВЕТОВ

                                                // отправка результата
                                                log.trace("Sending method \"result_general_bug-getCategories\" results to " + socket.id + ":");
                                                log.trace({
                                                    "error": null,
                                                    "data": {
                                                        "categories": result.data.categories
                                                    }
                                                });

                                                socket.emit('result_general_bug-getCategories', {
                                                    "error": null,
                                                    "data": {
                                                        "categories": result.data.categories
                                                    }
                                                });

                                            }

                                        });
                                });

                                //********************************************************//


                                // отключение клиента
                                socket.on('disconnect', function () {

                                    // отключение от комнaты со всеми клиентами для данного пользователя
                                    socket.leave(session.account.identificator);

                                    // логгирование
                                    log.info("User " + socket.id + " disconnected.");

                                });

                            });

                        }

                    });

                });

        }

    });

};


/*-------------- ЭКСПОРТ ------------------*/
/*global module*/
module.exports.WS = WS;
