/*global require, module*/

/*-------------- ПРОВЕРКА СУЩЕСТВОВАНИЯ ОСНОВНОЙ ТАБЛИЦЫ "app_passKeeper_categories" ------------------*/
module.exports.check = function (database, callback) {
    
    'use strict';
    
    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) { callback(error); } else {
            
            connection.query("SELECT * FROM app_passKeeper_categories LIMIT 1", function (error, result) {

                if (error) { callback(null, false); } else { callback(null, true); }

            });
            
        }

    });
    
};

/*-------------- СОЗДАНИЕ ОСНОВНОЙ ТАБЛИЦЫ "app_passKeeper_categories" ------------------*/
module.exports.create = function (database, callback) {
    
    'use strict';
    
    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) { callback(error); } else {
            
            connection.query("CREATE TABLE IF NOT EXISTS app_passKeeper_categories(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, UNIQUE (name))", function (error) {

                if (error) { callback(error); } else { callback(null); }

            });
            
        }

    });
    
};

/*-------------- ЗАПОЛНЕНИЕ ОСНОВНОЙ ТАБЛИЦЫ "app_passKeeper_categories" ------------------*/
module.exports.fill = function (database, callback) {
    
    'use strict';
    
    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) { callback(error); } else {
            
            connection.query("INSERT IGNORE INTO app_passKeeper_categories (name) VALUES ('Магазины'), ('Мессенджеры'), ('Игры'), ('Медиа'), ('Безопасность'), ('Системы'), ('Почты'), ('Разное')", function (error) {

                if (error) { callback(error); } else { callback(null); }

            });
            
        }
        
        // закрытие соединения
        connection.release();

    });
    
};
