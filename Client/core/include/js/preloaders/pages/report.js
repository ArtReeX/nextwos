function showPageReport() {

    $(document).ready(function () {

        // показ прелоадера
        showPagePreloader();

        // установка задержки прелоадера
        setTimeout(function () {

            // отправка запроса на получение содержимого страницы
            $.ajax({

                url: "/core/include/php/pages/report.php",

                dataType: "html",

                async: false,

                success: function (html) {

                    // идентификация страницы
                    window.identifierPrevious = window.identifier;
                    window.identifier = "report";

                    // скрытие страницы
                    $("#loaded").hide();

                    // загрузка HTML-содержимого страницы
                    $("#loaded").html(html);

                    // показ страницы
                    $("#loaded").show();

                    // загрузка JS-содержимого страницы
                    $.getScript("/core/include/js/handlers/pages/report.js");

                },

                error: function () {

                    // показ страницы с ошибкой
                    showPageError("page_exist");

                }

            });

        }, 1000);

    });

}