<template>
  <div>
    <!-- radio of type -->
    <div class="mt-3">
      <el-form-item :label="lang('Request type')">
        <el-radio-group v-model="type" @change="radioListener">
          <el-radio label="Project" />
          <el-radio label="OneTime" />
        </el-radio-group>
      </el-form-item>
    </div>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { lang } from '@/hooks/useCommon'
import { ExclamationTriangle } from '@/icons/common'
import { useNewReqStore } from '@/store/new-request'
const newReqStore = useNewReqStore()
const emits = defineEmits([ 'get-need-refresh' ])
//綁定 type radio 的值
const type = ref('Project')

//儲存 type 預設值到 store 中
onMounted(() => setTypeAndRefresh(type.value))

//如果 user 點擊 OneTime 選項, 會再次跳出訊息視窗以作提醒
const radioListener = async (option) => {
  if (option === 'OneTime') {
    const content1 = 'OneTime request cannot be directly related to mass production, '
    const content2 = 'Continue?'
    await ElMessageBox.confirm(
      `${lang(content1)}${lang(content2)}`,
      'Warning',
      { type: 'error', icon: ExclamationTriangle }
    )
      .then(() => {
        ElMessage.info(lang('You chose the type OneTime'))
      })
      .catch(() => {
        ElMessage.info(lang('Action cancelled'))
        type.value = 'Project'
      })
  }
  setTypeAndRefresh(type.value)
}

//封裝重複的程式碼: 將 type 數值的變化儲存到 store, 並告知父組件需要 refresh 數值
const setTypeAndRefresh = (type) => {
  newReqStore.setRequestType(type)
  emits('get-need-refresh', true)
}
</script>
