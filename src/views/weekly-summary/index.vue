<template>
  <div>
    <ITRequests />
    <Benefits />
  </div>
</template>

<script setup>
import { default as ITRequests } from './IT-requests/index.vue'
import { default as Benefits } from './benefits/index.vue'
</script>

<style scoped lang="scss">
//override font color in el-button
:deep(.el-button) {
  color: #fff;
}
//bar-chart container 設定
:deep(.barchart-parent) {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}
:deep(.barchart-container) {
  height: 375px;
  margin: 0 auto;
  div:has(canvas) {
    margin: 0 auto !important;
  }
}
</style>
