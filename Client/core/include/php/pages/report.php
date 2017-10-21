<!-- размытый фон -->
<div class="blur-content">

    <!-- содержимое страницы -->
    <div class="container">

        <!-- панель страницы -->
        <div class="row justify-content-center">

            <!-- кнопка перехода на рабочий стол -->
            <div class="col-1" id="report-panel-button-desktop" title="Перейти на рабочий стол">
                <i class="fa fa-desktop fa-2x" aria-hidden="true"></i>
            </div>

            <!-- часы на панеле страницы -->
            <div class="ml-auto col-2 text-center" data-toggle="tooltip" data-placement="bottom" title="Текущее время">
                <span class="badge badge-dark text-white" id="report-panel-clock"></span>
            </div>

        </div>

        <!-- лого приложения -->
        <div class="row justify-content-center">
            <i class="fa fa-bug fa-5x" aria-hidden="true"></i>
        </div>

        <!-- название приложения -->
        <div class="row justify-content-center text-center">

            <div class="col display-4">
                <p class="text-uppercase">
                    <b> СООБЩИТЬ О ПРОБЛЕМЕ </b>
                </p>
            </div>

        </div>


        <!-- ЛИНИИ С ПОЛЯМИ ВВОДА -->


        <!-- поле выбора категории проблемы -->
        <div class="row justify-content-center text-center">

            <div class="col-10 col-lg-8">

                <div class="form-group">

                    <label for="report-input-topic">
                        <b> Категория проблемы </b>
                    </label>

                    <select class="form-control bg-dark text-white" id="report-input-topic">

                        <option> Функционал сайта </option>
                        <option> Дизайн сайта </option>
                        <option> Ошибки языка </option>

                    </select>

                </div>

            </div>

        </div>

        <!-- поле описания проблемы -->
        <div class="row justify-content-center text-center">

            <div class="col-12 col-lg-10">

                <div class="form-group">

                    <label for="report-input-problem">
                        <b> Описание проблемы </b>
                    </label>

                    <textarea class="form-control bg-dark text-white" id="report-input-problem" rows="5"></textarea>

                </div>

            </div>

        </div>

        <!-- предупреждения -->
        <div class="row justify-content-center">

            <div class="col-12 col-lg-8 alert alert-success" role="alert" id="report-info-success"></div>

        </div>

        <div class="row justify-content-center">

            <div class="col-12 col-lg-8 alert alert-danger" role="alert" id="report-info-danger"></div>

        </div>

        <div class="row justify-content-center">

            <div class="col-12 col-lg-8 alert alert-warning" role="alert" id="report-info-warning"></div>

        </div>

        <!-- кнопка отправки отчёта о проблеме -->
        <div class="row justify-content-center">

            <button class="col-xm-10 col-lg-8 btn btn-dark" id="report-button-send" title="Отправить отчёт о проблеме">
                <p>
                    <b> ОТПРАВИТЬ </b>
                </p>
            </button>

        </div>

    </div>

</div>