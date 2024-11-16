<template>
    <div class="login">
        <div class="login-logo">
            <img src="@/assets/image/logo.png" alt="">
        </div>
        <div class="login-item">
            <el-tabs v-model="activeName" class="demo-tabs" >
                <el-tab-pane label="登录" name="first" >
                    <el-form :model="form1" label-width="auto" style="max-width: 600px" >
                        <el-form-item label="账号" prop="account">
                            <el-input v-model="form1.username" placeholder="请输入账号" />
                        </el-form-item>
                        <el-form-item label="密码" prop="passward">
                            <el-input v-model="form1.passward" type="passward" show-password placeholder="请输入密码" />
                        </el-form-item>
                        <el-form-item label="验证码" prop="checkcode">
                            <div class="checkcode"> <el-input v-model="form1.checkcode" placeholder="请输入验证码"
                                    clearable />
                                <checkcode :identifyCode="identifyCode" @click="refreshCode"></checkcode>

                            </div>

                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onLogin">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="second">
                    <el-form :model="form2" label-width="auto" style="max-width: 600px">
                        <el-form-item label="北京大学邮箱账号">
                            <el-input v-model="form2.username" />
                        </el-form-item>
                        <el-form-item label="验证码">
                            <div class="code-btn">
                                <el-input v-model="form2.verification_Code" maxlength="6" />
                                <el-link type="primary">获得验证码</el-link>
                            </div>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model.number="form2.passward" type="password" show-password />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="onSignup">注册</el-button>
                        </el-form-item>
                    </el-form>

                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
import type { TabsPaneContext } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
const activeName = ref('first')

const form1 = reactive({
    username: '',
    passward: '',
    checkcode: '',

})
const form2 = reactive({
    username: '',
    passward: '',
    verification_Code: '',
    checkcode: '',

})



//登录按钮
const onLogin = () => {
    console.log('login!')
    if (form1.checkcode == identifyCode.value) {
        router.push('/index');
    }
    else {
        ElMessage({
            message: '验证码错误！',
            grouping: true,
            type: 'error',
        })
        refreshCode();
    }

}
const onSignup = () => {
    console.log('sign up!')
}


//验证码相关
import checkcode from '@/components/Login/checkcode.vue'
const code=(Math.floor(Math.random() * 9000) + 1000).toString();
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
    /* 半透明背景，以便背景图片可见 */
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
    /* 调整logo大小 */
    height: auto;
}

.login-item {
    background-color: rgba(255, 255, 255, 0.9);
    /* 半透明背景 */
    border-radius: 10px;
    /* 圆角边框 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* 添加阴影 */
    padding: 30px;
    /* 内边距 */
    width: 100%;
    max-width: 420px;
    /* 最大宽度 */
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
    /* 居中表单 */
}

.el-form-item {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.el-input__inner {
    border-radius: 5px;
    /* 输入框圆角 */
    border: 1px solid #dcdfe6;
    /* 输入框边框颜色 */
}

.el-input__inner:focus {
    border-color: #409eff;
    /* 输入框聚焦时的边框颜色 */
}

.el-button {
    width: 100%;
    display: block;
    /* 使按钮表现为块级元素 */
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    /* 按钮圆角 */
    background-color: #409eff;
    /* 按钮背景颜色 */
    border-color: #409eff;
    /* 按钮边框颜色 */
}

.el-button:hover {
    background-color: #66b1ff;
    /* 按钮悬浮时的背景颜色 */
    border-color: #66b1ff;
    /* 按钮悬浮时的边框颜色 */
}

.el-button:focus {
    background-color: #409eff;
    /* 按钮聚焦时的背景颜色 */
    border-color: #409eff;
    /* 按钮聚焦时的边框颜色 */
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