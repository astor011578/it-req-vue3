<template>
  <div>
    <vxe-table
      size="mini"
      height="340"
      border
      align="center"
      show-header-overflow
      show-overflow
      :row-config="{ isHover: true }"
      :cell-class-name="highlightCell"
      :tooltip-config="tipForWeek"
      :data="props.loadAll ? allData : filterData"
      :loading="props.loading"
      :loading-config="{ text: `${lang('Loading')}...` }"
      :empty-render="{ name: 'NoData' }"
    >
      <vxe-column field="simpleWeek" :title="lang('Week')" />
      <vxe-colgroup :title="`${lang('Save staff time')} (hr / month)`">
        <vxe-column field="staffExp" :title="lang('Expect')" />
        <vxe-column field="staffAct" :title="lang('Actual')" />
      </vxe-colgroup>
      <vxe-colgroup :title="`${lang('Save tester time')} (hr / month)`">
        <vxe-column field="testerExp" :title="lang('Expect')" />
        <vxe-column field="testerAct" :title="lang('Actual')" />
      </vxe-colgroup>
      <vxe-colgroup :title="lang('Quality case')">
        <vxe-column field="qualityExp" :title="lang('Expect')" />
        <vxe-column field="qualityAct" :title="lang('Actual')" />
      </vxe-colgroup>
    </vxe-table>
  </div>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
const props = defineProps({
  resource: {
    type: Array,
    require: true,
    default: () => { return [] }
  },
  loadAll: Boolean,
  loading: Boolean
})
const allData = ref([])
const filterData = ref([])
watch(props, (val) => {
  //重置 allData, filterData 的值
  allData.value = Object.assign([], [])
  filterData.value = Object.assign([], [])
  allData.value = Object.assign([], props.resource)
  const totalCount = allData.value.length
  const indexFilterFrom = totalCount <= 10 ? 0 : totalCount - 10
  for (let i = indexFilterFrom; i < totalCount; i++) {
    filterData.value.push(allData.value[i])
  }
})

/**
 * @description tooltips config
 */
 const tipForWeek = {
  showAll: true,
  enterable: true,
  contentMethod: ({ type, column, row, items, _columnIndex }) => {
    const { field } = column
    if (field === 'simpleWeek') {
      if (type !== 'header' && type !== 'footer') return row['fullWeek']
    }
    return null
  }
}

/**
 * @description highlighting cells
 */
 const highlightCell = ({ row, column }) => {
  if (
    (column.field === 'staffAct' && row.staffAct > 0) ||
    (column.field === 'testerAct' && row.testerAct > 0) ||
    (column.field === 'qualityAct' && row.qualityAct > 0)
  ) {
    return 'ce-highlight'
  }
  return ''
}
</script>