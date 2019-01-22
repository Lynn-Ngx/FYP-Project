var schedule = require('node-schedule');

console.log('cron job starting')
var j = schedule.scheduleJob('*/6 * * * *', function(){
    console.log('Got called');

});