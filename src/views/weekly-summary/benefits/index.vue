<template>
  <div class="mb-5">
    <!-- title -->
    <TopTitle>
      <template #title>{{ lang('Benefit weekly report') }}</template>
    </TopTitle>
    <div class="ce-main-container">
      <!-- toolbar -->
      <div class="ce-toolbar">
        <span></span>
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
        <BenefitTable
          :resource="resource"
          :load-all="isAll"
          :loading="loading"
        />
        <BarChart
          v-if="resource.length"
          :resource="resource"
          class="pt-4"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { LoadAll, TopTitle } from '@/components'
import { getWeeklyBenefitSummary } from '@/api/summary'
import { lang } from '@/hooks/useCommon'
import { BenefitTable, BarChart, ExportXlsx } from './components'
const resource = ref([])
const loading = ref(false)
const isAll = ref(false)
const getIsAll = (isAllFromChild) => {
  loading.value = true
  isAll.value = isAllFromChild
  setTimeout(() => loading.value = false, 1500)
}
onMounted(async () => {
  loading.value = true
  setTimeout(async () => {
    await getWeeklyBenefitSummary()
      .then((res) => {
        switch (res.code) {
          case 200: {
            res.data.forEach(doc => {
              const { year, week, staffExp, testerExp, qualityExp, staffAct, testerAct, qualityAct } = doc
              const simpleWeek = `W${week.substring(4)}`
              resource.value.push({
                fullWeek: `${year} ${simpleWeek}`,
                simpleWeek,
                staffExp: Math.round(staffExp),
                testerExp: Math.round(testerExp),
                qualityExp,
                staffAct: Math.round(staffAct),
                testerAct: Math.round(testerAct),
                qualityAct,
              })
            })
            //for debugging
            // console.log(resource.value)
            break
          }
          default: break
        }
        loading.value = false
      })
  }, 1500)
})
</script>
