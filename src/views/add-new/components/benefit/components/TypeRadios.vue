<template>
  <el-form-item :label="lang('Benefit type')">
    <el-radio-group v-model="benefitType">
      <el-radio label="Efficiency" />
      <el-radio label="Quality" />
    </el-radio-group>
  </el-form-item>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
import { useNewStore } from '@/store/addNew'
const addNewStore = useNewStore()
const benefitType = ref('Efficiency')     //綁定 el-radio 的值
const emits = defineEmits([ 'get-need-refresh' ])
const changeBenefitType = ($benefitType) => {
  addNewStore.setBenefitType($benefitType)
  if (benefitType.value === 'Quality') addNewStore.setSpecificValidate('benefit.savingTimes', '')
  emits('get-need-refresh', true)
}
//儲存初始值到 store 中
onMounted(() => changeBenefitType(benefitType.value))
watch(benefitType, (val) => changeBenefitType(benefitType.value))
</script>