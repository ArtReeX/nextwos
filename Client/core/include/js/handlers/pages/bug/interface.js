/************************ ОБРАБОТЧИКИ ИНТЕРФЕЙСА ************************/
/*globals $, document, window, showPageDesktop*/
$(document).ready(function () {

    'use strict';
    
    // * ПАНЕЛЬ

    // - запуск обновления времени на панеле каждую секунду
    window.setInterval(function () {

        // получение времени
        var date = new Date();

        // обновление времени
        $("#bug-panel-clock").html(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());

    }, 1000);
    
    // - обработчик нажатия иконки перехода в меню приложений
    $("#loaded").off("click", "#bug-panel-button-desktop").on("click", "#bug-panel-button-desktop", function () {

        // переход на рабочий стол
        if (window.identifier === "bug") {

            // редирект на страницу рабочего стола
            showPageDesktop();

        }

    });

    // * ЭЛЕМЕНТЫ
    
    // - обработчик нажатия кнопки отправки проблемы
    $("#loaded").off("click", "#bug-button-send").on("click", "#bug-button-send", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "bug") {

            // отправка отчёта о проблеме
            window.socket.emit("createReportBug", String($.trim($("#bug-category").val())), String($.trim($("#bug-input-error").val())));

        }

    });

});