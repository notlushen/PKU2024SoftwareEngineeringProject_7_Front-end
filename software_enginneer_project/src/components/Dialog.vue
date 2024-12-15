<template>
<el-dialog
    :model-value="show"
    :show-close="showClose"
    :draggable="true"
    :close-on-click-modal ="false"
    :title="title"
    :width="width"
    class="cust-dialog"
    @close="close"
  >
  <div class="dialog-body">
    <slot></slot>
  </div>
   <template v-if="buttons&&buttons.length>0||showCancel">
        <div class="dialog-footer">
            <el-button link @click= "close" v-if="showCancel">取消</el-button>
            <el-button  v-for="btn in buttons" :type="btn.type" @click="btn.click">
                {{ btn.text }}
            </el-button>
        </div>
   </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { draggable } from 'element-plus/es/components/color-picker/src/utils/draggable.mjs';
const props=defineProps({
    show:{
        type:Boolean,
        default:true,
    },
    title:{
        type:String,
        default:"Tips",
    },
    showClose:{
        type:Boolean,
        default:true,
    },
    width:{
        type:String,
        default:"30%",
    },
    buttons:{
        type:Array,
    },
    showCancel:{
        type:Boolean,
        default:true,
    }
})
const emit=defineEmits();
const close= ()=>{
    emit("close");
}
</script>

<style scoped >
.cust-dialog {
  /* 圆角边框 */
  border-radius: 8px;
    margin-bottom: 10px;
  /* 阴影效果 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 标题样式 */
.el-dialog__header {
  padding: 20px;
  border-bottom: 1px solid #ebeef5;
}

/* 标题文本样式 */
.el-dialog__title {
  font-size: 18px;
  color: #333;
}

/* 关闭按钮样式 */
.el-dialog__headerbtn .el-dialog__close {
  font-size: 16px;
}

/* 内容区域样式 */
.dialog-body {
  padding: 20px;
  max-height: calc(100vh - 500px);
  overflow: auto;
}

/* 底部按钮区域样式 */
.dialog-footer {
  padding: 5px;
  text-align: right;
  border-top: 1px solid #ebeef5;
}

/* 取消按钮样式 */
.el-button--text {
  color: #409eff;
  border: none;
  background-color: transparent;
}

/* 确认按钮样式 */
.el-button {
  margin-left: 10px;
}

/* 按钮悬停效果 */
.el-button:hover {
  opacity: 0.8;
}

/* 按钮激活效果 */
.el-button:active {
  transform: translateY(2px);
}
</style>