/*global require, module*/

/*-------------- ПРОВЕРКА СУЩЕСТВОВАНИЯ ОСНОВНОЙ ТАБЛИЦЫ "app_passKeeper" ------------------*/
module.exports.check = function (database, callback) {
    
    'use strict';
    
    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) { callback(error); } else {
            
            connection.query("SELECT * FROM app_passKeeper LIMIT 1", function (error, result) {

                if (error) { callback(null, false); } else { callback(null, true); }

            });
            
        }

    });
    
};

/*-------------- СОЗДАНИЕ ОСНОВНОЙ ТАБЛИЦЫ "app_passKeeper" ------------------*/
module.exports.create = function (database, callback) {
    
    'use strict';
    
    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) { callback(error); } else {
            
            connection.query("CREATE TABLE IF NOT EXISTS app_passKeeper(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, category_id INT NOT NULL, account_id INT NOT NULL, time timestamp DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(category_id) REFERENCES app_passKeeper_categories(id), FOREIGN KEY(account_id) REFERENCES general_accounts(id))", function (error) {

                if (error) { callback(error, null); } else {
                    callback(null, true);
                }

            });
            
        }
        
        // закрытие соединения
        connection.release();

    });
    
};
