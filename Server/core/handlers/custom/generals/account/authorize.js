/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var bcrypt_module = require('bcrypt');
var log_module = require('../../../../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/

// МЕТОД ПРОВЕРКИ АВТОРИЗАЦИИ ПОЛЬЗОВАТЕЛЯ
function authorize(mysql, data, callback) {

    'use strict';
    
    // стандартные проверки
    if (String(data.username) === "" || String(data.password) === "") {

        // возврат результата
        callback({
            "error": {
                "type": "empty_parameter"
            },
            "data": null
        });

        return;
    }

    // обращение к БД
    mysql.getConnection(function (error, conn) {

        if (error) {
            log.fatal("Error MySQL connection: " + error);
        } else {

            // получаем учётную запись пользователя
            conn.query("SELECT general_accounts.id, general_accounts.password, general_accounts.password_salt FROM general_accounts WHERE general_accounts.username='" + String(data.username) + "' LIMIT 1", function (error_authorize, result_authorize) {

                if (error_authorize) {

                    // отладка
                    log.debug("Error MySQL connection: " + error_authorize);

                    // возврат результата
                    callback({
                        "error": {
                            "type": "database"
                        },
                        "data": null
                    });

                    // закрытие запроса
                    conn.release();

                } else {

                    if (result_authorize.length) {

                        // проверка правильности пароля
                        if (bcrypt_module.hashSync(String(data.password), String(result_authorize[0].password_salt)) === String(result_authorize[0].password)) {

                            // возврат результата
                            callback({
                                "error": null,
                                "data": {
                                    "result_authorize": true,
                                    "identificator": Number(result_authorize[0].id)
                                }
                            });

                        } else {

                            // возврат результата
                            callback({
                                "error": {
                                    "type": "incorrect_password"
                                },
                                "data": null
                            });

                        }

                    } else {

                        // возврат результата
                        callback({
                            "error": {
                                "type": "user_not_exist"
                            },
                            "data": null
                        });

                    }

                    // закрытие запроса
                    conn.release();
                }

            });

        }

    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = authorize;