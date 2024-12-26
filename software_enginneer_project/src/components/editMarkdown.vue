<template>
<v-md-editor :model-value="modelValue" 
    :disabled-menus="[]"
    :include-level="[1,2,3,4,5,6]"
    :height="height+'px'"
    @change="change"
></v-md-editor>
</template>

<script setup lang="ts">
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css"
import "@kangc/v-md-editor/lib/theme/style/github.css"
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js"
import { getCurrentInstance } from 'vue';
import hljs from 'highlight.js';
VMdEditor.use(githubTheme,{
    Hljs:hljs,
});
const prop=defineProps({
    modelValue:{
        type:String,
        default:"",
    },
    height:{
        type:Number,
        default:500,
    },

})
const emit=defineEmits();
const change=(markdownContent:any,htmlContent:any)=>{
    emit("update:modelValue",markdownContent);
    emit("htmlContent",htmlContent);
}
</script>

<style scoped>
.v-md-editor{
    min-height: max-content;
}
</style>