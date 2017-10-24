/*global require, module*/

/*-------------- ЗАГОЛОВКИ ------------------*/
var methods_module = require('./apps/methods');

/*-------------- ВОССТАНОВЛЕНИЕ ТАБЛИЦ ПРИЛОЖЕНИЙ БАЗЫ ДАННЫХ ------------------*/
module.exports = function (database, async, callback) {
    
    'use strict';
    
    async.series([
        
        // app_passKeeper_categories
        function (done) {
            
            // проверка существования таблицы
            methods_module.app_passKeeper_categories.check(database, function (error, result_exist) {
                
                if (error) { done(error); } else {
                    
                    if (result_exist) { done(); } else {
                    
                        // создание таблицы
                        methods_module.app_passKeeper_categories.create(database, function (error) {

                            if (error) { done(error); } else {
                                
                                // восстановление данных таблицы
                                methods_module.app_passKeeper_categories.fill(database, function (error) {

                                    if (error) { done(error); } else { done(); }

                                });
                                
                            }

                        });
                    
                    }
                    
                }
                
            });

        },
        
        // app_passKeeper
        function (done) {
            
            // проверка существования таблицы
            methods_module.app_passKeeper.check(database, function (error, result_exist) {
                
                if (error) { done(error); } else {
                    
                    if (result_exist) { done(); } else {
                    
                        // создание таблицы
                        methods_module.app_passKeeper.create(database, function (error) {

                            if (error) { done(error); } else { done(); }

                        });
                    
                    }
                    
                }
                
            });

        }

    ], function (error) {
        
        if (error) { callback(error); } else { callback(null); }
        
    });
    
};