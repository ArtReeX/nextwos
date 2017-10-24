/*global require, module*/

/*-------------- ЗАГОЛОВКИ ------------------*/
var methods_module = require('./generals/methods');

/*-------------- ВОССТАНОВЛЕНИЕ ОСНОВНЫХ ТАБЛИЦ БАЗЫ ДАННЫХ ------------------*/
module.exports = function (database, async, callback) {
    
    'use strict';
    
    async.series([
        
        // general_accounts
        function (done) {
            
            // проверка существования таблицы
            methods_module.general_accounts.check(database, function (error, result_exist) {
                
                if (error) { done(error); } else {
                    
                    if (result_exist) { done(); } else {
                    
                        // создание таблицы
                        methods_module.general_accounts.create(database, function (error) {

                            if (error) { done(error); } else { done(); }

                        });
                    
                    }
                    
                }
                
            });

        },
        
        // general_bugs_categories
        function (done) {
            
            // проверка существования таблицы
            methods_module.general_bugs_categories.check(database, function (error, result_exist) {
                
                if (error) { done(error); } else {
                    
                    if (result_exist) { done(); } else {
                    
                        // создание таблицы
                        methods_module.general_bugs_categories.create(database, function (error) {

                            if (error) { done(error); } else {
                                
                                // восстановление данных таблицы
                                methods_module.general_bugs_categories.fill(database, function (error) {

                                    if (error) { done(error); } else { done(); }

                                });
                                
                            }

                        });
                    
                    }
                    
                }
                
            });

        },
        
        // general_bugs
        function (done) {
            
            // проверка существования таблицы
            methods_module.general_bugs.check(database, function (error, result_exist) {
                
                if (error) { done(error); } else {
                    
                    if (result_exist) { done(); } else {
                    
                        // создание таблицы
                        methods_module.general_bugs.create(database, function (error) {

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