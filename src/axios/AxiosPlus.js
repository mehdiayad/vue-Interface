import axios from '../axios/index'

const axiosPlus = class AxiosPlus{

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

export default axiosPlus;