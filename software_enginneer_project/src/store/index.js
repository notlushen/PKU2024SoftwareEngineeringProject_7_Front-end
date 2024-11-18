import { createStore } from "vuex";

export default createStore({
    state:{
        loginUserInfo:null,
        tokens:null,
        isLogin:false,
    },
    getters:{
        getLoginUserInfo:(state)=>{
            if(!state.loginUserInfo){
                return JSON.parse(sessionStorage.loginUserInfo)
            }
            return state.loginUserInfo;
        },
        getTokens:(state)=>{
            return state.tokens;
        },
    },
    mutations:{
        updateLoginUserInfo(state,value) {
            state.loginUserInfo=value;
        },
        updateTokens(state,value) {
            state.tokens=value;
        },
        isLogin(state,value) {
            state.isLogin=value;
        },
    },
    actions:{},
    modules:{},
})