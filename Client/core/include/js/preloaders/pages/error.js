function showPageError(errorType) {

    $(document).ready(function () {

        // показ прелоадера
        showPagePreloader();

        // установка задержки прелоадера
        setTimeout(function () {

            // отправка запроса на получение содержимого страницы
            $.ajax({

                url: "/core/include/php/pages/error.php",

                dataType: "html",

                async: false,

                success: function (html) {

                    // идентификация страницы
                    window.identifierPrevious = window.identifier;
                    window.identifier = "error";

                    // установка типа ошибки
                    window.errorType = errorType;

                    // скрытие страницы
                    $("#loaded").hide();

                    // загрузка HTML-содержимого страницы
                    $("#loaded").html(html);

                    // показ страницы
                    $("#loaded").show();

                    // загрузка JS-содержимого страницы
                    $.getScript("/core/include/js/handlers/pages/error.js");

                },

                error: function () {

                    // показ страницы с ошибкой
                    showPageError("page_exist");

                }

            });

        }, 500);

    });

}