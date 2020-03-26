import userStore from '../store/userStore'
import router from '../router/index'
import cronJob from '../cron/index'


var listener = window.addEventListener('storage', function(event){

    //console.log('local storage listener change detected')

    // Local storage deleted manually
    if(event.key == null){
        console.log('clear local storage event')
        if(router.currentRoute.name != 'login'){
            // stop cron job
            cronJob.stop()
            // redirect to login page
            router.push({ name: 'login'})
        }
        // sync vuex with local storage (login form will be empty)
        router.go()
    }

    // one window/tab logout so every windows/tabs logout
    if (event.key == 'event-logout') {
        console.log('logout event')
        // COMMENT LINE BELOW FOR STABLE VERSION
        userStore.commit('logout') //TODO FIX INFINITE VUEX DATA UPDATING 
    }

    // one window/tab login so every windows/tabs login
    if (event.key == 'event-login') { 
        console.log('login event')
        // COMMENT LINE BELOW FOR STABLE VERSION
        userStore.commit('login') //TODO FIX INFINITE VUEX DATA UPDATING
    }
});

export default listener