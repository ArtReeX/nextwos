/************************ ОБРАБОТЧИКИ ИНТЕРФЕЙСА ************************/
/*globals $, document, window, showPageIndex*/

$(document).ready(function () {

    'use strict';
    
    // * ПАНЕЛЬ
    
    // - обработчик нажатия кнопки входа
    $("#loaded").off("click", "#authorization-button-auth").on("click", "#authorization-button-auth", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "authorization") {

            // отправка запроса на авторизацию
            window.socket.emit("general_account-authorize", String($.trim($("#username").val())), String($.trim($("#password").val())));

        }

    });

    // - обработчик нажатия кнопки возврата
    $("#loaded").off("click", "#authorization-panel-button-back").on("click", "#authorization-panel-button-back", function () {

        // редирект на предыдущую страницу
        showPageIndex();

    });

});