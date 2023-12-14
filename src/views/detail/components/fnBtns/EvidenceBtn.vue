<template>
  <span class="mr-3">
    <!-- Upload evidence button -->
    <el-tooltip
      :content="lang(props.tip)"
      placement="bottom"
      effect="dark"
    >
      <el-button
        :icon="props.icon"
        plain
        circle
        type="primary"
        :disabled="!permission"
        @click="showUploadDialog = true"
      />
    </el-tooltip>
    <!-- Upload evidence dialog -->
    <el-dialog
      v-model="showUploadDialog"
      :title="lang('Upload evidence')"
      width="400px"
    >
      <UploadFiles
        :size="size"
        :plain="plain"
        :upload-to="uploadTo"
        :step="step"
        @get-children="getUploads"
      />
    </el-dialog>
    <!-- Benefit dialog -->
    <el-dialog
      v-model="showBenefitDialog"
      :title="lang('Fill the actual benefit')"
      width="450px"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-table
        id="benefit-table"
        :data="benefitTableInfo"
        height="170"
      >
        <el-table-column
          align="center"
          prop="title"
          width="150"
        >
          <template #default="scope">{{ lang(scope.row.title) }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="exp"
          :label="lang('Expect benefit')"
          width="110"
        >
          <template #default="scope">
            <span>{{ scope.row.exp }}</span>
            <span class="ml-2">hr / day</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="lang('Actual benefit')">
          <template #default="scope">
            <el-input
              v-model="actualBenefit[`${scope.row.key}Act`]"
              type="number"
              step="0.1"
              min="0"
              max="24"
              :value-on-clear="0"
            />
            <span class="ml-2">hr / day</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="ce-dialog-footer-btn">
        <el-button
          type="primary"
          :loading="benefitLoading"
          @click="submitBenefit"
        >
          {{ lang('Submit') }}
        </el-button>
      </div>
    </el-dialog>
  </span>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import { UploadFiles } from '@/components'
import { useITReqStore } from '@/store/IT-request'
import { hasProperty } from '@/hooks/useValidate'
import { dateGenerator } from '@/hooks/useDate'
import { lang } from '@/hooks/useCommon'
import axiosReq from '@/utils/axiosReq'
const props = defineProps({
  icon: { type: Object, required: true },
  tip: { type: String, required: true }
})
const store = ref({})
const uploadTo = 'evidence'
const size = 'large'
const plain = false
const router = useRouter()
const permission = ref(false)
const reqNo = useRoute().params.reqNo
const step = ref('')
const reqType = shallowRef('')
const benefitType = shallowRef('')
const benefitTableInfo = shallowRef([])
const actualBenefit = ref({})
const aboutToClose = ref(false)       //是否即將要結案
const benefitLoading = ref(false)     //benefit dialog 中的 loading
const uploadedEvidence = ref({})      //已上傳的證明
const showUploadDialog = ref(false)   //是否顯示上傳證明的 dialog 框
const showBenefitDialog = ref(false)  //是否顯示更新 actual benefit 的 dialog 框

//取得子組件傳回的上傳證明資訊 (UploadFiles.vue)
const getUploads = async (uploads) => {
  if (uploads.length) {
    let uploadFiles = []
    uploads.forEach((upload) => {
      uploadFiles.push({
        path: upload.path,
        filename: upload.filename,
        originalname: upload.originalname
      })
    })

    let today = dateGenerator()
    uploadedEvidence.value = {
      step: step.value,
      updateDate: today,
      uploadFiles: uploadFiles
    }
    if (aboutToClose.value && benefitType.value !== '') {
      showBenefitDialog.value = true
    } else {
      await submitEvidence(uploadedEvidence.value)
    }
  }
}

//提交上傳證明的資訊到服務端
const submitEvidence = async (requestData) => {
  axiosReq({
    method: 'patch',
    url: `/evidence/${reqNo}`,
    data: requestData
  })
    .then(() => {
      setTimeout(() => {
        router.push('/reload')
      }, 1500)
    })
    .catch(() => {
      ElMessage.error(lang('Failed to upload files'))
    })
}

//提交 actual benefit 到服務端
const submitBenefit = async () => {
  benefitLoading.value = true
  const stringToFloat = value => {
    return typeof value === 'string' ? parseFloat(value) : value
  }
  for (const [key, value] of Object.entries(actualBenefit.value)) {
    actualBenefit.value[key] = stringToFloat(value)
  }

  await axiosReq({
    method: 'patch',
    url: `/benefit?no=${reqNo}`,
    data: actualBenefit.value
  })
    .then(() => ElMessage.success(lang('Update the actual benefit successfully')))
    .catch(() => ElMessage.error(lang('Failed to update the actual benefit')))

  setTimeout(() => {
    benefitLoading.value = false
    showBenefitDialog.value = false
  }, 1000)

  await submitEvidence(uploadedEvidence.value)
}

onMounted(() => store.value = useITReqStore())
watch(store, async (val) => {
  permission.value = await store.value.getPermission.evidence
  const _benefit = await store.value.getBenefit
  step.value = await store.value.getSimpleStep

  console.log(permission.value)

  if (hasProperty(_benefit)) {
    const { offlineExp, onlineExp, testerExp, offlineAct, onlineAct, testerAct } = _benefit
    reqType.value = _benefit.reqType
    benefitType.value = _benefit.benefitType

    benefitTableInfo.value.push({ key: 'tester', title: 'Save tester time', exp: testerExp })
    benefitTableInfo.value.push({ key: 'online', title: 'Save online staff time', exp: onlineExp })
    benefitTableInfo.value.push({ key: 'offline', title: 'Save offline staff time', exp: offlineExp })

    actualBenefit.value = {
      offlineAct: offlineAct === 0 ? offlineExp : offlineAct,
      onlineAct: onlineAct === 0 ? onlineExp : onlineAct,
      testerAct: testerAct === 0 ? testerExp : testerAct
    }
  
    switch (reqType.value) {
      case 'OneTime': aboutToClose.value = step.value === 'UAT2' ? true : false; break;
      case 'Project': aboutToClose.value = step.value === 'monitor' ? true : false; break;
    }
  
    //for debugging
    // console.log(`現在在步驟 ${step.value}, 目前是否具有更新 evidence 的權限?`, permission.value)
    // console.log('是否即將要結案?', aboutToClose.value)
  }
})
</script>

<style lang="scss">
#benefit-table {
  .el-input {
    width: 55px !important;
  }

  tbody {
    td {
      height: 46px;
    }
  }
}
</style>
