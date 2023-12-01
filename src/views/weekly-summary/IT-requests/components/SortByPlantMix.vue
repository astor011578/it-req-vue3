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
      <vxe-column field="week_simple" :title="lang('Week')" />
      <vxe-column field="total" :title="lang('Total')" />
      <vxe-colgroup title="Reviewing">
        <vxe-column field="T1_reviewing" title="T1" />
        <vxe-column field="T3_reviewing" title="T3" />
        <vxe-column field="T6_reviewing" title="T6" />
      </vxe-colgroup>
      <vxe-colgroup title="Proceeding">
        <vxe-column field="T1_prcd" title="T1" />
        <vxe-column field="T3_prcd" title="T3" />
        <vxe-column field="T6_prcd" title="T6" />
      </vxe-colgroup>
      <vxe-colgroup title="Done">
        <vxe-column field="T1_done" title="T1" />
        <vxe-column field="T3_done" title="T3" />
        <vxe-column field="T6_done" title="T6" />
      </vxe-colgroup>
      <vxe-colgroup title="Cancel">
        <vxe-column field="T1_cancel" title="T1" />
        <vxe-column field="T3_cancel" title="T3" />
        <vxe-column field="T6_cancel" title="T6" />
      </vxe-colgroup>
      <vxe-colgroup title="Delay">
        <vxe-column field="T1_delay" title="T1" />
        <vxe-column field="T3_delay" title="T3" />
        <vxe-column field="T6_delay" title="T6" />
      </vxe-colgroup>
      <vxe-colgroup title="Rejected">
        <vxe-column field="T1_rejected" title="T1" />
        <vxe-column field="T3_rejected" title="T3" />
        <vxe-column field="T6_rejected" title="T6" />
      </vxe-colgroup>
    </vxe-table>
  </div>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
const props = defineProps({
  resource: { type: Array, required: true },
  loadAll: Boolean,
  loading: Boolean
})

let allData = reactive([])      //all data
let filterData = reactive([])   //last 10 data
//get allData & filterData
if (props.resource) {
  allData = Object.assign([], props.resource)
  let startIdx = allData.length > 10 ? allData.length - 10 : 0
  for (let i = startIdx; i < allData.length; i++) {
    filterData.push(allData[i])
  }
}

/**
 * @description tooltips config
 */
const tipForWeek = {
  showAll: true,
  enterable: true,
  contentMethod: ({ type, column, row, items, _columnIndex }) => {
    const { field } = column
    if (field === 'week_simple') {
      if (type !== 'header' && type !== 'footer') {
        return `${row['week_full'].toString().slice(0, 4)} ${row['week_simple']}`
      }
    }
    return null
  }
}

/**
 * @description highlighting cells
 */
const highlightCell = ({ row, column }) => {
  if (
    (column.field === 'T1_done' && row.T1_done > 0) ||
    (column.field === 'T3_done' && row.T3_done > 0) ||
    (column.field === 'T6_done' && row.T6_done > 0)
  ) {
    return 'ce-highlight'
  }

  if (
    (column.field === 'T1_cancel' && row.T1_cancel > 0) ||
    (column.field === 'T3_cancel' && row.T3_cancel > 0) ||
    (column.field === 'T6_cancel' && row.T6_cancel > 0)
  ) {
    return 'ce-lowlight'
  }

  if (
    (column.field === 'T1_delay' && row.T1_delay > 0) ||
    (column.field === 'T3_delay' && row.T3_delay > 0) ||
    (column.field === 'T6_delay' && row.T6_delay > 0)
  ) {
    return 'ce-lowlight'
  }

  if (
    (column.field === 'T1_rejected' && row.T1_rejected > 0) ||
    (column.field === 'T3_rejected' && row.T3_rejected > 0) ||
    (column.field === 'T6_rejected' && row.T6_rejected > 0)
  ) {
    return 'ce-lowlight'
  }

  return ''
}
</script>
