<template>
    <div class="login">
        <div class="login-logo">
            <img src="@/assets/image/logo.png" alt="">
        </div>
        <div class="login-item">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="登录" name="first">

                    <el-form :model="loginForm" :rules="rules1" ref="loginFormRef" label-width="auto" style="max-width: 600px">
                        <el-form-item label="北大邮箱账号" prop="userid">
                            <el-input v-model="loginForm.userid" placeholder="请输入北大邮箱账号" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="loginForm.password" type="password" show-password placeholder="请输入密码" />
                        </el-form-item>
                        <el-form-item label="验证码" prop="checkcode">
                            <div class="checkcode">
                                <el-input v-model="loginForm.checkcode" placeholder="请输入验证码" />
                                <checkcode :identifyCode="identifyCode" @click="refreshCode"></checkcode>
                            </div>
                        </el-form-item>
                        <el-button type="primary" @click="onLogin">登录</el-button>

                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="second">
                    <el-form :model="signupForm" :rules="rules2" ref="signupFormRef" label-width="auto" style="max-width: 600px">
                        <el-form-item label="北京大学邮箱账号" prop="userid">
                            <el-input v-model="signupForm.userid" />
                        </el-form-item>

                        <el-form-item label="验证码" prop="emailcode">
                            <div class="code-btn">
                                <el-input v-model="signupForm.emailcode" maxlength="6" />
                                <el-link type="primary">获得验证码</el-link>
                            </div>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="signupForm.password" type="password" show-password />
                        </el-form-item>
                        <el-form-item label="用户昵称" prop="username">
                            <el-input v-model="signupForm.username" />
                        </el-form-item>

                    </el-form>
                    <el-button type="primary" @click="onSignup">注册</el-button>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';
import Request from '@/utils/Request.js';
import axios from 'axios';
import type { FormInstance } from 'element-plus'
import type {  FormRules } from 'element-plus'
const router = useRouter();
const store = useStore();
interface RuleForm {
    userid: string
    password: string
    checkcode: string
    emailcode:string,
    username: string,
}

//表单处理
const activeName = ref('first');
const loginForm = reactive<RuleForm>({
    userid: '',
    password: '',
    checkcode: '',
    emailcode: '',
    username: '',
});
const loginFormRef = ref<FormInstance>()
const signupFormRef = ref<FormInstance>()

const signupForm = reactive({
    userid: '',
    username: '',
    password: '',
    emailcode: '',
    checkcode: '',
});
const rules1 = reactive<FormRules<RuleForm>>({
    userid: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change'],
        },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    checkcode: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
    ],
});
const rules2 = {
    userid: [
        { required: true, message: '请输入北京大学邮箱账号', trigger: 'blur' },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change'],
        }],
    emailcode: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    username: [
        { required: true, message: '请输入用户昵称', trigger: 'blur' },
    ],

};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

onMounted(() => {
    //console.log(sessionStorage.isLogin);
    resetForm(loginFormRef.value);
    resetForm(signupFormRef.value);
});

async function confirmLogin(id: string, password: string) {
    console.log(id, password);
    try {
        let res = await Request({
            url: '/api/login',
            params: {
                userid: id,
                userpassword: password,
            },
            dataType: "json",
        });
        if (res.login === 1) {
            console.log("登录成功");
            return true;
        } else {
            console.log("登录失败：", res.data);
            return false;
        }
    } catch (error) {
        console.error("请求异常：", error);
        return false;
    }
}

const onLogin = async () => {
    loginFormRef.value.validate(async (valid) => {
        if (valid) {
            const loginSuccess = await confirmLogin(loginForm.userid, loginForm.password);
            if (loginSuccess) {
                store.commit("isLogin", true);
                const id = loginForm.userid;
                store.commit("updateLoginUserInfo", { userId: id });
                sessionStorage.setItem('userId', id);
                refreshCode();
                resetForm(loginFormRef.value);
                resetForm(signupFormRef.value)
                sessionStorage.isLogin = true;
                router.push('/index');
            } else {
                ElMessage({
                    message: '请重新输入',
                    grouping: true,
                    type: 'error',
                });
                refreshCode();
                resetForm(loginFormRef.value);
                resetForm(signupFormRef.value)
            }
        } else {
            ElMessage.error('输入有问题失败');
        }
    });
};

