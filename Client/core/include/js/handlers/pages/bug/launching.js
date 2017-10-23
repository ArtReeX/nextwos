/************************ ОБРАБОТЧИКИ ЗАПУСКА ************************/
/*globals $, document, window*/

$(document).ready(function () {

    'use strict';

    // отправка запроса на получение категорий отчётов об ошибке
    window.socket.emit("getReportBugCategories", null);

});