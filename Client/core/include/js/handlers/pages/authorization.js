$(document).ready(function () {

    // обработчик нажатия кнопки входа
    $("#loaded").off("click", "#authorization-button-auth").on("click", "#authorization-button-auth", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "authorization") {

            // установка обработчика
            window.socket.on("resultAuthorizeUser", function (result) {

                // проверка соответствие обработчика со страницей
                if (window.identifier === "authorization") {

                    if (result.error) {

                        // ОБРАБОТКА ОШИБОК

                        if (result.error.type === "database") {

                            // выводим ошибку
                            $("#authorization-info-danger").text("- ошибка базы данных").show();

                            // задаём таймер скрытия ошибки
                            setTimeout(function () {
                                $("#authorization-info-danger").empty().hide();
                            }, 2000);

                        } else if (result.error.type === "user_not_exist") {

                            // выводим ошибку
                            $("#authorization-info-warning").text("- такого пользователя не существует").show();

                            // задаём таймер скрытия ошибки
                            setTimeout(function () {
                                $("#authorization-info-warning").empty().hide();
                            }, 2000);

                        } else if (result.error.type === "incorrect_password") {

                            // выводим ошибку
                            $("#authorization-info-warning").text("- неверный пароль").show();

                            // задаём таймер скрытия ошибки
                            setTimeout(function () {
                                $("#authorization-info-warning").empty().hide();
                            }, 2000);

                        } else if (result.error.type === "empty_parameter") {

                            // выводим ошибку
                            $("#authorization-info-warning").text("- заполнены не все обязательные поля").show();

                            // задаём таймер скрытия ошибки
                            setTimeout(function () {
                                $("#authorization-info-warning").empty().hide();
                            }, 2000);

                        }

                    } else {

                        // ОБРАБОТКА ОТВЕТОВ

                        if (Boolean(result.data.result_authorize) === true) {

                            // если пользователь авторизирован, делаем редирект
                            showPageDesktop();

                        }

                    }

                }

            });

            // отправка запроса на авторизацию
            window.socket.emit("authorizeUser", String($.trim($("#username").val())), String($.trim($("#password").val())));

        }

    });

    // обработчик нажатия кнопки возврата
    $("#loaded").off("click", "#authorization-panel-button-back").on("click", "#authorization-panel-button-back", function () {

        // редирект на предыдущую страницу
        showPageIndex();

    });

});
function newFunction() {
    'use strict';
}
