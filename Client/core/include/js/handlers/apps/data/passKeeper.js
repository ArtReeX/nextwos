$(document).ready(function () {

    'use strict';


    // ПАНЕЛЬ

    // запуск обновления времени на панеле каждую секунду
    window.setInterval(function () {

        // получение времени
        var date = new Date();

        // обновление времени
        $("#app-passKeeper-panel-clock").html(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());

    }, 1000);

    // обработчик нажатия иконки деавторизации пользователя
    $("#loaded").off("click", "#app-passKeeper-panel-button-desktop").on("click", "#app-passKeeper-panel-button-desktop", function () {

        // переход на рабочий стол
        if (window.identifier === "app-passKeeper") {

            // редирект на страницу рабочего стола
            showPageDesktop();

        }

    });

});