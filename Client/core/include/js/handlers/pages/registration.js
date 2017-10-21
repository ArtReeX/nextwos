$(document).ready(function () {

    'use strict';

    // обработчик нажатия кнопки входа
    $("#loaded").off("click", "#registration-button-reg").on("click", "#registration-button-reg", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "registration") {

            // установка обработчика
            window.socket.on("resultRegisterUser", function (result) {

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

            // отправка запроса на регистрацию
            window.socket.emit("registerUser", String($.trim($("#username").val())), String($.trim($("#password").val())), String($.trim($("#first_name").val())), String($.trim($("#second_name").val())));

        }

    });

    // обработчик нажатия кнопки возврата
    $("#loaded").off("click", "#registration-panel-button-back").on("click", "#registration-panel-button-back", function () {

        // редирект на предыдущую страницу
        showPageIndex();

    });

});