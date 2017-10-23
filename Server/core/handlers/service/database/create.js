/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var async_module = require('async');
var log_module = require('../../../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// МЕТОД ВОССТАНОВЛЕНИЯ СТРУКТУРЫ НЕСУЩЕСТВУЮЩИХ ТАБЛИЦ В БД
function create(mysql, callback) {
    
    'use strict';
    
    // обращение к БД
    mysql.getConnection(function (error, conn) {

        if (error) {
            log.fatal("Error MySQL connection: " + error);
        } else {

            async_module.series([

                // * СТАНДАРТНЫЕ

                // - создание таблицы учётных записей
                function (done) {

                    conn.query("CREATE TABLE IF NOT EXISTS general_accounts(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, username VARCHAR(50) NOT NULL, password VARCHAR(255) NOT NULL, password_salt VARCHAR(100) NOT NULL, first_name VARCHAR(100) NOT NULL, second_name VARCHAR(100) NOT NULL, UNIQUE(username))", function (error) {

                        if (error) {
                            log.debug("Error MySQL connection: " + error);

                            done();
                        } else {
                            done();
                        }

                    });

                },

                // + создание таблиц отчётов о проблемах

                // - категории отчётов
                function (done) {

                    conn.query("CREATE TABLE IF NOT EXISTS general_bugs_categories(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, UNIQUE(name))", function (error) {

                        if (error) {
                            log.debug("Error MySQL connection: " + error);

                            done();
                        } else {
                            done();
                        }

                    });

                },

                // - отчёты
                function (done) {

                    conn.query("CREATE TABLE IF NOT EXISTS general_bugs(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, category_id INT NOT NULL, error TEXT NOT NULL, account_id INT NOT NULL, time timestamp DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(account_id) REFERENCES general_accounts(id), FOREIGN KEY(category_id) REFERENCES general_bugs_categories(id))", function (error) {

                        if (error) {
                            log.debug("Error MySQL connection: " + error);

                            done();
                        } else {
                            done();
                        }

                    });

                },

                // * ПРИЛОЖЕНИЯ

                // + создание таблиц для приложения "passKeeper"

                // - категории паролей
                function (done) {

                    conn.query("CREATE TABLE IF NOT EXISTS app_passKeeper_categories(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, UNIQUE (name))", function (error) {

                        if (error) {
                            log.debug("Error MySQL connection: " + error);

                            done();
                        } else {
                            done();
                        }

                    });

                },

                // - пароли
                function (done) {

                    conn.query("CREATE TABLE IF NOT EXISTS app_passKeeper(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, category_id INT NOT NULL, account_id INT NOT NULL, time timestamp DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(category_id) REFERENCES app_passKeeper_categories(id), FOREIGN KEY(account_id) REFERENCES general_accounts(id))", function (error) {

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
module.exports = create;