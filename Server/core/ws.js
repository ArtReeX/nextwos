/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var config_module = require('../config');
var log_module = require('./log');
var handlers_module = require('./handlers');
var http_module = require('http');
var express_module = require('express');
var io_module = require('socket.io');
var mysql_module = require('mysql');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*-------------------------- WS-СЕРВЕР -----------------------------*/
var WS = function (callback) {
    'use strict';

    // СОЗДАНИЕ КЛИЕНТА MYSQL
    var mysql_client = mysql_module.createPool(config_module.mysql);

    // проверка подключения MySQL
    mysql_client.getConnection(function (error, conn) { // eslint-disable-line no-unused-vars

        if (error) {

            // обработка ошибок
            log.fatal("Error connecting to MySQL database: " + error);
            callback(new Error());
            return;

        } else {
            
            /***************************** ПРОВЕРКА ЦЕЛОСТНОСТИ БД *****************************/
            // если БД повреждена, выполняем восстановление БД в случае отсутствия таблиц
            handlers_module.service.database.restore(mysql_client, function () {

                // запись в лог
                log.debug("Database successfully verified.");

            });
            
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
                        
                        var session = { // eslint-disable-line no-unused-vars
                            
                            user : {
                                
                                identificator: null
                                
                            }
                            
                        };
                        

                        //************ разбор сообщений от клиентов **************//


                        // ОБРАБОТЧИК ЗАПРОСА АВТОРИЗАЦИИ ПОЛЬЗОВАТЕЛЯ
                        socket.on('authorizeUser', function (username, password) {

                            // запись сообщения клиента в отладку
                            log.info("User " + socket.id + " get method \"authorizeUser\" (login: " + String(username) + ", password: " + String(password) + ")");

                            handlers_module.custom.account.authorize(mysql_client, { "username" : String(username), "password" : String(password) }, function (result) {

                                if (result.error) {
                                    
                                    // ОБРАБОТКА ОШИБОК
                                    
                                    // отправка результата
                                    log.trace("Sending method \"resultAuthorizeUser\" results to " + socket.id + ":");
                                    log.trace({ "error" : { "type": result.error.type}, "data" : null });

                                    socket.emit('resultAuthorizeUser', { "error" : { "type": result.error.type}, "data" : null });
                                    
                                } else {
                                    
                                    // ОБРАБОТКА ОТВЕТОВ
                                    
                                    // запись идентификатора пользователя для работы в сессии
                                    session.user.identificator = Number(result.data.identificator);

                                    // отключение от комнaты со всеми клиентами для данного пользователя
                                    socket.leave(session.user.identificator);

                                    // подключение к комнате со всеми клиентами для данного пользователя
                                    socket.join(session.user.identificator);

                                    // отправка результата
                                    log.trace("Sending method \"resultAuthorizeUser\" results to " + socket.id + ":");
                                    log.trace({ "error" : null, "data" : { "result_authorize" : result.data.result_authorize } });

                                    socket.emit('resultAuthorizeUser', { "error" : null, "data" : { "result_authorize" : result.data.result_authorize } });
                                    
                                }

                            });
                        });
                        
                        // ОБРАБОТЧИК ЗАПРОСА ДЕАВТОРИЗАЦИИ ПОЛЬЗОВАТЕЛЯ
                        socket.on('deauthorizeUser', function () { // eslint-disable-line no-unused-vars
                            
                            // отключение от комнaты со всеми клиентами для данного пользователя
                            socket.leave(session.user.identificator);
                            
                            // сброс данных авторизированного пользователя
                            session.user.identificator = null;
                            
                            // запись сообщения клиента в отладку
                            log.info("User " + socket.id + " get method \"deauthorizeUser\"");

                        });
                        
                        // ОБРАБОТЧИК ЗАПРОСА РЕГИСТРАЦИИ ПОЛЬЗОВАТЕЛЯ
                        socket.on('registerUser', function (username, password, first_name, second_name) {

                            // запись сообщения клиента в отладку
                            log.info("User " + socket.id + " get method \"registerUser\" (login: " + String(username) + ", password: " + String(password) + ", first_name: " + String(first_name) + ", second_name: " + String(second_name) + ")");

                            handlers_module.custom.account.register(mysql_client, { "username" : String(username), "password" : String(password), "first_name" : String(first_name), "second_name" : String(second_name) }, function (result) {
                                
                                if (result.error) {
                                    
                                    // ОБРАБОТКА ОШИБОК
                                    
                                    // отправка результата
                                    log.trace("Sending method \"resultRegisterUser\" results to " + socket.id + ":");
                                    log.trace({ "error" : { "type": result.error.type}, "data" : null });

                                    socket.emit('resultRegisterUser', { "error" : { "type": result.error.type}, "data" : null });
                                    
                                } else {
                                    
                                    // ОБРАБОТКА ОТВЕТОВ
                                    
                                    // отправка результата
                                    log.trace("Sending method \"resultRegisterUser\" results to " + socket.id + ":");
                                    log.trace({ "error" : null, "data" : { "result_register" : result.data.result_register } });

                                    socket.emit('resultRegisterUser', { "error" : null, "data" : { "result_register" : result.data.result_register } });
                                    
                                }

                            });
                        });
                        
                        // ОБРАБОТЧИК ЗАПРОСА ПРИЁМА СООБЩЕНИЯ ОБ ОШИБКЕ
                        socket.on('sendAnIssueReport', function (topic, problem) {

                            // запись сообщения клиента в отладку
                            log.info("User " + socket.id + " get method \"sendAnIssueReport\" (topic: " + String(topic) + ", problem: " + String(problem) + ")");

                            handlers_module.custom.report.create(mysql_client, { "topic" : String(topic), "problem" : String(problem), "identificator" : Number(session.user.identificator) }, function (result) {
                                
                                if (result.error) {
                                    
                                    // ОБРАБОТКА ОШИБОК
                                    
                                    // отправка результата
                                    log.trace("Sending method \"resultСreationReport\" results to " + socket.id + ":");
                                    log.trace({ "error" : { "type": result.error.type}, "data" : null });

                                    socket.emit('resultСreationReport', { "error" : { "type": result.error.type}, "data" : null });
                                    
                                } else {
                                    
                                    // ОБРАБОТКА ОТВЕТОВ
                                    
                                    // отправка результата
                                    log.trace("Sending method \"resultСreationReport\" results to " + socket.id + ":");
                                    log.trace({ "error" : null, "data" : { "result_register" : result.data.result_create } });

                                    socket.emit('resultСreationReport', { "error" : null, "data" : { "result_create" : result.data.result_create } });
                                    
                                }

                            });
                        });

                        //********************************************************//


                        // отключение клиента
                        socket.on('disconnect', function () {
                            
                            // отключение от комнaты со всеми клиентами для данного пользователя
                            socket.leave(session.user.identificator);
                            
                            // логгирование
                            log.info("User " + socket.id + " disconnected.");
                            
                        });

                    });

                }

            });

        }

    });

};


/*-------------- ЭКСПОРТ ------------------*/
/*global module*/
module.exports.WS = WS;
