<template>
  <el-form-item :label="lang('Saving time')">
    <el-row class="form-row-width">
      <el-col :span="12">
        <ul id="saving-time">
          <li v-for="(value, key) in formInputs" :key="key">
            <span class="saving-time-title">{{ lang(value.title) }}</span>
            <div class="saving-time-content">
              <el-input-number
                v-model="savingTimes[key]"
                class="w-100px"
                min="0"
                max="24"
                step="0.1"
                step-strictly="true"
                precision="1"
                :value-on-clear="0"
                @change="inputListener"
              />
              <div>(hr / day)</div>
            </div>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <ValidateText
          :override-class="benefitType === 'Quality' ? 'ce-gray-color pl-2' : null"
          :key-outer="'benefit'"
          :key-inner="'savingTimes'"
        />
      </el-col>
    </el-row>
  </el-form-item>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
import { ValidateText } from '@/components'
import { useNewReqStore } from '@/store/new-request'
const newReqStore = useNewReqStore()
const benefitType = ref('')       //儲存 benefit 類型

//綁定 el-input-number 的數值
const savingTimes = ref({
  tester: 0,
  onlineStaff: 0,
  offlineStaff: 0
})

//渲染輸入項用
const formInputs = {
  tester: { title: 'Tester time' },
  onlineStaff: { title: 'Online staff time' },
  offlineStaff: { title: 'Offline staff time' }
}

onMounted(async () => {
  newReqStore.setSavingTimes(savingTimes.value)
  benefitType.value = newReqStore.getBenefitType
  await setValidateString()
})

//複用程式碼: 設定 store 中的 validate string
const setValidateString = async () => {
  //三個 saving time 的和
  let sumOfSavingTime = 0
  for await (const [key, value] of Object.entries(savingTimes.value)) {
    sumOfSavingTime += value
  }
  //detect 三個 saving time 的和是否為 0, 是則表示三個數字都是 0
  let validateString = ''
  const isZero = sumOfSavingTime === 0 ? true : false
  if (isZero) {
    const warningOfEfficiency = 'Must choose at least one saving time to fill in'
    validateString = benefitType.value === 'Efficiency' ? warningOfEfficiency : ''
  }
  if (benefitType.value === 'Efficiency') newReqStore.setSpecificValidate('benefit.savingTimes', validateString)
}

//獲取父組件傳來的 refreshCode, 當 benefit 類型有改變時, refreshCode 數值也會改變
const props = defineProps({ refreshCode: { type: Number, default: 0 } })

//監聽父組件的 refreshCode 是否有改變, 有則刷新 benefitType 與 store 裡面的 validate
watch(props, (val) => {
  benefitType.value = newReqStore.getBenefitType
  setValidateString()
})

//監聽 el-input-number 數值輸入
const inputListener = async (value) => {
  for await (const [key, value] of Object.entries(savingTimes.value)) {
    if (typeof value !== 'number') savingTimes.value[key] = 0
  }
  newReqStore.setSavingTimes(savingTimes.value)
  await setValidateString()
}
</script>

<style scoped lang="scss">
#saving-time {
  list-style: none;
  padding-left: 0;

  li {
    display: inline-flex;
    height: 32px;
    line-height: 32px;

    .saving-time-title {
      width: 100px;
      padding-right: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .saving-time-content {
      width: calc(100% - 100px);
      display: inline-flex;
      :deep(.el-input-number) {
        width: 90px;
      }
      > div:last-child {
        padding-left: 0.5rem;
        width: 58px;
      }
    }
  }
}
</style>
