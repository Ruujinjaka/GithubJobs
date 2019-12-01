const  fetchGithub  = require('./tasks/fetchGithub')

var CronJob = require('cron').CronJob;
new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');

