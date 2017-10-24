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
    
    // лог
    function (done) {
        
        'use strict';
        
        log_module.create(config_module.log, function (error, logger) {
            
            if (error) { done(error); } else {
                log = logger;
                done();
            }
            
        });
        
    },
    
    // база данных
    function (done) {
        
        'use strict';
        
        database_module.create(config_module.database, log, function (error, database_client) {
            
            if (error) { done(error); } else {
                database = database_client;
                done();
            }
            
        });
        
    },
    
    // проверка и восстановления базы данных
    function (done) {
        
        'use strict';
        
        service_module.database.restoring(database, async_module, function (error) {
            
            if (error) { done(error); } else { done(); }
            
        });
        
    }
    
], function (error) {
    
    'use strict';
    
    if (error) { log.error(error); } else { log.info("Сервер успешно запущен."); }
    
});