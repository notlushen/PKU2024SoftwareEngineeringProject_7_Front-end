<template>
  <div class="header">
    <div class="webheader">
      <!--Logo-->
      <router-link to="/" class="logo">智学</router-link>
      <!--菜单-->
      <MyMenu></MyMenu>
      <!--搜索框-->
      <div class="header-search">
      <el-select v-model="formInline.searchType" placeholder="" class="search-select" >
        <el-option label="content" value="content" />
        <el-option label="id" value="id" />
        <el-option label="tags" value="tags" />
      </el-select>
        <el-input v-model="formInline.content" type="search" placeholder="搜索问题..." class="search-input" />
        <el-button type="primary" round @click="handleSearch">
          搜索
        </el-button>
        <el-button type="primary" round @click="createQuestion">
          提问
        </el-button>
        <el-button type="primary" round @click="createTeam">
          组队
        </el-button>
      </div>
      <!--用户信息-->
      <div  class="user" v-if="username!==''">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ username }}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="enterInform">个人中心</el-dropdown-item>
              <el-dropdown-item divided @click="quit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </div>
      <div class="user" v-else>
        <!-- <Dialog :show="showDialog" :buttons="buttons" @close="showDialog=false">
          <div :style="{height:'1500px'}" >neirong</div>
        </Dialog> -->
        <el-button type="primary" plain @click="login">登录/注册</el-button>


      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ElMenu, ElMenuItem, ElInput, ElButton } from 'element-plus';
import { onMounted, reactive, ref, watch } from 'vue';
import MyMenu from './MyMenu.vue';
import { ArrowDown } from '@element-plus/icons-vue'
import Message from '@/utils/Message'
import Request from '@/utils/Request.js';

const router = useRouter();
const formInline = reactive({
  searchType:'content',
  content: '',
});


const login = () => {
  router.push('/login')
}
// 定义一个方法来处理搜索表单的提交
const handleSearch = (event) => {
  if(!formInline.content){
  ElMessage({
        message: '搜索不能为空',
        grouping: true,
        type: 'error',
        duration:500,

      });
    }
    else{
    router.push(`/search/${formInline.searchType}/${formInline.content}`);
    }
  formInline.content='';
};
import { useStore } from 'vuex';
import Search from '../Index/Search.vue';
const store = useStore();
const username = ref("");

onMounted(async () => {
  try {
    let res = await Request({
      url: '/api/getusername',
      params: {
        userid: sessionStorage.getItem("email"),
        userpassword: sessionStorage.getItem("userPassword"),
      },
      dataType: "json",
    });
    if (res.code === 200) {
      username.value=res.username
      return true;
    } else {
      username.value=""
      return false;
    }
  } catch (error) {
    console.error("请求异常：", error);
    return false;
  }
})


const enterInform=()=>{
  router.push('/inform')
}
const quit=()=>{
  router.push('/login')
}
//提问模块
const createQuestion=()=>{
  if(!sessionStorage.isLogin){
    Message.warning("请先登录！")
  }
  else{
    router.push('/editQuestion')
  }
}
const createTeam=()=>{
  if(!sessionStorage.isLogin){
    Message.warning("请先登录！")
  }
  else{
    router.push('/editTeam')
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: white;
  box-shadow: 0 1px 3px #ddd;
}

.webheader {
  display: flex;
  align-items: center;
  width: 100%;
}

.el-container .el-header {
  padding: 0;
}

.user {
  position: relative;
  display: flex;
  align-items: center;
  min-width:10%;

}

.el-header .el-menu--horizontal {
  border: 0;
  width: 900px;
}

.logo {
  font-size: 25px;
  font-weight: bolder;
  text-decoration: none;
  color: red;
  position: relative;
  margin-left: 10px;
  padding-right: 10px;

}

.header-search {
  display: flex;
  margin-right: 20px;
}

.header-search .el-input {
  width: 400px;
  padding: 0px 10px;
}
.search-select{
  width:100px;
}
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

/* 媒体查询 */
@media (max-width: 568px) {
  .header-search .el-input {
    width: 100px;
    padding: 0px 10px;
  }

  .el-header .el-menu--horizontal {
    border: 0;
    width: 10%;
  }

  .logo {
    display: none;
    /* 隐藏用户信息和logo */
  }
}
</style>