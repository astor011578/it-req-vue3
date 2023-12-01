<template>
  <el-tooltip
    :content="lang('Download working instruction')"
    placement="left"
    effect="light"
  >
    <a class="wi-hyperlink-icon" href="/WI/Test-IT-Request-WI.pdf"  download="Test-IT-Request-System-WI">
      <font-awesome-icon icon="fa-solid fa-file-circle-question" />
    </a>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { lang } from '@/hooks/useCommon'
</script>
<style lang="scss" scoped>
.wi-hyperlink-icon {
  margin-right: 26px;
  color: #ffffff;
}
svg {
  padding-top: 5px;
  height: 28px !important;
  width: 28px !important;
}
</style>