/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var async_module = require('async');
var log_module = require('../../../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// МЕТОД СОЗДАНИЯ НЕСУЩЕСТВУЮЩИХ ТАБЛИЦ В БД
function restore(mysql, callback) {
    'use strict';

    // обращение к БД
    mysql.getConnection(function (error, conn) {

        if (error) {
            log.fatal("Error MySQL connection: " + error);
        } else {
            
            async_module.parallel([

                // создание таблицы пользователей
                function (done) {
                    
                    conn.query("CREATE TABLE IF NOT EXISTS users(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, username TEXT NOT NULL, password VARCHAR(255) NOT NULL, password_salt VARCHAR(100) NOT NULL, first_name VARCHAR(100) NOT NULL, second_name VARCHAR(100) NOT NULL)", function (error, result) { // eslint-disable-line no-unused-vars

                        if (error) {
                            log.debug("Error MySQL connection: " + error);
                            
                            done();
                        } else {
                            done();
                        }

                    });
                    
                },

                // создание таблицы отчётов
                function (done) {
                    
                    conn.query("CREATE TABLE IF NOT EXISTS reports(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, topic VARCHAR(100) NOT NULL, problem TEXT NOT NULL, user_id INT NOT NULL, time timestamp DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id))", function (error, result) { // eslint-disable-line no-unused-vars

                        if (error) {
                            log.debug("Error MySQL connection: " + error);
                            
                            done();
                        } else {
                            done();
                        }

                    });
                    
                }

            ], callback);
                    
        }

    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = restore;