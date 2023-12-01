<template>
  <!-- evidence block -->
  <el-collapse-item name="6">
    <template #title>
      <div class="detail-collapse">
        <font-awesome-icon icon="fa-solid fa-thumbtack" />
        {{ lang('Evidence') }}
      </div>
    </template>
    <div v-if="hasProperty(evidence)">
      <el-descriptions
        v-for="(val, key) in evidence"
        :key="key"
        column="1"
        border
      >
        <template #title>
          <div>
            <font-awesome-icon icon="fa-solid fa-paperclip" />
            {{ val.title }}
          </div>
        </template>
        <el-descriptions-item :label="lang('Status')">
          <el-tag v-if="val.state === 'Approved'" type="primary">
            {{ lang('Approved') }}
          </el-tag>
          <span v-else :class="val.class">
            {{ lang(val.state) }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item v-if="val.upload_reply[1] === 'Reject'" :label="lang('Rejection message')" >
          <span v-if="val.upload_reply[2] === ''" class="ce-gray-color-italic">
            {{ lang('There is no comments') }}
          </span>
          <span v-else>
            {{ val.upload_reply[2] }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item v-if="val.upload_files.length" :label="lang('Last update date')">
          {{ val.upload_date }}
        </el-descriptions-item>
        <el-descriptions-item v-if="val.upload_files.length" :label="lang('Evidence')">
          <div
            v-for="(valInFiles, idxInFiles) in val.upload_files"
            :key="idxInFiles"
            class="evidence-container"
          >
            <a
              class="ce-link"
              :href="`${prePath}/${key}/${valInFiles.filename}`"
              :download="valInFiles.originalname"
              target="_blank"
            >
              <div>
                <File class="mr-1" />
                {{ valInFiles.originalname }}
              </div>
              <div v-if="imgExt.indexOf(valInFiles.ext.toLowerCase()) !== -1">
                <img :src="`${prePath}/${key}/${valInFiles.filename}`" />
              </div>
            </a>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-collapse-item>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
import { hasProperty } from '@/hooks/useValidate'
import { useITReqStore } from '@/store/ITRequest'
import { File } from '@/icons/common/'
const store = useITReqStore()
const ITno = store.getITNo
const evidence = ref({})
const prePath = `${import.meta.env.VITE_APP_BASE_URL}/files/${ITno}`
const imgExt = ['jpg', 'jpeg', 'gif', 'png', 'svg']

onMounted(() => {
  const _evidence = store.getEvidence
  for (const [key, val] of Object.entries(_evidence)) {
    if (key === 'release' || key === 'monitor') if (!_evidence[key]) break
    evidence.value[key] = val
    //get file extension
    if (val.upload_files.length) {
      evidence.value[key].upload_files.forEach((file, index) => {
        let extension = file.originalname.split('.').slice(-1)[0]
        evidence.value[key].upload_files[index].ext = extension
      })
    }

    //get state value
    if (!val.upload_reply.length) {
      evidence.value[key].state = 'Not uploaded yet'
      evidence.value[key].class = 'ce-gray-color-italic'
    } else {
      switch (val.upload_reply[1]) {
        case 'Pending': {
          evidence.value[key].state = 'Pending approval'
          evidence.value[key].class = 'ce-gray-color-italic'
          break
        }
        case 'Reject': {
          evidence.value[key].state = 'Rejected, re-uploading'
          evidence.value[key].class = 'ce-gray-color-italic'
          break
        }
        case 'Approve': {
          evidence.value[key].state = 'Approved'
          break
        }
      }
    }

    //get title value
    switch (key) {
      case 'UAT1': evidence.value[key].title = 'Test-IT buyoff (UAT1)'; break;
      case 'UAT2': evidence.value[key].title = 'User buyoff (UAT2)'; break;
      case 'release': evidence.value[key].title = 'Release'; break;
      case 'monitor': evidence.value[key].title = 'Monitor 1 lot'; break;
    }
  }
})
</script>
<style lang="scss" scoped>
$subtitle-color: var(--cyan-darken-4);

.evidence-container:not(:last-child) {
  margin-bottom: 0.25rem;
}

img {
  width: 350px;
  height: auto;
}
img:hover {
  width: 600px;
  height: auto;
}

a {
  width: 100%;
  line-height: 24px;
  > :first-child {
    display: inline-flex !important;
    line-height: 24px;
  }
}

:deep(.el-descriptions) {
  margin-bottom: 28px;
  //描述列表 header (迴紋針 icon + 標題)
  .el-descriptions__header {
    padding: 0.675rem 0.5rem;
    margin-bottom: 0;
    line-height: 14px;
    .el-descriptions__title {
      color: $subtitle-color;
    }
  }
}
</style>
