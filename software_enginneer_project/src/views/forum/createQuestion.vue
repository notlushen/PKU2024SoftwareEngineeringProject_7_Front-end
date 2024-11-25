<template>
    <div class="create-question">
        <div class="editor">
            <el-form :model="form1" label-width="auto" class="form">
                <div>
                <el-card>问题标题</el-card>
                    <el-input v-model="form1.title"
                        placeholder="请输入标题"></el-input>
                    </div>

                <el-card>问题正文</el-card>
                <EditMarkdown v-model="form1.content"></EditMarkdown>
                <el-form-item>
                    <el-button type="primary" @click="submit">发布</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import EditMarkdown from '@/components/editMarkdown.vue';
import { reactive } from 'vue';
import Request from '@/utils/Request.js';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from '@/router';

const form1 = reactive({
    title: '',
    content: '',

})
const submit=async()=>{
    try {
        let res = await Request({
            url: '/api/createquestion',
            params: {
                title:form1.title,
                body:form1.content,
                email:sessionStorage.getItem("email")
            },
            dataType: "json",
        });
        if (res.code === 200) {
            ElMessage({
                    message: '发布成功',
                    grouping: true,
                    type: 'success',
                });
                router.push("/index")
        } else {
            ElMessage({
                    message: '发布失败',
                    grouping: true,
                    type: 'error',
                });
        }
    } catch (error) {
    }

}
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