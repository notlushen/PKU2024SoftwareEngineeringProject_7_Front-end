import axios from 'axios'
import { ElLoading } from 'element-plus'
import Message from '@/utils/Message';
const contentTypeForm="application/x-www-form-urlencoded;charste=UTF-8";
const contentTpyeJson="application/json";
const contentTypeFile="multipart/form-data";

const instance = axios.create({
    baseURL:"/api",
    timeout:10*1000,

})
const openFullScreen2 = () => {
    const loading = 
    setTimeout(() => {
      loading.close()
    }, 2000)
  }
let loading=null;
instance.interceptors.request.use((config) => {
    if(config.showLoading){
        ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
    }
},(error)=>{
    if(config.showLoading&&loading){
        loading.close();
    }
    Message.error("请求发送失败");
    return Promise.reject("请求发送失败");
});

instance.interceptors.response.use(
    (response)=>{
        const {showLoading,errorCallback,showError}=response.config;
        if(showLoading&&loading){
            loading.close();
        }

    },(error)=>{

    }
);


const request = (config) =>{
    const{url,params,dataType,showLoading=true,errorCallback,showError=true}=config;
    dataType=dataType?"form":dataType;
    showLoading=showLoading?true:showLoading;
    
    let contentType=contentTpyeJson;
    let formData = new FormData();
    for(let key in params ){
        formData.append(key,params[key]==undefined?"":params[key]);

    }
    if(dataType!=null&&dataType=="json"){
        contentType=contentTpyeJson;
    }
    let headers={
        'Content-Type':contentType,
        'X-Requested-With':'XMLHttpRequest',

    }
    return instance.post(url,formData,{
        headers:headers,
        showLoading:showLoading,
        errorCallback:errorCallback,
        showError:showError,
    }).catch(error=>{
        if(error.showError){
            Message.error(error.msg);
        }
        return null;
    })
}

export default request;