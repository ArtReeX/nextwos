$(document).ready(function () {

    'use strict';

    // подключение к серверу, если его нет

    if (typeof window.socket === "undefined") {
        window.socket = io.connect('ws://localhost:8181', {
            reconnection: true
        });
    }

    // действие при отсутствии соединения с сервером
    window.socket.on('connect_error', function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier !== "error") {

            // выполняем редирект на страницу ошибок
            showPageError("connect_server");

        }

    });


    // обработчик нажатия кнопки входа
    $("#loaded").off("click", "#index-button-login").on("click", "#index-button-login", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "index") {

            // редирект на страницу входа
            showPageAuthorization();

        }

    });

    // обработчик нажатия кнопки регистрации
    $("#loaded").off("click", "#index-button-reg").on("click", "#index-button-reg", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "index") {

            // редирект на страницу входа
            showPageRegistration();

        }

    });

});