/*globals require*/

/*----------- ЗАГОЛОВКИ -----------*/
var mysql_module = require('mysql');


/*---------------------------- MYSQL -------------------------------*/
var create = function (config, log, callback) {
    
    'use strict';

    // создание подключения с параметрами
    var database_client = mysql_module.createPool(config);

    // проверка подключения
    database_client.getConnection(function (error) {

        if (error) {
            
            // вызов callback-функции
            callback(error, null);
        
        } else {
            
            // вызов callback-функции
            callback(null, database_client);
            
        }
        
    });
    
};


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports.create = create;