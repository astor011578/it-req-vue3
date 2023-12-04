<template>
  <span v-if="hasProperty(requester)" class="flex">
    <el-input v-model="requester.name" disabled />
  </span>
</template>

<script setup>
import { hasProperty } from '@/hooks/useValidate';
import { useNewStore } from '@/store/addNew'
const store = useNewStore()
const userId = ref(localStorage.getItem('userId'))
const requester = ref({})      //綁定 requester 的資料

//向服務端請求 requester 資訊
onMounted(async () => {
  requester.value = await store.fetchUserInfo(userId.value)
  await store.setRequester(requester.value)
})
</script>