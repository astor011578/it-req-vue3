<template>
  <div>
    <span class="ce-title-lg">{{ lang('Core team member') }}</span>
    <div class="mt-3 mb-8">
      <!-- Requester name -->
      <el-form-item :label="lang('Requester name')">
        <el-row class="form-row-width">
          <el-col :span="12">
            <span class="flex">
              <el-input v-model="requesterName" disabled />
            </span>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- Test-IT name -->
      <el-form-item :label="lang('Test-IT name')">
        <el-row class="form-row-width">
          <el-col :span="12">
            <span class="flex">
              <el-input v-model="programmerName" disabled />
            </span>
          </el-col>
        </el-row>
      </el-form-item>
    </div>
  </div>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
import { useITReqStore } from '@/store/ITRequest'
const requesterName = ref('')
const programmerName = ref('')
onMounted(() => {
  requesterName.value = useITReqStore().getReqrInfo.name
  programmerName.value = useITReqStore().getPgInfo.name
})
</script>
