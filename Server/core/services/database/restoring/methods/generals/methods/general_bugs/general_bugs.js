/*global require, module*/

/*-------------- ПРОВЕРКА СУЩЕСТВОВАНИЯ ОСНОВНОЙ ТАБЛИЦЫ "general_bugs" ------------------*/
module.exports.check = function (database, callback) {
    
    'use strict';
    
    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) { callback(error); } else {
            
            connection.query("SELECT * FROM general_bugs LIMIT 1", function (error, result) {

                if (error) { callback(null, false); } else { callback(null, true); }

            });
            
        }

    });
    
};

/*-------------- СОЗДАНИЕ ОСНОВНОЙ ТАБЛИЦЫ "general_bugs" ------------------*/
module.exports.create = function (database, callback) {
    
    'use strict';
    
    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) { callback(error); } else {
            
            connection.query("CREATE TABLE IF NOT EXISTS general_bugs(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, category_id INT NOT NULL, error TEXT NOT NULL, account_id INT NOT NULL, time timestamp DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(account_id) REFERENCES general_accounts(id), FOREIGN KEY(category_id) REFERENCES general_bugs_categories(id))", function (error) {

                if (error) { callback(error, null); } else { callback(null, true); }

            });
            
        }
        
        // закрытие соединения
        connection.release();

    });
    
};
