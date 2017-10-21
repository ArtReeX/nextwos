/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../../../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/

// МЕТОД СОЗДАНИЯ ОТЧЁТА ОБ ОШИБКЕ
function create(mysql, data, callback) {
    'use strict';
    
    // стандартные проверки
    if (String(data.topic) === "" || String(data.problem) === "" || String(data.identificator) === "") {
        
        // возврат результата
        callback({ "error" : { "type" : "empty_parameter" }, "data" : null });
        
        return;
    }
    
    // обращение к БД
    mysql.getConnection(function (error, conn) {

        if (error) {
            log.fatal("Error MySQL connection: " + error);
        } else {

            // запись данных в БД
            conn.query("INSERT INTO reports (reports.topic, reports.problem, reports.user_id) VALUES ('" + String(data.topic) + "', '" + String(data.problem) + "', '" + Number(data.identificator) + "')", function (error) {

                if (error) {

                    // отладка
                    log.debug("Error MySQL connection: " + error);
                    
                    // возврат результата
                    callback({ "error" : { "type" : "database" }, "data" : null });
                    
                    // закрытие запроса
                    conn.release();

                } else {

                    // возврат результата
                    callback({ "error" : null, "data" : { "result_create" : true } });

                    // закрытие запроса
                    conn.release();
                }

            });

        }

    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = create;