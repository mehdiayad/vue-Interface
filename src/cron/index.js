var CronJob1 = require('cron').CronJob;
import userStore from '../store/userStore'
import myRouter from '../router/index'


var cronJob = new CronJob1('* * * * * *', function() {
    //console.log('call')
    if(userStore.getters.getUserConnected){
        userStore.commit('addUserSessionTimeCounter',1)
        userStore.commit('addUserSessionTimeRemaining', -1)
        if(userStore.getters.getUserSessionTimeCounter == userStore.getters.getUserSessionTimeLimit){
            if(userStore.getters.getUserConnected){
                console.log('[CRON] logout user each 10 minutes');
                userStore.commit('logout');
                myRouter.push('login');
            }
        }
    }

});

cronJob.start()

export default cronJob;