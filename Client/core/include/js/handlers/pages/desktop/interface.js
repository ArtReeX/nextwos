/************************ ОБРАБОТЧИКИ ИНТЕРФЕЙСА ************************/
/*globals $, document, window, showPageAuthorization, showPageBug, showPageAppPassKeeper*/

$(document).ready(function () {

    'use strict';
    
    // * ПАНЕЛЬ

    // - запуск обновления времени на панеле каждую секунду
    window.setInterval(function () {

        // получение времени
        var date = new Date();

        // обновление времени
        $("#desktop-panel-clock").html(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());

    }, 1000);

    // - обработчик нажатия иконки деавторизации пользователя
    $("#loaded").off("click", "#desktop-panel-button-unlogin").on("click", "#desktop-panel-button-unlogin", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "desktop") {

            // отправка запроса на деавторизацию
            window.socket.emit("deauthorizeUser");

            // редирект на страницу авторизации
            showPageAuthorization();

        }

    });

    // - обработчик нажатия иконки поддержки пользователя
    $("#loaded").off("click", "#desktop-panel-button-bug").on("click", "#desktop-panel-button-bug", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "desktop") {

            // редирект на страницу поддержки
            showPageBug();

        }

    });


    // * ЭЛЕМЕНТЫ

    // - обработчик нажатия иконки менеджера паролей
    $("#loaded").off("click", "#desktop-line-button-app-passKeeper").on("click", "#desktop-line-button-app-passKeeper", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "desktop") {

            // редирект на страницу приложения
            showPageAppPassKeeper();

        }

    });

});