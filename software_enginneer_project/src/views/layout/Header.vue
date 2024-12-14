<template>
  <div class="header">
    <div class="webheader">
      <!--Logo-->
      <router-link to="/" class="logo">智学</router-link>
      <!--菜单-->
      <MyMenu></MyMenu>
      <!--搜索框-->
      <div class="header-search">
        <el-input v-model="formInline.content" type="search" placeholder="搜索问题..." class="search-input" />
        <el-button type="primary" round @click="handleSearch">
          搜索
        </el-button>
        <el-button type="primary" round @click="createQuestion">
          提问
        </el-button>
      </div>
      <!--用户信息-->
      <div  class="user" v-if="userInfo.userId">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ userInfo.userId }}
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

const router = useRouter();
const formInline = reactive({
  content: '',
});

const showDialog = ref(true);
const buttons = [{
  type: "primary",
  text: "确定",
}]

const login = () => {
  router.push('/login')
}
// 定义一个方法来处理搜索表单的提交
const handleSearch = (event) => {
  // 您可以在这里添加搜索逻辑，例如使用Vue的路由或调用API
  console.log('搜索被触发');
  console.log(userInfo.userId)

};
import { useStore } from 'vuex';
const store = useStore();
const userInfo = ref({});
onMounted(() => {
  //getUserInfo();
  console.log(sessionStorage.isLogin)

  console.log(sessionStorage.userId)
  userInfo.value.userId=sessionStorage.email
  console.log(userInfo.value.userId)

});

const getUserInfo = async () => {
  let res = await Request({
    url: '/getUserInfo',
    params: {
      id: id,
      password: password,
    },
    dataType: "json",
  });
  if (!res) {
    return;
  }
  store.commit("updateLoginUserInfo", res.data)
}

watch( 
  () => store.state.loginUserInfo,
  
  (newVal, oldVal) => {
    if (newVal != undefined && newVal != null) {
     // userInfo.value = newVal;
    }
    else {
     // userInfo = {};
    }
  }

);
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