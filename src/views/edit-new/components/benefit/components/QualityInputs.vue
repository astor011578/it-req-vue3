<template>
  <el-form-item
    v-if="benefitType === 'Quality'"
    :label="lang('Quality issue')"
  >
    <el-row class="form-row-width">
      <el-col :span="12">
        <SelectMenu
          :options="options"
          :selected="selected"
          @get-selected-option="getSelectedOption"
        />
      </el-col>
      <el-col :span="12">
        <ValidateText
          :key-outer="'benefit'"
          :key-inner="'qualityIssue'"
        />
      </el-col>
    </el-row>
  </el-form-item>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
import { ValidateText } from '@/components'
import { useNewReqStore } from '@/store/new-request'
import { SelectMenu } from '@/components'
//從父組件取得 refreshCode
const props = defineProps({ refreshCode: { type: Number, default: 0 } })
const store = useNewReqStore()
const benefitType = ref('')   //儲存 benefit 類型
const selected = computed(() => { return store.getBenefit.qualityIssue })   //綁定選中的選項數值
//用來渲染選單選項
const options = ref([
  { value: 'input-error', label: 'Input error' },
  { value: 'hold-lots', label: 'Hold lots' },
  { value: 'pc-misuse', label: 'P/C misuse' },
  { value: 'program-misuse', label: 'Program misuse' },
  { value: 'customer-complaint', label: 'Customer complaint' }
])

//從 store 中獲取 benefit 類型
onMounted(() => {
  benefitType.value = store.getBenefitType
  setValidateString()
})
//監聽父組件的 refreshCode 是否有變化, 並重新獲取 benefit 類型
watch(props, (val) => {
  benefitType.value = store.getBenefitType
  if (benefitType.value === 'Efficiency') store.setQualityIssue('')
  setValidateString()
})

//從子組件 SelectMenu.vue 取得選中的選項值, 並儲存至 store 中
const getSelectedOption = (selectedOption) => {
  selected.value = selectedOption
  store.setQualityIssue(selectedOption)
  setValidateString()
}
//複用程式碼: 儲存 validate 字串的值到 store 中
const setValidateString = () => {
  const validateString = benefitType.value === 'Quality' && selected.value === '' ? 'Must select which issue will be improved' : ''
  store.setSpecificValidate('benefit.qualityIssue', validateString)
}
</script>
