<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { artGetChannelsService, artDelChannelsService } from '@/api/article'
import ChannelEdit from './components/ChannelEdit.vue'
const channelList = ref([])

const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  // 提示框
  await ElMessageBox.confirm('确认删除吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelsService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}
const onAddChannel = () => {
  dialog.value.open({})
}
getChannelList()
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-Container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column prop="" label="操作" width="100">
        <template #default="{ row, $index }">
          <el-button
            @click="onEditChannel(row, $index)"
            type="primary"
            :icon="Edit"
            plain
            circle
          ></el-button>
          <el-button
            @click="onDelChannel(row, $index)"
            :icon="Delete"
            type="danger"
            plain
            circle
          ></el-button
        ></template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-Container>
</template>
