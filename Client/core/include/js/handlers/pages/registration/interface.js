/************************ ОБРАБОТЧИКИ ИНТЕРФЕЙСА ************************/
/*globals $, document, window, showPageIndex*/

$(document).ready(function () {

    'use strict';
    
    // обработчик нажатия кнопки входа
    $("#loaded").off("click", "#registration-button-reg").on("click", "#registration-button-reg", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "registration") {

            // отправка запроса на регистрацию
            window.socket.emit("general_account-register", String($.trim($("#username").val())), String($.trim($("#password").val())), String($.trim($("#first_name").val())), String($.trim($("#second_name").val())));

        }

    });

    // обработчик нажатия кнопки возврата
    $("#loaded").off("click", "#registration-panel-button-back").on("click", "#registration-panel-button-back", function () {

        // редирект на предыдущую страницу
        showPageIndex();

    });

});