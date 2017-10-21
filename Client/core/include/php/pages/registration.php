<!-- размытый фон -->
<div class="blur-content">

    <!-- содержимое страницы -->
    <div class="container">

        <!-- панель страницы -->
        <div class="row justify-content-left">

            <!-- кнопка возврата на предыдущую страницу -->
            <div class="col-1" id="registration-panel-button-back" title="Предыдущая страница">
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
                    <b> РЕГИСТРАЦИЯ </b>
                </p>
            </div>

        </div>


        <!-- ЛИНИИ С ПОЛЯМИ ВВОДА -->


        <!-- поле ввода имени и фамилии -->
        <div class="row">

            <div class="col-12 col-lg-6">
                <input type="text" class="form-control text-white bg-dark" placeholder="Имя" id="first_name">
            </div>

            <div class="col-12 col-lg-6">
                <input type="text" class="form-control text-white bg-dark" placeholder="Фамилия" id="second_name">
            </div>

        </div>

        <!-- поле ввода логина -->
        <div class="row justify-content-center text-center">

            <div class="col-12 col-lg-6">
                <input type="text" class="form-control text-white bg-dark" placeholder="Имя пользователя" id="username">
            </div>

        </div>

        <!-- поле ввода пароля -->
        <div class="row justify-content-center text-center">

            <div class="col-12 col-lg-6">
                <input type="password" class="form-control text-white bg-dark" placeholder="Пароль" id="password">
            </div>

        </div>

        <!-- предупреждения -->
        <div class="row justify-content-center">

            <div class="col-12 col-lg-8 alert alert-success" role="alert" id="registration-info-success"></div>

        </div>

        <div class="row justify-content-center">

            <div class="col-12 col-lg-8 alert alert-danger" role="alert" id="registration-info-danger"></div>

        </div>

        <div class="row justify-content-center">

            <div class="col-12 col-lg-8 alert alert-warning" role="alert" id="registration-info-warning"></div>

        </div>

        <!-- кнопки -->
        <div class="row justify-content-center">

            <button class="col-xm-10 col-lg-8 btn btn-dark" id="registration-button-reg" title="Создать учётную запись">
                <p>
                    <b> СОЗДАТЬ </b>
                </p>
            </button>

        </div>


    </div>

</div>