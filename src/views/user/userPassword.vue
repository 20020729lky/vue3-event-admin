<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { userUpdatePassword } from '@/api/user.js'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const formRef = ref()
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const checkNewPwd = (rule, value, callback) => {
  if (value === pwdForm.value.old_pwd) {
    callback(new Error('新密码不能与原密码相同'))
  } else {
    callback()
  }
}

const checkRePwd = (rule, value, callback) => {
  if (value !== pwdForm.value.new_pwd) {
    callback(new Error('确认密码与新密码不一致'))
  } else {
    callback()
  }
}

const pwdFormRules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在6-15位之间', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在6-15位之间', trigger: 'blur' },
    { validator: checkNewPwd, trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在6-15位之间', trigger: 'blur' },
    { validator: checkRePwd, trigger: 'blur' }
  ]
}

const userStore = useUserStore()
const router = useRouter()
const submitForm = async () => {
  await formRef.value.validate()
  await userUpdatePassword(pwdForm.value)
  ElMessage.success('修改密码成功')
  // 修改成功要退出重新登陆
  // 1. 清理token 和个人信息
  userStore.setToken('')
  userStore.setUser({})
  // 2.跳转登录页
  router.push('/login')
}

const resetForm = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <page-container title="修改密码">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="pwdForm"
          :rules="pwdFormRules"
          ref="formRef"
          label-width="100px"
        >
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="re_pwd">
            <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('pwdForm')"
              >修改密码</el-button
            >
            <el-button @click="resetForm('pwdForm')">重置</el-button>
          </el-form-item>
        </el-form></el-col
      >
    </el-row>
  </page-container>
</template>
