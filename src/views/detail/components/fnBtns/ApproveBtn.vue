<template>
  <span class="mr-3">
    <!-- Approve button -->
    <el-tooltip
      :content="lang(props.tip)"
      placement="bottom"
      effect="dark"
    >
      <el-button
        :icon="props.icon"
        plain
        circle
        type="success"
        :disabled="!permission"
        @click="showDialog = true"
      />
    </el-tooltip>
    <!-- Approve evidence dialog -->
    <el-dialog
      v-model="showDialog"
      :title="lang('Approve evidence')"
      width="500px"
    >
      <el-descriptions
        v-if="hasProperty(evidence)"
        id="uApprove-table"
        column="1"
        border
      >
        <el-descriptions-item :label="lang('Upload date')">
          {{ evidence.upload_date }}
        </el-descriptions-item>
        <el-descriptions-item :label="lang('Evidence')">
          <div
            v-for="(file, index) in evidence.upload_files"
            :key="index"
          >
            <a
              class="ce-link"
              target="_blank"
              :href="`${prePath}/${step}/${file.filename}`"
              :download="file.originalname"
            >
              <File class="mr-1" />
              {{ file.originalname }}
            </a>
          </div>
        </el-descriptions-item>
        <el-descriptions-item
          v-if="showBenefit && hasProperty(actualBenefit)"
          :label="lang('Actual benefit')"
        >
          <ul id="actual-benefit-list">
            <li v-for="(item, key) in actualBenefit" :key="key">
              <span class="mr-2">{{ lang(item.title) }}:</span>
              <span class="mr-2">{{ item.value }}</span>
              <span>(hr / day)</span>
            </li>
          </ul>
        </el-descriptions-item>
      </el-descriptions>
      <!-- Submit button (Reject / Approve) -->
      <div class="ce-dialog-footer-btn">
        <el-button
          :loading="loading"
          @click="reject"
        >
          {{ lang('Reject') }}
        </el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="approve"
        >
          {{ lang('Approve') }}
        </el-button>
      </div>
    </el-dialog>
  </span>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { File } from '@/icons/common/'
import { useITReqStore } from '@/store/IT-request'
import { hasProperty } from '@/hooks/useValidate'
import { dateGenerator } from '@/hooks/useDate'
import { lang } from '@/hooks/useCommon'
const props = defineProps({
  icon: { type: Object, required: true },
  tip: { type: String, required: true }
})
const store = ref({})
const permission = ref(false)
const step = ref('')
const router = useRouter()
const reqNo = useRoute().params.reqNo
const prePath = `${import.meta.env.VITE_APP_BASE_URL}/uploads/${reqNo}`
const evidence = ref({})
const reqData = ref({})
const loading = ref(false)
const showBenefit = ref(false)    //是否要顯示 benefit (最後一個步驟才需要)
const showDialog = ref(false)     //save state of dialog
const actualBenefit = ref({})

const approve = () => {
  reqData.value.upload_reply[1] = 'Approve'
  loading.value = true
  setTimeout(() => {
    axiosReq({
      method: 'patch',
      url: `/approve?no=${reqNo}`,
      data: reqData.value
    }).then(() => {
      ElMessage.success(lang('Approve evidence successfully'))
      router.push('/reload')
    })
  }, 2000)
}

const reject = () => {
  ElMessageBox.prompt(lang('Please leave a reason for rejection'), lang('Reject evidence'), {
    confirmButtonText: lang('Submit'),
    cancelButtonText: lang('Cancel'),
    inputPlaceholder: lang('Please leave a reason for rejection'),
    inputType: 'textArea',
    buttonSize: 'small'
  })
    .then(({ value, action }) => {
      reqData.value.upload_reply[1] = 'Reject'
      reqData.value.upload_reply[2] = value
      loading.value = true

      setTimeout(() => {
        axiosReq({
          method: 'patch',
          url: `/approve?no=${reqNo}`,
          data: reqData.value
        }).then(() => {
          loading.value = false
          ElMessage.success(lang('Reject evidence successfully'))
          router.push('/reload')
        })
      }, 2000)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: lang('Action cancelled')
      })
    })
}

onMounted(() => store.value = useITReqStore())
watch(store, async (val) => {
  permission.value = await store.value.getPermission.approve
  step.value = await store.value.getSimpleStep
  const _evidence = await store.value.getEvidence
  const _benefit = await store.value.getBenefit
  const { reqType, offlineAct, onlineAct, testerAct } = _benefit
  const replyDate = dateGenerator()

  if (step.value.length && hasProperty(_evidence)) {
    if (step.value !== 'Done' && step.value !== 'Cancel') {
      //要顯示在 dialog 表格中的資料
      evidence.value = {
        upload_date: _evidence[step.value].upload_date,
        upload_files: Object.assign({}, _evidence[step.value].upload_files)
      }
  
      //之後會被傳到服務端的 request data
      reqData.value = {
        step: step.value,
        upload_reply: [replyDate, '', '']
      }
  
      //取得需求類型
      const requestType = reqType
  
      //是否要顯示有關 benefit 的欄位
      if (requestType === 'OneTime') {
        showBenefit.value = step.value === 'UAT2' ? true : false
      } else if (requestType === 'Project') {
        showBenefit.value = step.value === 'monitor' ? true : false
      }
  
      //取得實際效益 (actual benefit) 的值
      actualBenefit.value = {
        tester: { title: 'Save tester time', value: testerAct },
        online: { title: 'Save online staff time', value: onlineAct },
        offline: { title: 'Save offline staff time', value: offlineAct }
      }
      
      //for debugging
      // console.log('現在步驟是', step.value)
      // console.log('現在是否有 approve 的權限? ', permission.value)
      // console.log('Dialog 是否會顯示 Benefit 欄位?', showBenefit.value)
    }
  }
})
</script>
<style scoped lang="scss">
a {
  display: inline-flex;
  width: 290px;
  height: 24px;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#actual-benefit-list {
  list-style-type: none;
  padding-left: 0;
}
</style>
