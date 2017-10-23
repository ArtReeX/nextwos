/************************ ОБРАБОТЧИКИ СООБЩЕНИЙ ОТ СЕРВЕРА ************************/
/*globals $, document, window, setTimeout*/

$(document).ready(function () {

    'use strict';

    // установка обработчика получения результата создания отчёта
    window.socket.on("result_general_bug-createReport", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "bug") {

            if (result.error) {

                // ОБРАБОТКА ОШИБОК

                if (result.error.type === "database") {

                    // выводим ошибку
                    $("#authorization-info-danger").text("Произошла ошибка базы данных. К сожалению создание заявки на данный момент не возможно.").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#authorization-info-danger").empty().hide();
                    }, 2000);

                } else if (result.error.type === "empty_parameter") {

                    // выводим ошибку
                    $("#bug-info-warning").text("Заполнены не все обязательные поля.").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#bug-info-warning").empty().hide();
                    }, 2000);

                }

            } else {

                // ОБРАБОТКА ОТВЕТОВ

                if (Boolean(result.data.result_create) === true) {

                    // если пользователь успешно прошёл регистрицию, делаем редирект
                    $("#bug-info-success").text("Спасибо за обращение. Ваша проблема будет рассмотрена в ближайшее время.").show();

                    // скрытие кнопки повторной отправки
                    $("#bug-button-send").hide();

                }

            }

        }

    });

    // установка обработчика получения категорий отчёта об ошибке
    window.socket.on("result_general_bug-getCategories", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "bug") {

            if (result.error) {

                // ОБРАБОТКА ОШИБОК

                if (result.error.type === "database") {

                    // выводим ошибку
                    $("#authorization-info-danger").text("Произошла ошибка базы данных. К сожалению создание заявки на данный момент не возможно.").show();

                } else if (result.error.type === "no_categories") {

                    // выводим ошибку
                    $("#authorization-info-danger").text("К сожалению создание заявки на данный момент не возможно.").show();

                    // скрытие кнопки повторной отправки
                    $("#bug-button-send").hide();

                }

            } else {

                // ОБРАБОТКА ОТВЕТОВ

                if (result.data.categories.length) {

                    // очистка списка категорий
                    $("#bug-category").empty();

                    // формирование списка категорий
                    var categories_count;

                    for (categories_count = 0; categories_count < result.data.categories.length; categories_count += 1) {

                        $("#bug-category").append($("<option value=\"" + String(result.data.categories[categories_count].id) + "\">" + String(result.data.categories[categories_count].name) + "</option>"));

                    }

                }

            }

        }

    });

});
