<template>
  <span id="upload-container" :class="size">
    <el-upload
      drag
      multiple
      action="#"
      :file-list="fileList"
      :auto-upload="false"
      :on-change="uploadChange"
      :on-remove="uploadRemove"
      :class="disabled ? 'is-disabled' : ''"
      :disabled="disabled"
    >
      <Loading v-if="loading" class="el-icon--upload" :auto-height="true" />
      <UploadCloud v-else class="el-icon--upload" />
      <div class="el-upload__text">
        {{ lang('Drop your files here, or') }}
        <em>{{ lang('click to select files') }}</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          {{ lang('Total file size should be less than 10MB') }}
        </div>
      </template>
    </el-upload>
    <div id="upload-submitBtn" class="ce-dialog-footer-btn">
      <el-button
        :class="uploadList.length && !disabled ? 'alerting' : ''"
        type="primary"
        :plain="plain"
        :loading="loading"
        :disabled="disabled"
        @click="uploadFile"
      >
        {{ lang('Upload to server') }}
      </el-button>
    </div>
  </span>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { lang } from '@/hooks/useCommon'
import { UploadCloud, Loading } from '@/icons/common'
const ITno = useRoute().params.ITno
let loading = ref(false)
let size = ref('')
let plain = ref(true)
let disabled = ref(false)
let alerting = ref('')

//Props & Emits
const props = defineProps({
  size: {
    type: String,
    required: true
  },
  plain: {
    type: Boolean
  },
  uploadTo: {
    type: String,
    required: true
  },
  step: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['get-children'])

if (props.size) {
  size.value = props.size
  if (props.size === 'large') plain.value = false
}

//http-request url
let reqUrl = ref('')
if (props.uploadTo) {
  switch (props.uploadTo) {
    case 'attachment': {
      reqUrl.value = '/upload/attachment'
      break
    }
    case 'evidence': {
      reqUrl.value = `/upload/evidence?IT_no=${ITno}&step=${props.step}`
      break
    }
  }
}

//判斷重複檔案名稱, 以及第一步的檔案預覽
let fileList = ref([])
//要上傳的檔案
let uploadList = ref([])
//要傳回給父組件的內容
let emitList = ref([])
//upload on-change handler
const uploadChange = (file, files) => {
  if (files.length) {
    let extArr = []
    let totalSize = 0
    const sizeLimit = 1024 * 1024 * 10
    for (const [key, val] of Object.entries(files)) {
      extArr.push(val.name.replace(/.+\./, '')) //get file's extension
      totalSize += val.size                     //get total file size
    }

    //check illegal extension
    for (const item of extArr) {
      let isLegalExt = ['exe', 'iso', 'zip', 'gzip', '7z', 'rar', 'tar', 'wim'].indexOf(item.toLowerCase()) === -1
      if (isLegalExt === false) {
        ElMessage.error(lang("It doesn't allow to attach .EXE or .ISO or compressed files"))
        while (files.length) files.pop()
        while (extArr.length) extArr.pop()
        while (fileList.value.length) fileList.value.pop()
        while (uploadList.value.length) uploadList.value.pop()
        while (emitList.value.length) emitList.value.pop()
        return false
      }
    }

    //check illegal total file size
    if (totalSize > sizeLimit) {
      ElMessage.error(lang('Total file size should be less than 10MB'))
      while (files.length) files.pop()
      while (extArr.length) extArr.pop()
      while (fileList.value.length) fileList.value.pop()
      while (uploadList.value.length) uploadList.value.pop()
      while (emitList.value.length) emitList.value.pop()
      return false
    } else {
      fileList.value = JSON.parse(JSON.stringify(files))
      uploadList.value.push(file)
    }
  }
}

//upload on-remove handler
const uploadRemove = (file, files) => {
  fileList.value = JSON.parse(JSON.stringify(files))
  uploadList.value.forEach((item, index) => {
    if (item.name === file.name) uploadList.value.splice(index, 1)
  })
  console.log(file)
  console.log(files)
}

if (uploadList.value.length) alerting.value = 'alerting'

//upload send http request
const uploadFile = () => {
  const content = 'Are you sure to upload? This action cannot be undone'
  ElMessageBox.confirm(lang(content), 'Warning', {
    confirmButtonText: lang('OK'),
    cancelButtonText: lang('Cancel'),
    type: 'warning'
  })
    .then(() => {
      loading.value = true
      while (emitList.value.length) emitList.value.pop()
      let formData = new FormData()
      uploadList.value.forEach((item, index) => formData.append('files', item.raw))

      axiosReq({
        url: reqUrl.value,
        method: 'post',
        timeout: 30000,
        data: formData,
        isUploadFile: true
      }).then((res) => {
        setTimeout(() => {
          loading.value = false
          switch (res.code) {
            case 200: {
              if (res.data) {
                res.data.forEach((doc) => {
                  emitList.value.push({
                    path: doc.path,
                    filename: doc.filename,
                    originalname: doc.originalname
                  })
                })
                emits('get-children', emitList.value)
                disabled.value = true
                ElMessage.success(lang('Upload to server successfully'))
                while (uploadList.value.length) uploadList.value.pop()
              } else {
                ElMessage.warning(lang('No files selected'))
              }
              break
            }
            default: {
              ElMessage.error(lang('Failed to upload files'))
              while (fileList.value.length) fileList.value.pop()
              while (uploadList.value.length) uploadList.value.pop()
              while (emitList.value.length) emitList.value.pop()
              break
            }
          }
        }, 2000)
      })
    })
    .catch(() => ElMessage.info(lang('Action cancelled')))
}
</script>
<style lang="scss">
#upload-container.large {
  width: 350px;
  display: block;
  margin: 0 auto;

  .el-icon--upload {
    font-size: 75px;

    svg {
      width: 75px;
    }
  }

  .el-upload__tip {
    text-align: center;
    margin-bottom: 0.75rem;
  }

  .el-upload-dragger {
    padding: 10px 5px !important;
  }

  #upload-submitBtn {
    text-align: center;
    padding-top: 0.5rem;
  }
}

#upload-container.small {
  display: block;

  .el-upload-dragger {
    display: inline-flex;
    height: calc(45px + 0.5rem * 2);
    padding: 0.5rem 0.75rem;

    .el-icon--upload {
      position: absolute;
      font-size: 35px;

      svg {
        width: 35px;
      }
    }

    .el-upload__text {
      margin-left: 45px;
      font-size: 12px;
      line-height: 45px;
    }
  }

  .el-upload__tip {
    margin-left: 0.5rem;
    text-align: left;
  }

  #upload-submitBtn {
    text-align: left;
    margin-left: 0.5rem;
  }
}

#upload-container {
  ul {
    padding-left: 0 !important;
  }

  .is-disabled .el-upload-dragger {
    cursor: not-allowed;
  }

  .el-upload-list__item-file-name {
    white-space: nowrap;
  }

  .el-upload__tip {
    color: var(--el-color-info);
  }

  #upload-submitBtn {
    width: 100%;
  }

  .el-button.alerting {
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-name: alerting;

    @keyframes alerting {
      10%,
      90% {
        transform: scale(1, 1);
      }
      50% {
        transform: scale(1.1, 1.1);
      }
    }
  }
}
</style>