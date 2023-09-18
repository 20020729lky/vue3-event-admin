<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user.js'
import { ElMessage } from 'element-plus'

const formRef = ref()
// const userStore = useUserStore() 直接解构
const {
  user: { email, id, nickname, username },
  getUser
} = useUserStore()
const form = ref({
  username,
  id,
  nickname,
  email
})

const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}/,
      message: '昵称长度在 2 到 10 个非空字符之间',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}

const submitForm = async () => {
  // 在这里处理提交表单的逻辑
  await formRef.value.validate()
  // 提交修改
  await userUpdateInfoService(form.value)
  // 通知user模块， 进行数据更新
  getUser()
  //提示用户修改成功
  ElMessage.success('修改成功')
}
</script>

<template>
  <page-container title="基本资料">
    <!-- 表单部分 -->
    <el-row>
      <el-col :span="12">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="登录名称">
            <el-input v-model="form.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交修改</el-button>
          </el-form-item>
        </el-form></el-col
      >
    </el-row>
  </page-container>
</template>
