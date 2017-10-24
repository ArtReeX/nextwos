/*globals module, require*/

/*-------------- ЭКСПОРТ СЕРВИСНЫХ МЕТОДОВ ВОССТАНОВЛЕНИЯ ОСНОВНЫХ ТАБЛИЦ БАЗЫ ДАННЫХ ------------------*/

module.exports.general_accounts = require('./methods/general_accounts/general_accounts');

module.exports.general_bugs_categories = require('./methods/general_bugs/general_bugs_categories');
module.exports.general_bugs = require('./methods/general_bugs/general_bugs');