var schedule = require('node-schedule');

console.log('cron job starting')
var j = schedule.scheduleJob('*/1 * * * *', function(){
    console.log('Cron job called');

});