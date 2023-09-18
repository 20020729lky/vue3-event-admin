<script setup>
import { ref } from 'vue'
import { artAddChannelsService, artEditChannelsService } from '@/api/article'
const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类名必须是1-15位的字母或数字',
      trigger: 'blur'
    }
  ]
}
// 组件对外暴露一个方法 open,  基于 open 的参数，初始化表单数据，并判断区分是添加 还是 编辑

// 1. open({ })                   =>  添加操作，添加表单初始化无数据
// 2. open({ id: xx,  ...  })  =>  编辑操作，编辑表单初始化需回显

const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  // 通过校验
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelsService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelsService(formModel.value)
    ElMessage.success('添加成功')
  }

  // 关闭弹窗
  dialogVisible.value = false
  // 更新表单 子传父
  emit('success')
}

const open = (row) => {
  console.log(row)
  dialogVisible.value = true
  formModel.value = { ...row }
}
// 向外暴露方法
defineExpose({
  open
})
</script>
<template>
  <!-- 弹窗 -->
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑' : '添加'"
    width="30%"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name"
        ><el-input
          v-model="formModel.cate_name"
          placeholder="请输入分类名称"
        ></el-input
      ></el-form-item>
      <el-form-item label="分类别名" prop="cate_alias"
        ><el-input
          v-model="formModel.cate_alias"
          placeholder="请输入分类别名"
        ></el-input
      ></el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
