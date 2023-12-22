<template>
  <el-form-item :label="lang('Saving time')">
    <el-row class="form-row-width">
      <el-col :span="12">
        <ul id="saving-time">
          <li v-for="(value, key) in formInputs" :key="key">
            <span class="saving-time-title">{{ lang(value.title) }}</span>
            <div class="saving-time-content">
              <el-input
                v-model="savingTimes[key]"
                class="w-100px"
                disabled
              />
              <div>(hr / day)</div>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-form-item>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
import { useITReqStore } from '@/store/IT-request'
const store = useITReqStore()
//綁定 el-input-number 的數值
const savingTimes = ref({
  tester: 0,
  onlineStaff: 0,
  offlineStaff: 0
})
//渲染輸入項用
const formInputs = {
  tester: { title: 'Tester time' },
  onlineStaff: { title: 'Online staff time' },
  offlineStaff: { title: 'Offline staff time' }
}

onMounted(async () => {
  const { offlineSavingExp, onlineSavingExp, testerSavingExp } = store.getBenefit
  savingTimes.value.tester = testerSavingExp
  savingTimes.value.onlineStaff = onlineSavingExp
  savingTimes.value.offlineStaff = offlineSavingExp
})
</script>

<style scoped lang="scss">
#saving-time {
  list-style: none;
  padding-left: 0;

  li {
    display: inline-flex;
    height: 32px;
    line-height: 32px;

    .saving-time-title {
      width: 100px;
      padding-right: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .saving-time-content {
      width: calc(100% - 100px);
      display: inline-flex;
      :deep(.el-input) {
        width: 50px;
        * {
          text-align: center;
        }
      }
      > div:last-child {
        padding-left: 0.5rem;
        width: 58px;
      }
    }
  }
}
</style>
