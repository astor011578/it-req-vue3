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
        :step="step"
        @get-children="getUploads"
      />
      <div class="ce-dialog-footer-btn">
        <el-button
          type="primary"
          :disabled="disabledButton"
          @click="submitEvidence(showBenefitDialog ? true : false)"
        >
          {{ lang('Upload to server') }}
        </el-button>
      </div>
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
              v-model="actualBenefit[`${scope.row.key}SavingAct`]"
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
import { uploadEvidence } from '@/api/upload'
import { updateEvidence, updateBenefit } from '@/api/IT-request'
import { useITReqStore } from '@/store/IT-request'
import { hasProperty } from '@/hooks/useValidate'
import { lang } from '@/hooks/useCommon'
const props = defineProps({
  icon: { type: Object, required: true },
  tip: { type: String, required: true }
})
const store = ref({})
const size = 'large'
const plain = false
const router = useRouter()
const permission = ref(false)
const reqNo = useRoute().params.reqNo
const step = ref('')
const disabledButton = ref(false)
const reqType = shallowRef('')
const evidences = ref([])             //要上傳的證明
const aboutToClose = ref(false)       //是否即將要結案
const benefitLoading = ref(false)     //benefit dialog 中的 loading
const showUploadDialog = ref(false)   //是否顯示上傳證明的 dialog 框
const showBenefitDialog = ref(false)  //是否顯示更新 actual benefit 的 dialog 框
const benefitType = shallowRef('')
const benefitTableInfo = shallowRef([])
const actualBenefit = ref({})

//取得子組件傳回的上傳證明資訊 (UploadFiles.vue)
const getUploads = async (files) => {
  evidences.value = Object.assign([], files)
  if (evidences.value.length) {
    if (aboutToClose.value && benefitType.value !== '') {
      showBenefitDialog.value = true
    }
  }
}

//提交上傳證明的資訊到服務端
const submitEvidence = async (waitingUpdateBenefit) => {
  disabledButton.value = true
  if (!waitingUpdateBenefit) {
    let result = []
    if (evidences.value.length) {
      const formData = new FormData()
      for await (const file of evidences.value) {
        formData.append('files', file.raw)
      }
      const res = await uploadEvidence(formData, reqNo, step.value)
      result = Object.assign([], res.data)
    } else {
      ElMessage.info(lang('No files selected'))
      return disabledButton.value = false
    }

    if (result.length) {  
      let uploadFiles = []
      result.forEach((resultFile) => {
        const { fileName, originalName } = resultFile
        uploadFiles.push({ fileName, originalName })
      })

      const requestData = {
        step: step.value,
        updateDate: new Date(),
        uploadFiles
      }

      await updateEvidence(reqNo, requestData)
        .then(() => {
          setTimeout(() => {
            ElMessage.success(lang('Upload to server successfully'))
            router.push('/reload')
          }, 1500)
        })
        .catch(() => {
          ElMessage.error(lang('Failed to upload files'))
          disabledButton.value = false
        })
    } else {
      disabledButton.value = false
    }
  }
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

  await updateBenefit(reqNo, actualBenefit.value)
    .then(() => ElMessage.success(lang('Update the actual benefit successfully')))
    .catch(() => ElMessage.error(lang('Failed to update the actual benefit')))

  setTimeout(() => {
    benefitLoading.value = false
    showBenefitDialog.value = false
  }, 1000)

  await submitEvidence()
}

onMounted(() => store.value = useITReqStore())
watch(store, async (val) => {
  permission.value = await store.value.getPermission.evidence
  const _benefit = await store.value.getBenefit
  step.value = await store.value.getSimpleStep

  if (hasProperty(_benefit)) {
    const {
      offlineSavingExp, onlineSavingExp, testerSavingExp,
      offlineSavingAct, onlineSavingAct, testerSavingAct
    } = _benefit
    reqType.value = _benefit.reqType
    benefitType.value = _benefit.benefitType

    benefitTableInfo.value.push({ key: 'tester', title: 'Save tester time', exp: testerSavingExp })
    benefitTableInfo.value.push({ key: 'online', title: 'Save online staff time', exp: onlineSavingExp })
    benefitTableInfo.value.push({ key: 'offline', title: 'Save offline staff time', exp: offlineSavingExp })

    actualBenefit.value = {
      offlineSavingAct: offlineSavingAct === 0 ? offlineSavingExp : offlineSavingAct,
      onlineSavingAct: onlineSavingAct === 0 ? onlineSavingExp : onlineSavingAct,
      testerSavingAct: testerSavingAct === 0 ? testerSavingExp : testerSavingAct
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