async function confirmSignup(id: string, password: string, username: string) {
    console.log(id, password);
    try {
        let res = await Request({
            url: '/api/signup',
            params: {
                userid: id,
                userpassword: password,
                username: username,
            },
            dataType: "json",
        });
        if (res.signup === 1) {
            console.log("注册成功");
            return true;
        } else {
            console.log("注册失败：", res.data);
            return false;
        }
    } catch (error) {
        console.error("请求异常：", error);
        return false;
    }
}

const onSignup = async () => {
    signupFormRef.value.validate(async (valid) => {
        if (valid) {
            const signupSuccess = await confirmSignup(signupForm.userid, signupForm.password, signupForm.username);
            if (signupSuccess) {
                refreshCode();
                resetForm(loginFormRef.value);
                resetForm(signupFormRef.value)
                ElMessage({
                    message: '注册成功',
                    grouping: true,
                    type: 'success',
                });
            } else {
                ElMessage({
                    message: '账号或密码错误，请重新输入',
                    grouping: true,
                    type: 'error',
                });
                refreshCode();
                resetForm(loginFormRef.value);
                resetForm(signupFormRef.value)

            }
        } else {
            ElMessage.error('表单验证失败');
        }
    });
};

import checkcode from '@/components/Login/checkcode.vue';

const code = (Math.floor(Math.random() * 9000) + 1000).toString();
const identifyCode = ref(code);
const identifyCodes = ref("1234567890abcdefjhijklinopqrsduvwxyz");
const refreshCode = () => {
    identifyCode.value = "";
    makeCode(4);
};

const makeCode = (l: number) => {
    for (let i = 0; i < l; i++) {
        identifyCode.value += identifyCodes.value[randomNum(0, identifyCodes.value.length)];
    }
};

const randomNum = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const sendEmailCode = async () => {
    // 发送邮箱验证码的逻辑
    try {
        const res = await axios.post('/api/sendEmailCode', {
            email: signupForm.userid,
        });
        if (res.data.success) {
            ElMessage({
                message: '验证码已发送',
                grouping: true,
                type: 'success',
            });
        } else {
            ElMessage({
                message: '发送失败，请重试',
                grouping: true,
                type: 'error',
            });
        }
    } catch (error) {
        console.error("请求异常：", error);
        ElMessage.error('发送验证码失败');
    }
};
</script>

<style scoped>
html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: rgba(0, 0, 0, 0.5);
}

.login {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: url('../../assets/image/login_bg.jpg') no-repeat top center fixed;
    background-size: cover;
    background-position: center;
}

.login-logo {
    text-align: center;
}

.login-logo img {
    width: 200px;
    height: auto;
}

.login-item {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 100%;
    max-width: 420px;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.demo-tabs {
    width: 100%;
}

.el-form {
    max-width: 600px;
    margin: 0 auto;
}

.el-form-item {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.el-input__inner {
    border-radius: 5px;
    border: 1px solid #dcdfe6;
}

.el-input__inner:focus {
    border-color: #409eff;
}

.el-button {
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    background-color: #409eff;
    border-color: #409eff;
}

.el-button:hover {
    background-color: #66b1ff;
    border-color: #66b1ff;
}

.el-button:focus {
    background-color: #409eff;
    border-color: #409eff;
}

.code-btn {
    position: relative;
}

.code-btn .el-link {
    position: absolute;
    right: 10px;
    font-size: 16px;
}

.checkcode {
    display: flex;
}

.checkcode .el-input {
    margin-right: 20px;
    flex: 1;
}
</style>
