$(document).ready(function () {

    // * ПАНЕЛЬ


    // запуск обновления времени на панеле каждую секунду
    window.setInterval(function () {

        // получение времени
        var date = new Date();

        // обновление времени
        $("#bug-panel-clock").html(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());

    }, 1000);

    // обработчик нажатия иконки перехода в меню приложений
    $("#loaded").off("click", "#bug-panel-button-desktop").on("click", "#bug-panel-button-desktop", function () {

        // переход на рабочий стол
        if (window.identifier === "bug") {

            // редирект на страницу рабочего стола
            showPageDesktop();

        }

    });


    // * ИНТЕРФЕЙС


    // обработчик нажатия кнопки отправки проблемы
    $("#loaded").off("click", "#bug-button-send").on("click", "#bug-button-send", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "bug") {

            // отправка отчёта о проблеме
            window.socket.emit("createReportBug", String($.trim($("#bug-category").val())), String($.trim($("#bug-input-error").val())));

        }

    });


    // * СЕРВЕР


    // установка обработчика получения результата создания отчёта
    window.socket.on("resultCreationReportBug", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "bug") {

            if (result.error) {

                // ОБРАБОТКА ОШИБОК

                if (result.error.type === "database") {

                    // выводим ошибку
                    $("#authorization-info-danger").text("Произошла ошибка базы данных. К сожалению создание заявки на данный момент не возможно.").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#authorization-info-danger").empty().hide();
                    }, 2000);

                } else if (result.error.type === "empty_parameter") {

                    // выводим ошибку
                    $("#bug-info-warning").text("Заполнены не все обязательные поля.").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#bug-info-warning").empty().hide();
                    }, 2000);

                }

            } else {

                // ОБРАБОТКА ОТВЕТОВ

                if (Boolean(result.data.result_create) === true) {

                    // если пользователь успешно прошёл регистрицию, делаем редирект
                    $("#bug-info-success").text("Спасибо за обращение. Ваша проблема будет рассмотрена в ближайшее время.").show();

                    // скрытие кнопки повторной отправки
                    $("#bug-button-send").hide();

                }

            }

        }

    });

    // установка обработчика получения категорий отчёта об ошибке
    window.socket.on("resultGetReportBugCategories", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "bug") {

            if (result.error) {

                // ОБРАБОТКА ОШИБОК

                if (result.error.type === "database") {

                    // выводим ошибку
                    $("#authorization-info-danger").text("Произошла ошибка базы данных. К сожалению создание заявки на данный момент не возможно.").show();

                } else if (result.error.type === "no_categories") {

                    // выводим ошибку
                    $("#authorization-info-danger").text("К сожалению создание заявки на данный момент не возможно.").show();

                    // скрытие кнопки повторной отправки
                    $("#bug-button-send").hide();

                }

            } else {

                // ОБРАБОТКА ОТВЕТОВ

                if (Boolean(result.data.categories.length)) {

                    // очистка списка категорий
                    $("#bug-category").empty();

                    // формирование списка категорий
                    var categories_count;

                    for (categories_count = 0; categories_count <= result.data.categories.length; categories_count += 1) {
  
                        $("#bug-category").append( $("<option value=" + result.data.categories[categories_count].id + ">" + result.data.categories[categories_count].name + "</option>") );

                    }

                }

            }

        }

    });


    // отправка запроса на получение категорий отчётов об ошибке
    window.socket.emit("getReportBugCategories", null);

});