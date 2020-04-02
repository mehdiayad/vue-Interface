import axios from '../axios/index'

class AxiosPlus{

    constructor() {
        this.response = null
        this.error = null     
        this.success = null   
    }

    call(myMethod, myUrl, myData){
        axios({
            method: myMethod,
            url: myUrl,
            data: myData
        }).then((response) => {
            this.success = true       
            this.response = response   
        }).catch((error) => {
            this.success = false       
            this.error = error
        });  
    }
    
}
const axiosPlus = new AxiosPlus()

export default axiosPlus;