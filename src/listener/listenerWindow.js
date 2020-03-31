import router from '../router/index'
import cronJob from '../cron/index'

var listenerWindow = window.addEventListener('unload', function(event){

    console.log('call unload listener')

    if(router.currentRoute.name != 'login'){
        console.log('start cron job from window listener')
        cronJob.start()
    }
    
    if(router.currentRoute.name == 'login'){
        console.log('stop cron job from window listener')
        cronJob.stop()
    }
    
});

export default listenerWindow