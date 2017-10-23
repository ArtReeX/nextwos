/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var async_module = require('async');
var log_module = require('../../../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// МЕТОД ЗАПОЛНЕНИЯ СТАНДАРТНЫМИ ДАННЫМИ СОЗДАНЫХ ТАБЛИЦ В БД
function fill(mysql, callback) {

    // обращение к БД
    mysql.getConnection(function (error, conn) {

        if (error) {
            log.fatal("Error MySQL connection: " + error);
        } else {

            async_module.series([

                // * СТАНДАРТНЫЕ

                // + заполение таблиц отчётов о проблемах

                // - категории отчётов
                function (done) {

                    conn.query("INSERT IGNORE INTO general_bugs_categories (name) VALUES ('Функционал сайта'), ('Дизайн сайта'), ('Ошибки языка')", function (error, result) {

                        if (error) {
                            log.debug("Error MySQL connection: " + error);

                            done();
                        } else {
                            done();
                        }

                    });

                },

                // * ПРИЛОЖЕНИЯ

                // + заполнение таблиц для приложения "passKeeper"

                // - категории паролей
                function (done) {

                    conn.query("INSERT IGNORE INTO app_passKeeper_categories (name) VALUES ('Магазины'), ('Мессенджеры'), ('Игры'), ('Медиа'), ('Безопасность'), ('Системы'), ('Почты'), ('Разное')", function (error, result) {

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
module.exports = fill;