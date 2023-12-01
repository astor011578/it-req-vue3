<template>
  <!-- cancellation block -->
  <el-collapse-item v-if="hasProperty(cancellation)" name="2">
    <template #title>
      <div class="detail-collapse">
        <font-awesome-icon icon="fa-solid fa-thumbtack" />
        {{ lang('Cancellation') }}
      </div>
    </template>
    <div>
      <el-descriptions column="2" border>
        <el-descriptions-item :label="lang('Application date')">{{ cancellation.apply_date }}</el-descriptions-item>
        <el-descriptions-item :label="lang('Status')">
          <el-tag :type="tagTypes[cancellation.result]">{{ lang(cancellation.result) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="lang('Applicant')">{{ cancellation.applicant[0] }}</el-descriptions-item>
        <el-descriptions-item :label="lang('Reason')">{{ cancellation.reason }}</el-descriptions-item>
        <el-descriptions-item v-if="cancellation.result === 'Rejected'" :label="lang('Rejection message')">
          <span v-if="cancellation.comments === ''" class="ce-gray-color-italic">
            {{ lang('There is no comments') }}
          </span>
          <span v-else>
            {{ cancellation.comments }}
          </span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-collapse-item>
</template>

<script setup>
import { useITReqStore } from '@/store/ITRequest'
import { hasProperty } from '@/hooks/useValidate'
import { lang } from '@/hooks/useCommon'
const store = useITReqStore()
const cancellation = ref({})
const tagTypes = {
  Approved: 'primary',
  Rejected: 'info',
  Pending: 'warning'
}
onMounted(() => {
  cancellation.value = store.getCancellation ? store.getCancellation : {}
  switch(cancellation.value.result) {
    case 'Approve': cancellation.value.result = 'Approved'; break;
    case 'Reject': cancellation.value.result = 'Rejected'; break;
  }
})
</script>