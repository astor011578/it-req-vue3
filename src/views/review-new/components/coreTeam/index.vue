<template>
  <div>
    <span class="ce-title-lg">{{ lang('Core team member') }}</span>
    <div class="mt-3 mb-8">
      <!-- Requester name -->
      <el-form-item :label="lang('Requester name')">
        <el-row class="form-row-width">
          <el-col :span="12">
            <span class="flex">
              <el-input v-model="reqrName" disabled />
            </span>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- IT name -->
      <el-form-item :label="lang('IT name')">
        <el-row class="form-row-width">
          <el-col :span="12">
            <span class="flex">
              <el-input v-model="pgrName" disabled />
            </span>
          </el-col>
        </el-row>
      </el-form-item>
    </div>
  </div>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
import { useITReqStore } from '@/store/IT-request'
const reqrName = ref('')
const pgrName = ref('')
onMounted(() => {
  reqrName.value = useITReqStore().getReqrInfo.name
  pgrName.value = useITReqStore().getPgrInfo.name
})
</script>
