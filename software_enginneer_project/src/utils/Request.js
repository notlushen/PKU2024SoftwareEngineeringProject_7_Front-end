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
        const responseData = response.data;
        if (response.status == 200) {
            return responseData;
        }
        else if (responseData.status == 901) {
            store.commit("isLogin", false);
            store.commit("updateLo  ginUserInfo", null);
            return Promise.reject({ showError: false, msg: "登录超时" });
        }
        else {
            if (errorCallback) {
                errorCallback(responseData);
            }
            return Promise.reject({ showError: showError, msg: responseData.info })
        }

    }, (error) => {
        if (error.config.showLoading && loading) {
            loading.close();
        }
        return Promise.reject({ showError: true, msg: "网络异常" });
    }
);

const request = (config) => {
    let { url, params, dataType, errorCallback,showLoading = true, showError = true } = config;
    dataType = dataType ? dataType : "json";

    let contentType = contentTypeForm;
    let data = params;

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
    let headers = {
        'Content-Type': contentType,
        'X-Requested-With': 'XMLHttpRequest',
    };
    return instance.post(
        url, 
        data, 
        {
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