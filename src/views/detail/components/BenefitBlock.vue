<template>
  <!-- estimated benefit block -->
  <el-collapse-item v-if="status !== 'Cancel' && hasProperty(store.getBenefit)" name="3">
    <template #title>
      <div class="detail-collapse">
        <font-awesome-icon icon="fa-solid fa-thumbtack" />
        {{ lang('Benefit') }}
      </div>
    </template>
    <div class="multiple-el-descriptions">
      <el-descriptions column="2" border>
        <el-descriptions-item :label="lang(renderType.title)">
          <el-tag size="small">{{ renderType.value }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="renderType.value === 'Quality'" :label="lang(renderQuality.title)">
          {{ lang(renderQuality.value) }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions column="1" border>
        <el-descriptions-item v-for="(item, key) in renderEfficiency" :key="key" :label="lang(item.title)">
          <table>
            <tr>
              <td>{{ lang('Expect') }}: </td>
              <td class="inline-flex items-center">
                <span>{{ item.exp }}</span>
                <span class="ml-2">hr / day</span>
              </td>
            </tr>
            <tr v-if="step === 'Done'">
              <td>{{ lang('Actual') }}: </td>
              <td class="inline-flex items-center">
                <span class="font-bold">{{ item.act }}</span>
                <span class="ml-2 mr-2">hr / day</span>
                <Increase v-if="item.exp < item.act" class="icon-increase" />
                <Decrease v-else-if="item.exp > item.act" class="icon-decrease" />
              </td>
            </tr>
          </table>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-collapse-item>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
import { useITReqStore } from '@/store/ITRequest'
import { hasProperty } from '@/hooks/useValidate'
import { Increase, Decrease } from '@/icons/common'
const store = useITReqStore()
const status = ref('')
const step = ref('')
const requestType = ref('')
const renderEfficiency = ref({})
const renderType = ref({})
const renderQuality = ref({})

onMounted(() => {
  status.value = store.getBasicInfo.status
  const benefit = store.getBenefit
  const { reqType, benefitType, qualityIssue, offlineExp, onlineExp, testerExp, offlineAct, onlineAct, testerAct } = benefit
  step.value = store.getSimpleStep
  requestType.value = reqType
  const qualityMapping = {
    'input-error': 'Input error',
    'hold-lots': 'Hold lots',
    'pc-misuse': 'P/C misuse',
    'program-misuse': 'Program misuse',
    'customer-complaint': 'Customer complaint'
  }

  renderType.value = { title: 'Type', value: benefitType}
  renderQuality.value = { title: 'Quality issue', value: qualityMapping[qualityIssue] }
  renderEfficiency.value = {
    onlineSavings: {
      title: 'Save online staff time',
      exp: onlineExp,
      act: onlineAct
    },
    offlineSavings: {
      title: 'Save offline staff time',
      exp: offlineExp,
      act: offlineAct
    },
    testerSavings: {
      title: 'Save tester time',
      exp: testerExp,
      act: testerAct
    }
  }
})
</script>
<style scoped lang="scss">
.icon-increase {
  color: var(--el-color-success);
}
.icon-decrease {
  color: var(--el-color-danger);
}
</style>