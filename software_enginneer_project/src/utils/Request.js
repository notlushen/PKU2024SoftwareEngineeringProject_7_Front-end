import axios from 'axios';
import { ElLoading } from 'element-plus';
import Message from '@/utils/Message';
const contentTypeForm = "application/x-www-form-urlencoded;charset=UTF-8";
const contentTypeJson = "application/json";
const contentTypeFile = "multipart/form-data";
const instance = axios.create({
    baseURL: "/api",
    timeout: 10 * 1000,
});

let loading = null;
instance.interceptors.request.use(
    (config) => {
        if (config.showLoading) {
            loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
        }
        return config;
    }, (error) => {
        if (config.showLoading && loading) {
            loading.close();
        }
        Message.error("请求发送失败");
        return Promise.reject("请求发送失败");
    });

instance.interceptors.response.use(
    (response) => {
        const { showLoading, errorCallback, showError = true } = response.config;
        if (showLoading && loading) {
            loading.close();
        }
        console.log(response);
        const responseData = response.data;
        if (response.status == 200) {
            console.log("ok");
            return responseData;
        }
        else if (responseData.status == 901) {
            return Promise.reject({ showError: false, msg: "登录超时" });
        }
        else {
            if (errorCallback) {
                errorCallback(responseData);
            }
            return Promise.reject({ showError: showError, msg: responseData.info })
        }

    }, (error) => {
        console.log("error")
        loading.close();

    }
);


const request = (config) => {
    let { url, params, dataType, showLoading = true, errorCallback, showError = true } = config;
    dataType = dataType ? dataType : "form";

    let contentType = contentTypeForm;
    let data = params;
    console.log(dataType)

    if (dataType == "json") {
        contentType = contentTypeJson;
        data = JSON.stringify(params);
    }
    else if (dataType == "form") {
        contentType = contentTypeForm;
        data = new FormData();
        for (let key in params) {
            data.append(key, params[key] == undefined ? "" : params[key]);
        }
    }
    console.log(contentType)
    let headers = {
        'Content-Type': contentType,
        'X-Requested-With': 'XMLHttpRequest',
    };
    return instance.post(url, data, {
        headers: headers,
        showLoading: showLoading,
        errorCallback: errorCallback,
        showError: showError,
    }).catch(error => {
        if (error.showError) {
            Message.error(error.msg);
        }
        return Promise.reject(error);
    });
}

export default request;