<template>
  <span class="flex">
    <el-input v-model="requesterName" disabled />
  </span>
</template>

<script setup>
import { useNewStore } from '@/store/addNew'
const store = useNewStore()
const requesterName = computed(() => { return store.application.coreTeam.reqr[0] })
</script>