<template>
  <span class="mr-1">
    <!-- Cancel button -->
    <el-tooltip
      :content="lang(props.tip)"
      placement="bottom"
      effect="dark"
    >
      <el-button
        :icon="props.icon"
        plain
        circle
        type="danger"
        :disabled="!permission"
        @click="showDialog = true"
      />
    </el-tooltip>
    <el-dialog
      v-model="showDialog"
      :title="lang('Cancel this IT-request')"
      width="450px"
    >
      <el-descriptions id="cancellation-table" column="1" border>
        <el-descriptions-item :label="lang('Application date')">
          {{ cancellation.application_date }}
        </el-descriptions-item>
        <el-descriptions-item :label="lang('Applicant')">
          {{ cancellation.applicant[0] }}
        </el-descriptions-item>
        <el-descriptions-item :label="lang('Reason')">
          <el-input
            v-model="cancellation.reason"
            type="textarea"
            :placeholder="lang('Please leave the reason for cancellation here')"
          />
        </el-descriptions-item>
      </el-descriptions>
      <div class="ce-dialog-footer-btn">
        <el-button type="primary" :loading="loading" @click="submit">{{ lang('Submit') }}</el-button>
      </div>
    </el-dialog>
  </span>
</template>
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { useITReqStore } from '@/store/ITRequest'
import { hasProperty } from '@/hooks/useValidate'
import { dateGenerator } from '@/hooks/useDate'
import { lang } from '@/hooks/useCommon'
const store = ref({})
const permission = ref(false)
const ITno = useRoute().params.ITno
const loading = ref(false)
const router = useRouter()
const showDialog = ref(false)       //是否要顯示取消申請的 dialog 框
const props = defineProps({
  icon: { type: Object, required: true },
  tip: { type: String, required: true }
})

//取消申請的 input 欄位
const cancellation = ref({
  application_date: dateGenerator(),
  applicant: [],
  reason: ''
})
//提交需求取消申請到服務端
const submit = () => {
  ElMessageBox.confirm(lang('Are you sure to cancel this request? This action cannot be undone'), '', {
    confirmButtonText: lang('OK'),
    cancelButtonText: lang('Cancel'),
    type: 'warning'
  })
    .then(() => {
      //for debugging
      // console.log(cancellation.value)

      loading.value = true
      axiosReq({
        url: `/cancel?no=${ITno}`,
        method: 'patch',
        data: cancellation.value
      }).then((res) => {
        loading.value = false
        switch (res.code) {
          case 200: {
            ElMessage.success(lang('Apply for cancellation successfully'))
            break
          }
          default: {
            ElMessage.error(lang('Failed to apply for cancellation'))
            break
          }
        }
        router.push('/reload')
      })
    })
    .catch(() => {
      ElMessage.info(lang('Action cancelled'))
    })
}

onMounted(() => store.value = useITReqStore())
watch(store, async (val) => {
  const applicant = await store.value.getApplicant
  permission.value = await store.value.getPermission.cancel
  if (hasProperty(applicant)) cancellation.value.applicant = applicant
})
</script>
<style lang="scss">
#cancellation-table {
  .el-descriptions__label {
    width: 115px;
  }

  .el-textarea {
    word-break: break-word;
  }
}
</style>