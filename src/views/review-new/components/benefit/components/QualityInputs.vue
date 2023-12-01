<template>
  <el-form-item :label="lang('Quality issue')">
    <el-row class="form-row-width">
      <el-col :span="12">
        <el-input v-model="qualityIssue" disabled />
      </el-col>
    </el-row>
  </el-form-item>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
import { useITReqStore } from '@/store/ITRequest'
const store = useITReqStore()
const qualityIssue = ref('')
const mappings = {
  'input-error': 'Input error',
  'hold-lots': 'Hold lots',
  'pc-misuse': 'P/C misuse',
  'program-misuse': 'Program misuse',
  'customer-complaint': 'Customer complaint'
}
onMounted(() => {
  const value = store.getBenefit.qualityIssue
  qualityIssue.value = mappings[value]
})
</script>