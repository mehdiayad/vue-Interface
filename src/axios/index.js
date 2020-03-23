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
    var bool1 = config.url.includes('loginPassport')
    var bool2 = config.url.includes('user/1')
    if(bool1){
      // Token not needed for call API login endpoint
    }
    else if(bool2){
      // testing token null first time but need to actualize for next requests
      if(userStore.getters.getUserTokenAccess != null){
        config.headers["Authorization"]  = 'Bearer ' + userStore.getters.getUserTokenAccess
      }
    }
    else{
      // for all others incoming requests
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
