import axios from 'axios'
import userStore from '../store/userStore'

const base = axios.create({
    headers: {'Authorization': 'Bearer ' + userStore.getters.getUserTokenAccess }
});

// Add a request interceptor
base.interceptors.request.use(function (config) {

    // Do something before request is sent
    var authNull = "Bearer null"
    var loginUrl = "http://localhost:8888/Laravel-WS/public/api/loginPassportGrant"
    //console.log(config)
    //console.log('[Interceptor] token = ' + config.headers["Authorization"])

    var bool = config.url.includes('loginPassport')
    if(bool == false){
      if(config.headers["Authorization"] == authNull){
        if(userStore.getters.getUserTokenAccess != null){
          config.headers["Authorization"]  = 'Bearer ' + userStore.getters.getUserTokenAccess
        }else{
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
