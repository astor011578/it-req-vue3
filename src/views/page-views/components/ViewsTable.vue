<template>
  <div v-if="tableData" class="views-table-container">
    <vxe-table
      ref="tableRef"
      :data="tableData"
      :loading="props.loading"
      border
      resizable
      size="mini"
      height="100%"
      header-align="center"
      align="center"
      show-overflow
      show-header-overflow
      :row-config="{ isHover: true }"
      :show-footer="true"
      :footer-row-class-name="footerRowStyling"
      :footer-cell-class-name="footerCellStyling"
      :footer-method="renderFooter"
      :footer-span-method="spanFooter"
    >
      <vxe-column
        v-for="config in colConfig"
        :key="config.key"
        :field="config.field"
        :title="lang(config.title)"
        :width="config.width"
        :sortable="config.sortable"
      />
    </vxe-table>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app'
import { lang } from '@/hooks/useCommon'
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  loadAll: {
    type: Boolean,
    required: true
  },
  selected: {
    type: String,
    required: true,
    default: () => {
      return 'daily'
    }
  },
  loading: {
    type: Boolean,
    required: true,
    default: () => {
      return false
    }
  }
})
const tableData = ref([])
const tableRef = ref(null)
const footerRows = ref([[], []])
const colConfig = ref([
  { key: 1, field: 'number', title:'#', width: '22%', sortable: true },
  { key: 2, field: 'year', title: 'Year', width: '20%' },
  { key: 3, field: 'date', title: 'Date', width: '20%' },
  { key: 4, field: 'total', title: 'Total views', width: '38%' }
])

//handle the row class name of footer
const footerRowStyling = () => { return 'footer-row-style' }
//handle the cell class name of footer
const footerCellStyling = ({ $rowIndex, $columnIndex }) => { return 'footer-cell' }
//handle the cells span in footer
const spanFooter = ({ $rowIndex, $columnIndex }) => {
  if ($rowIndex === 0 && $columnIndex === 0) return { rowspan: 2, colspan: 2 }
  return { rowspan: 1, colspan: 1 }
}

/**
 * @description get sum or mean of each field
 * @param { array } data: all data of the field
 * @param { string } field: field name
 * @param { string } type: 'sum' || 'mean', type of answer
 * @returns { number } return final answer
 */
const calculator = (data, field, type) => {
  let isNested = field.indexOf('.') !== -1 ? true : false
  let count = 0
  if (isNested) {
    let field_outer = field.split('.')[0]
    let field_inner = field.split('.')[1]
    data.forEach((item) => count += item[field_outer][field_inner])
  } else {
    data.forEach((item) => count += item[field])
  }
  switch (type) {
    case 'sum': return data.length ? count : 0
    case 'mean': return data.length ? Math.ceil(count / data.length) : 0
  }
}

//footer renderer
const renderFooter = ({ columns, data }) => {
  const dataLength = data.length
  const prefix = props.loadAll ? lang('Total') : lang('The latest')
  const suffix = dataLength > 1 ? lang('records') : lang('record')
  const footerRow1 = [`${prefix} ${dataLength} ${suffix}`, lang('Sum'), calculator(data, 'total', 'sum')]
  const footerRow2 = [lang('Average'), calculator(data, 'total', 'mean')]
  footerRows.value = [footerRow1, footerRow2]
  return footerRows.value
}

watch(props, async (val) => {
  tableData.value = await props.data
  switch (props.selected) {
    case 'daily': {
      colConfig.value[2] = { key: 3, field: 'date', title: 'Date', width: '20%' }
      break
    }
    case 'weekly': {
      colConfig.value[2] = { key: 3, field: 'week', title: 'Week', width: '20%' }
      break
    }
    case 'monthly': {
      colConfig.value[2] = { key: 3, field: 'month', title: 'Month', width: '20%' }
      break
    }
    default: break
  }
})

const language = computed(() => { return useAppStore().language })
watch(language, async (val) => tableRef.value.reloadData(tableData.value))
</script>
<style lang="scss" scoped>
.views-table-container {
  height: calc(100vh - var(--navbar-height) - 68px - 1rem * 2 - 13px - 20px - 16px);
}
</style>