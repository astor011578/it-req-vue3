<template>
  <div>
    <span class="ce-title-lg">
      {{ lang('Benefit of this IT-Request') }}
    </span>
    <!-- prompt text -->
    <div class="p-3">
      <Notice />
    </div>
    <!-- 選擇 Benefit 類型 -->
    <div class="mt-3">
      <TypeRadios @get-need-refresh="getNeedRefresh" />
    </div>
    <div class="mb-8">
      <!-- benefit 類型為 Quality 時需要選擇為改善何種 Quality 事件 -->
      <QualityInputs :refresh-code="refreshCode" />
      <!-- 節省機台或人員時間的輸入項 -->
      <EfficiencyInputs :refresh-code="refreshCode" />
    </div>
  </div>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
import { Notice, TypeRadios, QualityInputs, EfficiencyInputs } from './components'
//提供子組件判斷是否需要重新向 store 取值
const refreshCode = ref(0)
//取得子組件傳來的 needRefresh
const getNeedRefresh = (needRefresh) => { if (needRefresh) refreshCode.value++ }
</script>