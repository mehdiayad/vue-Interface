var CronJob1 = require('cron').CronJob;
import userStore from '../store/userStore'
import sessionStore from '../store/sessionStore'


var cronJob = new CronJob1('* * * * * *', function() {
    console.log('cron call')
    if(userStore.getters.getUserConnected){
        sessionStore.commit('addSessionTimeCounter',1)
        sessionStore.commit('addSessionTimeRemaining', -1)
        if(sessionStore.getters.getSessionTimeCounter == sessionStore.getters.getSessionTimeLimit){
            console.log('[CRON] logout user each 10 minutes');
            userStore.commit('logout');
            sessionStore.commit('logout');
        }
    }
});

cronJob.start()

export default cronJob;