/*global require, module*/

/*-------------- ПРОВЕРКА СУЩЕСТВОВАНИЯ ОСНОВНОЙ ТАБЛИЦЫ "general_accounts" ------------------*/
module.exports.check = function (database, callback) {
    
    'use strict';
    
    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) { callback(error); } else {
            
            connection.query("SELECT * FROM general_accounts LIMIT 1", function (error, result) {

                if (error) { callback(null, false); } else { callback(null, true); }

            });
            
        }

    });
    
};

/*-------------- СОЗДАНИЕ ОСНОВНОЙ ТАБЛИЦЫ "general_accounts" ------------------*/
module.exports.create = function (database, callback) {
    
    'use strict';
    
    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) { callback(error); } else {
            
            connection.query("CREATE TABLE IF NOT EXISTS general_accounts(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, username VARCHAR(50) NOT NULL, password VARCHAR(255) NOT NULL, password_salt VARCHAR(100) NOT NULL, first_name VARCHAR(100) NOT NULL, second_name VARCHAR(100) NOT NULL, UNIQUE(username))", function (error) {

                if (error) { callback(error, null); } else { callback(null, true); }

            });
            
        }
        
        // закрытие соединения
        connection.release();

    });
    
};
