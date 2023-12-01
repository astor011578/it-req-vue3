<template>
  <div>
    <div class="register-container">
      <div class="register-title">{{ lang('User ID') }}: </div>
      <div class="register-input">
        <el-input v-model="userInfo.userID" disabled />
      </div>
    </div>
    <div class="register-container">
      <div class="register-title">{{ lang('User name') }}: </div>
      <div class="register-input">
        <el-input v-model="userInfo.userName" :placeholder="`${lang('Please input')}...`" @keyup="updateValue" />
      </div>
    </div>
    <div class="register-container">
      <div class="register-title">{{ lang('Manager') }}: </div>
      <div class="register-input">
        <el-input v-model="userInfo.mgrName" disabled :placeholder="`${lang('Please select')}...`" />
        <SearchUser :only-programmers="false" @get-user-info="getUserInfo" />
      </div>
    </div>
    <div class="register-container">
      <div class="register-title">{{ lang('E-mail') }}: </div>
      <div class="register-input">
        <el-input v-model="userInfo.eMail" :placeholder="`${lang('Please input')}...`" @keyup="updateValue">
          <template #append>@amkor.com</template>
        </el-input>
      </div>
    </div>
    <div class="register-container">
      <div class="ce-red-color text-center w-100 mt-2">
        {{ props.validate }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
import SearchUser from '@/components/SearchUser.vue'
const emits = defineEmits([ 'update:modelValue' ])
const props = defineProps({
  modelValue: { type: Object, default: () => {} },
  validate: { type: String, default: () => '' }
})

const userInfo = ref({
  userID: '',
  userName: '',
  mgrID: '',
  mgrName: '',
  eMail: ''
})
onMounted(() => userInfo.value.userID = props.modelValue.userID)
const updateValue = () => emits('update:modelValue', userInfo.value)

function getUserInfo($userInfo) {
  const { id, name } = $userInfo
  userInfo.value.mgrID = id
  userInfo.value.mgrName = name
  updateValue()
}
</script>
<style lang="scss" scoped>
.register-container {
  display: inline-flex;
  width: 100%;
  align-items: center;
  margin: 6px 0;
}
.register-title {
  width: 80px;
  text-align: right;
  margin-right: 10px;
}
.register-input {
  display: inline-flex;
  width: calc(100% - 80px - 20px);
  margin-right: 20px;
}
</style>