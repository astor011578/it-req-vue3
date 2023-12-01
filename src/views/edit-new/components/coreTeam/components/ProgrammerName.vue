<template>
  <span class="flex">
    <!-- 顯示 Programmer name 框 -->
    <el-input v-model="programmerName" disabled />
    <!-- 選擇 Programmer button 與搜尋對話框 -->
    <SearchUser :only-programmers="true" @get-user-info="getProgrammer" />
  </span>
</template>

<script setup>
import { useNewStore } from '@/store/addNew'
import { SearchUser } from '@/components'
//綁定 disabled input 中的 programmer name 值
const programmerName = computed(() => { return useNewStore().application.coreTeam.pg[0] })
const selected = ref({})        //選中的 user 值
const getProgrammer = ($pgInfo) => {
  selected.value = $pgInfo
  programmerName.value = $pgInfo.name
  useNewStore().setProgrammer(selected.value)
}
</script>
<style scoped lang="scss">
:deep(.el-table) {
  //隱藏搜尋結果 table header 中的選擇框
  thead {
    .el-table-column--selection {
      .cell {
        display: none;
      }
    }
  }
}
</style>