import userStore from '../store/userStore'
import router from '../router/index'
import cronJob from '../cron/index'
import sessionStore from '../store/sessionStore';

var listenerStorage = window.addEventListener('storage', function(event){

    // WARNING //
    // DELETE CACHE DELETE LOCAL STORAGE BUT NOT VUEX DATA
    // CHANGE VUEX DATA AUTOMATICALLY CHANGE LOCAL STORAGE
    // LOCAL STORAGE IS NOT 100 REACTIVE ITS A DATABASE
    //console.log('call storage listener')


    // Local storage deleted manually
    if(event.key == null){
        console.log('listener clear local storage event')
        if(router.currentRoute.name != 'login'){
            // logout
            userStore.commit('setUserEmail',null)
            userStore.commit('setUserPassword',null)
            userStore.commit('logout')
        }else{
            // NO REDIRECTION BUT DELETE ALL DATA (LOCAL + VUEX)
            // JUST IN CASE
            cronJob.stop()
        }
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

export default listenerStorage