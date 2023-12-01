<template>
  <div class="mb-5">
    <!-- title -->
    <TopTitle>
      <template #title>IT-Request {{ lang('weekly report') }}</template>
    </TopTitle>
    <div class="ce-main-container">
      <!-- toolbar -->
      <div class="ce-toolbar">
        <span>
          <strong class="mr-2">{{ lang('Switch status') }}:</strong>
          <SelectMenu
            :options="options"
            :selected="selected"
            @get-selected-option="getSelectedOption"
          />
        </span>
        <span>
          <span class="mr-4">
            <LoadAll
              :is-all="isAll"
              :loading="loading"
              @get-is-all="getIsAll"
            />
          </span>
          <ExportXlsx v-if="resource.length" :resource="resource" />
        </span>
      </div>
      <!-- contents -->
      <div>
        <SortByType
          v-if="typeSum.length && selected === '#1'"
          :resource="typeSum"
          :loading="loading"
          :load-all="isAll"
          @get-children="getTableInfo"
        />
        <SortByPlant
          v-if="siteSum.length && selected === '#2'"
          :resource="siteSum"
          :loading="loading"
          :load-all="isAll"
        />
        <SortByPlantMix
          v-if="siteSum.length && selected === '#3'"
          :resource="siteSum"
          :loading="loading"
          :load-all="isAll"
        />
        <BarChart
          v-if="typeSum.length"
          :resource="typeSum"
          class="pt-4"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { LoadAll, SelectMenu, TopTitle } from '@/components'
import { getTimestamp } from '@/hooks/useDate'
import { lang } from '@/hooks/useCommon'
import { SortByType, SortByPlant, SortByPlantMix, BarChart, ExportXlsx } from './components'
const selected = ref('#1')    //連動目前 select menu 中被選取的 option
const isAll = ref(false)      //是否要讀取所有資料
const getIsAll = (isAllFromChild) => isAll.value = isAllFromChild
//選單裡面的選項
const options = reactive([
  { value: '#1', label: 'Status & type' },
  { value: '#2', label: 'Plant & status (grouped)' },
  { value: '#3', label: 'Plant & status (ungrouped)' }
])
const getSelectedOption = (selectedFromChild) => selected.value = selectedFromChild
//如果 selected 值發生改變, 啟動 loading
const loading = ref(false)
watch(selected, async (val) => {
  loading.value = true
  setTimeout(() => loading.value = false, 1000)
})

//表格與圖表的資料
const resource = ref([])        //raw data, 同時也是 ExportXlsx 組件的 data
const typeSum = reactive([])    //第一個表格的 data
const siteSum = reactive([])    //第二個與第三個表格的 data

onMounted(() => {
  axiosReq({
    method: 'get',
    url: `/summary/requests/${getTimestamp()}`
  }).then((res) => {
    switch (res.code) {
      case 200: {
        resource.value = Object.assign([], res.data)
        resource.value.forEach((doc) => {
          typeSum.push({
            week_full: doc.week,
            week_simple: 'W' + doc.week.toString().slice(4),
            total: doc.total,
            reviewing: doc.reviewing,
            prcd: doc.prcd,
            done: doc.done,
            cancel: doc.cancel,
            delay: doc.delay,
            rejected: doc.rejected,
            oneTime: doc.oneTime,
            project: doc.project
          })

          siteSum.push({
            week_full: doc.week,
            week_simple: 'W' + doc.week.toString().slice(4),
            total: doc.total,
            T1_owner: doc.T1.owner,
            T3_owner: doc.T3.owner,
            T6_owner: doc.T6.owner,
            T1_total: doc.T1.total,
            T3_total: doc.T3.total,
            T6_total: doc.T6.total,
            T1_reviewing: doc.T1.reviewing,
            T3_reviewing: doc.T3.reviewing,
            T6_reviewing: doc.T6.reviewing,
            T1_prcd: doc.T1.prcd,
            T3_prcd: doc.T3.prcd,
            T6_prcd: doc.T6.prcd,
            T1_done: doc.T1.done,
            T3_done: doc.T3.done,
            T6_done: doc.T6.done,
            T1_cancel: doc.T1.cancel,
            T3_cancel: doc.T3.cancel,
            T6_cancel: doc.T6.cancel,
            T1_delay: doc.T1.delay,
            T3_delay: doc.T3.delay,
            T6_delay: doc.T6.delay,
            T1_rejected: doc.T1.rejected,
            T3_rejected: doc.T3.rejected,
            T6_rejected: doc.T6.rejected
          })
        })
        break
      }
      default: break
    }
  })
})
</script>