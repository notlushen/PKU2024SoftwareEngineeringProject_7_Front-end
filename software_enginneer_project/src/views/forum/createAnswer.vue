<template>
    <Dialog :show="showDialog" :buttons="buttons" @close="showDialog=false">
          <div :style="{height:'1500px'}" >neirong</div>
        
    <div class="create-question">
        <div class="editor">
            <el-form :model="form1" label-width="auto" class="form">
                <el-card>回答正文</el-card>
                <EditMarkdown v-model="form1.content"></EditMarkdown>
                <el-form-item>
                    <el-button type="primary" @click="submit">发布</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</Dialog> 
</template>

<script setup lang="ts">
import EditMarkdown from '@/components/editMarkdown.vue';
import Dialog from '@/components/Dialog.vue';
import { reactive,ref } from 'vue';
const form1 = reactive({
    title: '',
    content: '',

})
const submit=()=>{
    console.log(form1);
    
}
const showDialog = ref(true);
const buttons = [{
  type: "primary",
  text: "确定",
}]
</script>

<style scoped>
.create-question {
    display: flex;
    width: 100%;
    height: 100vh;

    .editor {
        width: 100%;

        .form {
            max-width: 100%;
            width: 100%;
            height: 100%;
        }
    }
}
</style>