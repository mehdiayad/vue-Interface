import axios from 'axios'
import userStore from '../store/userStore'

const base = axios.create({
    headers: {'Authorization': 'Bearer ' + userStore.getters.getUserTokenAccess }
});

// Add a request interceptor
base.interceptors.request.use(function (config) {

    // Do something before request is sent
    var authNull = "Bearer null"
    var loginUrl = "http://localhost:8888/Laravel-WS/public/loginPassport"
    //console.log('[Interceptor] url = ' + config.url)
    //console.log('[Interceptor] token = ' + config.headers["Authorization"])

    if(config.url != loginUrl){
      if(config.headers["Authorization"] == authNull){
        config.headers["Authorization"]  = 'Bearer ' + userStore.getters.getUserTokenAccess
        if(config.headers["Authorization"] == authNull){
            throw new axios.Cancel('[Interceptor] Operation canceled by the user')
        }
      }    
    }
   
    return config;

  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


export default base
