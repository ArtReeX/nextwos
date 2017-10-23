/************************ ОБРАБОТЧИКИ СООБЩЕНИЙ ОТ СЕРВЕРА ************************/
/*globals $, document, window, showPageAuthorization, setTimeout*/

$(document).ready(function () {

    'use strict';

    // - установка обработчика получения результата регистрации
    window.socket.on("result_general_account-register", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "registration") {

            if (result.error) {

                // ОБРАБОТКА ОШИБОК

                if (result.error.type === "database") {

                    // выводим ошибку
                    $("#registration-info-danger").text("- ошибка базы данных").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#registration-info-danger").empty().hide();
                    }, 2000);

                } else if (result.error.type === "user_exist") {

                    // выводим ошибку
                    $("#registration-info-warning").text("- пользователь с таким логином уже существует").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#registration-info-warning").empty().hide();
                    }, 2000);

                } else if (result.error.type === "empty_parameter") {

                    // выводим ошибку
                    $("#registration-info-warning").text("- заполнены не все обязательные поля").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#registration-info-warning").empty().hide();
                    }, 2000);

                }

            } else {

                // ОБРАБОТКА ОТВЕТОВ

                if (Boolean(result.data.result_register) === true) {

                    // если пользователь успешно прошёл регистрицию, делаем редирект
                    $("#registration-info-success").text("- вы успешно зарегистрированы и будете перенаправлены на страницу входа через 2 секунды ").show();

                    // скрываем кнопку повторной регистрации
                    $("#registration-button-reg").hide();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        showPageAuthorization();
                    }, 2000);

                }

            }

        }

    });


});
