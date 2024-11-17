<template>
<el-menu
    :default-active="$route.path"
    class="menu"
    mode="horizontal"
    router>

        <!--菜单选项-->
      <el-menu-item :index="v.url" v-for="v in useMenus":key="v.url">
        <span>{{ v.name }}</span>
    </el-menu-item>


    </el-menu>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const useMenus = ref([
  {name:'首页',url:'/index/home'},
  {name:'问答',url:'/index/question'},
  {name:'组队',url:'/index/team'},
])
</script>

<style scoped>
.menu {
align-items: center;
margin:0px ;

}
</style>