<template>
<el-menu
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    router
  >
      <el-menu-item index="#">
        <div class="logo">智学</div>
      </el-menu-item>
      <el-menu-item :index="v.url" v-for="v in useMenus":key="v.url">
        <span>{{ v.name }}</span>
    </el-menu-item>

    </el-menu>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const useMenus = ref([
  {name:'首页',url:'/index/home'},
  {name:'问答',url:'/index/question'},
  {name:'组队',url:'/index/team'},

])


const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>

</style>