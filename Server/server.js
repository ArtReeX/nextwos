/*global require*/

/*-------------- ЗАГОЛОВКИ ------------------*/
var async_module = require('async'),
    
    config_module = require('./config'),
    log_module = require('./core/log'),
    database_module = require('./core/database'),
    service_module = require('./core/services');


/*-------------- ПЕРЕМЕННЫЕ ------------------*/
var log, database;



/*-------------- MYSQL ------------------*/
async_module.series([
    
    // ЛОГ
    function (done) {
        
        'use strict';
        
        log_module.create(config_module.log, function (error, logger) {
            
            if (error) { done(error); } else {
                log = logger;
                done();
            }
            
        });
        
    },
    
    // БАЗА ДАННЫХ
    function (done) {
        
        'use strict';
        
        database_module.create(config_module.database, log, function (error, database_client) {
            
            if (error) { done(error); } else {
                database = database_client;
                done();
            }
            
        });
        
    }
    
], function (error) {
    
    'use strict';
    
    if (error) { log.error(error); } else { log.info("Сервер успешно запущен."); }
    
});