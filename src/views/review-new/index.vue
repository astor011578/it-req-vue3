<template>
  <div id="addnew-container" class="ce-main-container">
    <FullLoading :loading="loading" />
    <div v-if="!loading">
      <el-form label-width="150px">
        <!-- Core team members -->
        <CoreTeamBlock />
        <!-- Define benefit -->
        <BenefitBlock />
        <!-- Request table -->
        <ReqTableBlock />
        <!-- Define type & schedule -->
        <ScheduleBlock />
      </el-form>
      <!-- Submit button -->
      <SubmitButton />
    </div>
  </div>
</template>

<script setup>
import { FullLoading } from '@/components'
import { CoreTeamBlock, BenefitBlock, ReqTableBlock, ScheduleBlock, SubmitButton } from './components'
import { useITReqStore } from '@/store/ITRequest'
import { useUserStore } from '@/store/user'
const router = useRouter()
const store = useITReqStore()
const ITno = useRoute().params.ITno
const loading = ref(false)
onMounted(async () => {
  loading.value = true
  store.setITNo(ITno)
  await store.getITRequestInfo()
  const isReviewing = store.getReqStatus === 'Reviewing'
  const username = useUserStore().username
  const isPg = store.getPgInfo.id === username ? true : false
  const permission = isPg && isReviewing ? true : false
  loading.value = false
  if (!permission) router.push({ path: '/401', replace: true })
})
</script>
<style lang="scss">
$input-w-relative: 100%;
$input-w-absolute: 300px;
$el-row-width-1200: 60%;
$el-row-width-910: 80%;
$el-row-width-lower910: 100%;

@media (min-width: 1200px) {
  #addnew-container {
    .form-row-width {
      width: $el-row-width-1200 !important;
    }
  }
}

@media (max-width: 1199.99px) and (min-width: 910px) {
  #addnew-container {
    .form-row-width {
      width: $el-row-width-910 !important;
    }
  }
}

@media (max-width: 909.99px) {
  #addnew-container {
    .form-row-width {
      width: $el-row-width-lower910 !important;
    }
  }
}

#addnew-container {
  //el-form label vertical center
  .el-form-item__label {
    display: flex;
    align-items: center;
    height: auto;
    white-space: pre-line;
    word-break: break-word;
    line-height: 18px;
  }

  .form-row-width {
    width: $el-row-width-1200;

    .el-col:first-child {
      padding-right: 2rem;
      display: inline-grid;
    }
    .el-col:nth-child(2) {
      display: flex;
      align-items: center;
    }
  }

  //reset el-input element style
  .el-dialog {
    .el-input {
      width: 100%;
    }
  }

  .el-input {
    width: $input-w-relative;
  }

  .el-textarea {
    width: $input-w-relative;
  }

  .el-upload-list__item {
    width: $input-w-absolute;
  }

  ul {
    padding-left: 1.5rem;
    margin-top: 0.5rem;

    li {
      line-height: 16px;
    }
  }

  strong {
    margin-right: 0.5rem;
  }
}
</style>
