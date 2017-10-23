/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../../../../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/

// МЕТОД ОТПРАВКИ КАТЕГОРИЙ ОТЧЁТА ОБ ОШИБКЕ
function getCategories(mysql, callback) {

    // обращение к БД
    mysql.getConnection(function (error, conn) {

        if (error) {
            log.fatal("Error MySQL connection: " + error);
        } else {

            // получение данных из БД
            conn.query("SELECT general_bugs_categories.id, general_bugs_categories.name FROM general_bugs_categories", function (error, result) {

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

                    if (Boolean(result.length)) {

                        // возврат результата
                        callback({
                            "error": null,
                            "data": {
                                "categories": result
                            }
                        });

                    } else {

                        // возврат результата
                        callback({
                            "error": {
                                "type": "no_categories"
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
module.exports = getCategories;