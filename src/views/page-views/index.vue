<template>
  <div class="mb-5">
    <!-- title -->
    <TopTitle>
      <template #title>{{ lang(title) }}</template>
    </TopTitle>
    <div class="ce-main-container">
      <!-- toolbar -->
      <div class="ce-toolbar">
        <SelectViews :selected="selected" @get-children="getSelected" />
        <span>
          <span class="mr-4">
            <LoadAll
              :is-all="loadAll"
              :loading="loading"
              @get-is-all="getLoadAll"
            />
          </span>
          <ExportViews
            :daily="getDaily(rawData)"
            :weekly="getWeekly(rawData)"
            :monthly="getMonthly(rawData)"
          />
        </span>
      </div>
      <!-- contents -->
      <ViewsTable
        v-if="tableData.length"
        :data="loadAll ? tableData : getRecently(tableData)"
        :load-all="loadAll"
        :selected="selected"
        :loading="loading"
      />
    </div>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import { LoadAll, TopTitle } from '@/components'
import { getAllViews } from '@/api/summary'
import { lang } from '@/hooks/useCommon'
import { ViewsTable, SelectViews, ExportViews } from './components'
const title = ref('Daily views report')   //綁定 title 的值
const selected = ref('daily')             //綁定選單選中的值
const rawData = ref([])     //從服務端獲取的初始資料
const tableData = ref([])   //要傳給子組件 ViewsTable.vue 的資料
const loadAll = ref(false)
const loading = ref(false)

const getDaily = async (rawData) => {
  const dailyData = []
  for await (const doc of rawData) {
    const { number, total } = doc
    const year = doc.date.substring(0, 4)
    const date = doc.date.substring(5)
    dailyData.push({ number, year, date, total })
  }
  return dailyData
}

const getWeekly = async (rawData) => {
  //先取得所有 week 的值
  const temps = rawData.map((item) => { return item.week })
  //再剔除重複的 week values
  const weeks = temps.filter((item, idx, arr) => { return arr.indexOf(item) === idx })
  const weeklyData = []
  let _number = 0
  //將值存於 weeklyData 陣列中
  for await (const week of weeks) {
    let _total = 0
    for await (const doc of rawData) {
      if (doc.week === week) _total += doc.total
    }
    weeklyData.push({
      number: ++_number,
      year: week.substring(0, 4),
      week: week.substring(4),
      total: _total
    })
  }

  return weeklyData
}

const getMonthly = async (rawData) => {
  const temps = rawData.map((val) => { return val.date.substring(0, 7) })
  const months = temps.filter((val, idx, arr) => { return arr.indexOf(val) === idx })
  const monthlyData = []
  let _number = 0
  for await (const month of months) {
    let _total = 0
    for await (const doc of rawData) {
      if (doc.date.substring(0, 7) === month) _total += doc.total
    }
    monthlyData.push({
      number: ++_number,
      year: month.substring(0, 4),
      month: month.substring(5),
      total: _total
    })
  }
  return monthlyData
}

//取得近 20 筆資料
const getRecently = async (data) => {
  if (data.length <= 20) {
    return data
  } else {
    const recentData = []
    for await (const [idx, doc] of Object.entries(data)) {
      const index = Number.parseInt(idx)
      if (index + 1 > data.length - 20) recentData.push(doc)
    }
    return recentData
  }
}

//向服務端請求獲取資料
onMounted(async () => {
  loading.value = true
  try {
    const res = await getAllViews()
    rawData.value = Object.assign([], res.data)
    tableData.value = await getDaily(rawData.value)
    setTimeout(() => loading.value = false, 1000)
  } catch (error) {
    console.error(error)
    ElMessage.error(lang('Failed to get page views data'))
  }
})

//get selected value from chidren component (SelectViews.vue)
const getSelected = async (_selected) => {
  selected.value = _selected
  loading.value = true
  switch (selected.value) {
    case 'daily': {
      tableData.value = await getDaily(rawData.value)
      title.value = 'Daily views report'
      break
    }
    case 'weekly': {
      tableData.value = await getWeekly(rawData.value)
      title.value = 'Weekly views report'
      break
    }
    case 'monthly': {
      tableData.value = await getMonthly(rawData.value)
      title.value = 'Monthly views report'
      break
    }
    case 'annual': {
      title.value = 'Annual views report'
      break
    }
  }
  setTimeout(() => loading.value = false, 1000)
}

//get loadAll value from children component (LoadAll.vue)
const getLoadAll = (_loadAll) => {
  loading.value = true
  setInterval(() => loading.value = false, 2000)
  loadAll.value = _loadAll
}
</script>
