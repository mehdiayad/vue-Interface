var cron = require('node-cron');
import userStore from '../store/userStore'
import myRouter from '../router/index'

var myCron = cron.schedule(' */10 * * * *', () => {

    if(userStore.getters.getUserConnected){
        var d = new Date();
        var n = d.toLocaleTimeString();
        console.log('running a task every 10 minutes ['+n+']');
        userStore.commit('logout');
        myRouter.push('login');
    }

});

export default myCron;