/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var bcrypt_module = require('bcrypt');
var log_module = require('../../../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/

// МЕТОД РЕГИСТРАЦИИ ПОЛЬЗОВАТЕЛЯ
function register(mysql, data, callback) {
    'use strict';
    
    // стандартные проверки
    if (String(data.username) === "" || String(data.password) === "" || String(data.first_name) === "" || String(data.second_name) === "") {
        
        // возврат результата
        callback({ "error" : { "type" : "empty_parameter" }, "data" : null });
        
        return;
    }
    
    // обращение к БД
    mysql.getConnection(function (error, conn) {

        if (error) {
            log.fatal("Error MySQL connection: " + error);
        } else {
            
            // проверяем, существует ли пользователь
            conn.query("SELECT users.id FROM users WHERE users.username='" + String(data.username) + "' LIMIT 1", function (error_verification, result_verification) {

                if (error_verification) {
                    
                    // отладка
                    log.debug("Error MySQL connection: " + error_verification);
                    
                    // возврат результата
                    callback({ "error" : { "type" : "database" }, "data" : null });

                    // закрытие запроса
                    conn.release();
                    
                } else {

                    if (!result_verification.length) {
                        
                        // шифрование пароля
                        var password_salt = bcrypt_module.genSaltSync(10),
                            password_md5 = bcrypt_module.hashSync(data.password, password_salt);
                        
                        // запись данных в БД
                        conn.query("INSERT INTO users (users.username, users.password, users.password_salt, users.first_name, users.second_name) VALUES ('" + String(data.username) + "', '" + String(password_md5) + "', '" + String(password_salt) + "', '" + String(data.first_name) + "', '" + String(data.second_name) + "')", function (error_register, result_register) {

                            if (error_register) {
                                
                                // отладка
                                log.debug("Error MySQL connection: " + error_register);

                                // возврат результата
                                callback({ "error" : { "type" : "database" }, "data" : null });

                                // закрытие запроса
                                conn.release();
                                
                            } else {
                                
                                // возврат результата
                                callback({ "error" : null, "data" : { "result_register" : Boolean(result_register.affectedRows) } });

                                // закрытие запроса
                                conn.release();
                            }

                        });

                    } else {
                        
                        // возврат результата
                        callback({ "error" : { "type" : "user_exist" }, "data" : null });

                        // закрытие запроса
                        conn.release();
                    }
                }

            });

        }

    });

}

/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = register;