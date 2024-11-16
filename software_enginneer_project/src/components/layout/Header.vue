<template>
  <div class="header">
    <div class="webheader">
      <MyMenu></MyMenu>
      <div class="header-search">
        <el-input v-model="formInline.content" type="search" placeholder="搜索问题..." class="search-input" />
        <el-button type="primary" round>
          搜索
        </el-button>
      </div>
      <div class="user">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{user.name}}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item >个人中心</el-dropdown-item>
              <el-dropdown-item divided @click="$router.push('/login')">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router=useRouter()
import { ElMenu, ElMenuItem, ElInput, ElButton } from 'element-plus';
import { reactive } from 'vue';
import MyMenu from './MyMenu.vue';
import { ArrowDown } from '@element-plus/icons-vue'
const formInline = reactive({
  content: '',
})
const user = reactive({
  name: '我不是陆神',
})
// 定义一个方法来处理搜索表单的提交
const handleSearch = (event) => {
  // 您可以在这里添加搜索逻辑，例如使用Vue的路由或调用API
  console.log('搜索被触发');
};
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
  min-width: 1000px;
  margin: auto;
}


.el-container .el-header {
  padding: 0;
}

.el-header .el-menu--horizontal {
  border: 0;
  width: 430px;
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
</style>