<template>
    <div class="header">
      <div class="avatar">
        <img class="image" src="@/assets/image/avatar.jpg">
      </div>
      <div class="detail">
        <div class= "de-block">
        </div>
        <div class="name">
          <p class="na-name">{{username}}</p>
          <el-button @click="editname">编辑个人资料</el-button>
          <!-- 这里需要实现改昵称，加一个输入框 -->

        </div>
  
        <Dialog :show="showDialog" :buttons="buttons" @close="showDialog=false" title="编辑个人资料">
            <div  >
              <el-form :model="nameForm" :rules="rules1" ref="loginFormRef" label-width="auto" style="max-width: 600px">
                        <el-form-item label="昵称" prop="username">
                            <el-input v-model="nameForm.username" placeholder="请输入新昵称" />
                        </el-form-item>
                    </el-form>
            </div>
          </Dialog>
      </div>
    </div>  
  
  
    <div  class="questionlist">
      <el-tabs type="border-card">
        <el-tab-pane label="提问">
          <PostItem v-for="post in posts" :key="post.id" :post="post" />

        </el-tab-pane>
        <el-tab-pane label="回答">回答</el-tab-pane>
        <el-tab-pane label="收藏">收藏</el-tab-pane>
      </el-tabs>
    </div>
    
  </template>
  
  
  <script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import type { FormInstance,FormRules } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'
const username=ref("");
import Request from '@/utils/Request.js';

const posts = ref([
    { id: 22, title: '软件工程应该怎么学', content: '软件工程是一门好课。' },
    { id: 2, title: '敏捷开发流程中最需要注意什么', content: '敏捷开发流程中最需要注意什么？' },
    { id: 3, title: 'Node.js 实战', content: 'Node.js 是一个基于Chrome V8引擎的JavaScript运行环境...' },
  ]);

onMounted(async() => {
  console.log(1)
  try {
        let res = await Request({
            url: '/api/getusername',
            params: {
                userid:sessionStorage.getItem("email"),
                userpassword:sessionStorage.getItem("userPassword"),
            },
            dataType: "json",
        });
        if (res.code === 200) {
            username.value=res.username
            return true;
        } else {

            return false;
        }
    } catch (error) {
        console.error("请求异常：", error);
        return false;
    }

  })

onMounted(async() => {
  console.log(12)

  try {
        let res = await Request({
            url: '/api/getuserquestion',
            params: {
              email:sessionStorage.getItem("email")
            },
            dataType: "json",
        });
        if (res.code === 200) {
          posts.value=res.questions;
            return true;
        } else {

            return false;
        }
    } catch (error) {
        console.error("请求异常：", error);
        return false;
    }}
  )

//修改个人资料
const nameForm = reactive({
    username: '',
});
const loginFormRef = ref<FormInstance>()

const rules1 = reactive({
  username: [
        { required: true, message: '请输入新用户名', trigger: 'blur' },
    ],
});
const showDialog = ref(false);
const editname=()=>{
  showDialog.value=true
}

const submit=async ()=>{
    try {
        let res = await Request({
            url: '/api/changeusername',
            params: {
                username:nameForm.username,
                userid:sessionStorage.getItem("email"),
                userpassword:sessionStorage.getItem("userPassword"),
            },
            dataType: "json",
        });
        if (res.code === 200) {
            console.log("修改成功");
            username.value=res.username
            return true;
        } else {
            console.log("修改失败：", res.data);
            return false;
        }
    } catch (error) {
        console.error("请求异常：", error);
        return false;
    }
}
const buttons = [{
  type: "primary",
  text: "确定",
  click:submit
}]
  </script>
  
  <style scoped>
  
  .header {
    height: 300px;
    width: 1360px;
    margin: auto;
    display: flex; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  }
  .avatar{
    width: 300px; /* 设置宽度 */
    display: flex; /* 使用flex布局 */
    justify-content: center; /* 水平居中 */
    align-items: flex-end; /* 垂直向下对齐 */
    height: 100%; /* 或者可以设置为具体的高度值 */
    
  }
  .image{
    margin-left: 10px; /* 设置左外边距 */
    margin-right: 10px; /* 设置右外边距 */
    margin-bottom: 20px;
    border: 3px solid #5158e1; 
    border-radius: 8px;
  }
  .de-block{
    height: 160px
  }
  .name{
    width: 1060px;
  
  }
  .na-name{
    font-weight: bold; /* 加粗 */
    font-family: 'Heiti SC', 'Heiti', 'SimHei', sans-serif; /* 黑体字体 */
    font-size: 25px; /* 字体大小 */
  }
  .questionlist{
    width: 1360px;
    margin: auto;
  }
  
  </style>
      