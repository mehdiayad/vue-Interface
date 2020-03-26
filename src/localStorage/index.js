import userStore from '../store/userStore'
import router from '../router/index'
import cronJob from '../cron/index'
import sessionStore from '../store/sessionStore';

var listener = window.addEventListener('storage', function(event){

    // Local storage deleted manually
    if(event.key == null){
        console.log('listener clear local storage event')
        if(router.currentRoute.name != 'login'){
            // stop cron job
            cronJob.stop()
            // redirect to login page
            router.push({ name: 'login'})
        }
        // sync vuex with local storage (login form will be empty)
        router.go()
    }

    if(event.key == 'navbar'){
        console.log('listener event navbar')
        //router.go()
    }

    if(event.key == 'user'){
        console.log('listener event user')
        //router.go()
    }

    if(event.key == 'session'){
        //console.log('listener event session')
        //router.go()
    }

    // one window/tab logout so every windows/tabs logout
    if (event.key == 'event-logout') {
        console.log('listener event logout')
        // COMMENT LINE BELOW FOR STABLE VERSION
        // TODO FIX INFINITE VUEX DATA UPDATING 
        sessionStore.commit('logout') 
        userStore.commit('logout') 
    }

    // one window/tab login so every windows/tabs login
    if (event.key == 'event-login') { 
        console.log('listener event login')
        // COMMENT LINE BELOW FOR STABLE VERSION
        // TODO FIX INFINITE VUEX DATA UPDATING
        sessionStore.commit('login') 
        userStore.commit('login') 
    }
});

export default listener