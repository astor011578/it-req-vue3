<template>
  <!-- Scope block -->
  <el-collapse-item name="4">
    <template #title>
      <div class="detail-collapse">
        <font-awesome-icon icon="fa-solid fa-thumbtack" />
        {{ lang('Scope') }}
      </div>
    </template>
    <div v-if="hasProperty(scope)" class="m-2 multiple-el-descriptions">
      <el-descriptions column="2" border>
        <el-descriptions-item :label="lang('Plant')">{{ scope.plant }}</el-descriptions-item>
        <el-descriptions-item :label="lang('Device')">{{ scope.device }}</el-descriptions-item>
        <el-descriptions-item :label="lang('Stage')">{{ scope.stage }}</el-descriptions-item>
        <el-descriptions-item :label="lang('Tester')">{{ scope.tester }}</el-descriptions-item>
        <el-descriptions-item :label="lang('Customer')">{{ scope.customer }}</el-descriptions-item>
        <el-descriptions-item :label="lang('Equipment')">{{ scope.equipment }}</el-descriptions-item>
        <el-descriptions-item :label="lang('System')">{{ scope.system }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions column="1" border>
        <el-descriptions-item :label="lang('Purpose')">{{ scope.purpose }}</el-descriptions-item>
        <el-descriptions-item :label="lang('Attached files')">
          <span v-if="attachFiles.length === 0" class="ce-gray-color-italic">{{ lang('There is no file attached') }}</span>
          <span v-else>
            <div v-for="(attached, index) in attachFiles" :key="index" class="attachFiles-container">
              <a
                class="ce-link"
                :href="prePath + attached.filename"
                :download="ITNo + '_attachment_' + attached.originalname"
                target="_blank"
              >
                <div class="inline-flex">
                  <File class="mr-1" />
                  {{ attached.originalname }}
                </div>
                <div v-if="imgExt.indexOf(attached.ext.toLowerCase()) !== -1">
                  <img :src="`${prePath}/${attached.filename}`" />
                </div>
              </a>
            </div>
          </span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-collapse-item>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
import { useITReqStore } from '@/store/ITRequest'
import { hasProperty } from '@/hooks/useValidate'
import { File } from '@/icons/common/'
const store = useITReqStore()
const ITNo = store.getITNo
const prePath = `${import.meta.env.VITE_APP_BASE_URL}/files/attachment/`
const imgExt = ['jpg', 'jpeg', 'gif', 'png', 'svg']
const scope = ref({})
const attachFiles = reactive([])

onMounted(() => scope.value = store.getScope)
watch(scope, (newVal, oldVal) => {
  if (hasProperty(scope.value)) {
    for (const [key, val] of Object.entries(scope.value.attachFiles)) {
      let newAttached = {
        originalname: val.originalname,
        filename: val.filename
      }
      //get file extension
      let extension = newAttached.originalname.split('.').slice(-1)[0]
      newAttached.ext = extension
      attachFiles.push(newAttached)
    }
  }
})
</script>
<style scoped lang="scss">
a {
  width: 100%;
  line-height: 24px;
}

.attachFiles-container {
  margin-bottom: 0.25rem;
  img {
    width: 350px;
    height: auto;
  }
  img:hover {
    width: 600px;
    height: auto;
  }
}
</style>
