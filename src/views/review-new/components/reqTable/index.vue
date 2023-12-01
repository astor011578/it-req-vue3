<template>
  <div>
    <span class="ce-title-lg">
      {{ lang('Request table') }}
    </span>
    <div class="mt-3 mb-8">
      <el-form-item
        v-for="(value, key) in formInputs"
        :key="key"
        :label="lang(value.label)"
      >
        <el-row class="form-row-width">
          <el-col :span="12">
            <el-input
              v-model="reqTable[key]"
              :type="value.type"
              :rows="value.rows"
              disabled
            />
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 上傳附件 -->
      <el-form-item :label="lang('Attached files')">
        <span v-if="attachFiles">
          <span v-if="!attachFiles.length" class="ce-gray-color-italic">
            {{ lang('There is no file attached') }}
          </span>
          <div
            v-for="(file, index) in attachFiles"
            :key="index"
            class="attachFiles-container"
          >
            <a
              class="ce-link"
              :href="prePath + file.filename"
              :download="ITno + '_attachment_' + file.originalname"
              target="_blank"
            >
              <div class="inline-flex">
                <File class="mr-1" />
                {{ file.originalname }}
              </div>
              <div v-if="imgExt.indexOf(file.ext.toLowerCase()) !== -1">
                <img :src="`${prePath}/${file.filename}`" />
              </div>
            </a>
          </div>
        </span>
      </el-form-item>
    </div>
  </div>
</template>

<script setup>
import { File } from '@/icons/common/'
import { lang } from '@/hooks/useCommon'
import { useITReqStore } from '@/store/ITRequest'
const store = useITReqStore()
const ITno = useRoute().params.ITno
const formInputs = {
  reqName: { label: 'Request name', type: 'textarea', rows: '1'},
  stage: { label: 'Stage' },
  customer: { label: 'Customer' },
  device: { label: 'Device' },
  tester: { label: 'Tester' },
  equipment: { label: 'Equipment' },
  system: { label: 'System' },
  purpose: { label: 'Purpose', type: 'textarea', rows: '3' },
  plant: { label: 'Plant' }
}

const prePath = `${import.meta.env.VITE_APP_BASE_URL}/files/attachment/`
const imgExt = ['jpg', 'jpeg', 'gif', 'png', 'svg']
const reqTable = ref({})
const attachFiles = computed(() => {
  const scopes = store.getScope
  const result = scopes.attachFiles?.map(val => {
    const ext = val.originalname.split('.').slice(-1)[0]
    const newItem = { ...val, ext }
    return newItem
  })
  return result
})

onMounted(async () => {
  const { reqName } = store.getBasicInfo
  const scopes = store.getScope
  for await (const key of Object.keys(formInputs)) {
    reqTable.value[key] = key === 'reqName' ? reqName : scopes[key]
  }
})
</script>
<style lang="scss" scoped>
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