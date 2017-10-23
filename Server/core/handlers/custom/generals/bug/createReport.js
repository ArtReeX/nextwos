/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../../../../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/

// МЕТОД СОЗДАНИЯ ОТЧЁТА ОБ ОШИБКЕ
function createReport(mysql, data, callback) {

    // стандартные проверки
    if (String(data.category_id) === "" || String(data.error) === "" || String(data.identificator) === "") {

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

            // запись данных в БД
            conn.query("INSERT INTO general_bugs (general_bugs.category_id, general_bugs.error, general_bugs.account_id) VALUES ('" + Number(data.category_id) + "', '" + String(data.error) + "', '" + Number(data.identificator) + "')", function (error) {

                if (error) {

                    // отладка
                    log.debug("Error MySQL connection: " + error);

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

                    // возврат результата
                    callback({
                        "error": null,
                        "data": {
                            "result_create": true
                        }
                    });

                    // закрытие запроса
                    conn.release();
                }

            });

        }

    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = createReport;