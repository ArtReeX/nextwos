<!-- размытый фон -->
<div class="blur-content">

    <!-- содержимое страницы -->
    <div class="container">

        <!-- панель страницы -->
        <div class="row justify-content-left">

            <!-- кнопка возврата на предыдущую страницу -->
            <div class="col-1" id="authorization-panel-button-back" data-toggle="tooltip" data-placement="right" title="Предыдущая страница">
                <i class="fa fa-chevron-circle-left fa-2x" aria-hidden="true"></i>
            </div>

        </div>

        <!-- лого страницы -->
        <div class="row justify-content-center">
            <img src="/core/include/style/images/basic/main_logo.png">
        </div>

        <!-- заголовок страницы -->
        <div class="row justify-content-center text-center">

            <div class="col display-4">
                <p class="text-uppercase">
                    <b> ВХОД </b>
                </p>
            </div>

        </div>


        <!-- ЛИНИИ С ПОЛЯМИ ВВОДА -->


        <!-- поле ввода логина -->
        <div class="row justify-content-center text-center">

            <div class="col-12 col-md-6">
                <input type="text" class="form-control text-white bg-dark" placeholder="Имя пользователя" id="username">
            </div>

        </div>

        <!-- поле ввода пароля -->
        <div class="row justify-content-center text-center">

            <div class="col-12 col-md-6">
                <input type="password" class="form-control text-white bg-dark" placeholder="Пароль" id="password">
            </div>

        </div>

        <!-- предупреждения -->
        <div class="row justify-content-center">

            <div class="col-md-8 alert alert-danger" role="alert" id="authorization-info-danger"></div>

        </div>

        <div class="row justify-content-center" id="authorization-info">

            <div class="col-md-8 alert alert-warning" role="alert" id="authorization-info-warning"></div>

        </div>

        <!-- кнопки -->
        <div class="row justify-content-center">

            <button class="col-xm-10 col-lg-8 btn btn-dark" id="authorization-button-auth" title="Войти в учётную запись">
                <p>
                    <b> ВОЙТИ </b>
                </p>
            </button>

        </div>

    </div>

</div>