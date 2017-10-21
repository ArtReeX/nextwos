$(document).ready(function () {

    // ПАНЕЛЬ

    // запуск обновления времени на панеле каждую секунду
    window.setInterval(function () {

        // получение времени
        var date = new Date();

        // обновление времени
        $("#report-panel-clock").html(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());

    }, 1000);

    // обработчик нажатия иконки перехода в меню приложений
    $("#loaded").off("click", "#report-panel-button-desktop").on("click", "#report-panel-button-desktop", function () {

        // переход на рабочий стол
        if (window.identifier === "report") {

            // редирект на страницу рабочего стола
            showPageDesktop();

        }

    });

    // обработчик нажатия кнопки отправки проблемы
    $("#loaded").off("click", "#report-button-send").on("click", "#report-button-send", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "report") {

            // установка обработчика
            window.socket.on("resultСreationReport", function (result) {

                // проверка соответствие обработчика со страницей
                if (window.identifier === "report") {

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
                            $("#report-info-warning").text("Заполнены не все обязательные поля.").show();

                            // задаём таймер скрытия ошибки
                            setTimeout(function () {
                                $("#report-info-warning").empty().hide();
                            }, 2000);

                        }

                    } else {

                        // ОБРАБОТКА ОТВЕТОВ

                        if (Boolean(result.data.result_create) === true) {

                            // если пользователь успешно прошёл регистрицию, делаем редирект
                            $("#report-info-success").text("Спасибо за обращение. Ваша проблема будет рассмотрена в ближайшее время.").show();

                            // скрытие кнопки повторной отправки
                            $("#report-button-send").hide();

                        }

                    }

                }

            });

            // отправка отчёта о проблеме
            window.socket.emit("sendAnIssueReport", String($.trim($("#report-input-topic").val())), String($.trim($("#report-input-problem").val())));

        }

    });

});