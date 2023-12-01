<template>
  <div>
    <span class="ce-title-lg">
      {{ lang('Benefit') }}
    </span>
    <!-- prompt text -->
    <div class="p-3">
      <Notice />
    </div>
    <!-- Benefit 類型 -->
    <div class="mt-3">
      <el-form-item :label="lang('Benefit type')">
        <el-row class="form-row-width">
          <el-col :span="12">
            <el-input v-model="benefitType" disabled />
          </el-col>
        </el-row>
      </el-form-item>
    </div>
    <div class="mb-8">
      <QualityInputs v-if="benefitType === 'Quality'" />
      <EfficiencyInputs />
    </div>
  </div>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
import { Notice, QualityInputs, EfficiencyInputs } from './components'
import { useITReqStore } from '@/store/ITRequest'
const store = useITReqStore()
const benefitType = ref('')
onMounted(() => benefitType.value = store.getBenefit.benefitType)
</script>