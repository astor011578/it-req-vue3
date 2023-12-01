<template>
  <span id="exportXlsx-container">
    <strong class="mr-2">{{ `${lang('Export')}:` }}</strong>
    <el-tooltip
      :content="lang('Export as xlsx file')"
      effect="dark"
      placement="bottom"
    >
      <el-button
        :icon="ExcelIcon"
        color="#c6c6c6"
        circle
        @click="exportXlsx"
      />
    </el-tooltip>
  </span>
</template>

<script setup>
import * as ExcelJS from 'exceljs'
import FileSaver from 'file-saver'
import { ElMessage } from 'element-plus'
import { ExcelIcon } from '@/icons/common/'
import { dateGenerator } from '@/hooks/useDate'
import { lang } from '@/hooks/useCommon'
const props = defineProps({
  daily: {
    type: Array,
    require: true,
    default: () => { return [] }
  },
  weekly: {
    type: Array,
    require: true,
    default: () => { return [] }
  },
  monthly: {
    type: Array,
    require: true,
    default: () => { return [] }
  }
})
const today = dateGenerator()
const filename = ref(`IT Request_${today}_Page views_Report`)
const sheetnames = ref(['Daily', 'Weekly', 'Monthly'])
const dailyData = ref([])
const dailyCols = ref(['#', 'Year', 'Date', 'Total views'])
const weeklyData = ref([])
const weeklyCols = ref(['#', 'Year', 'Week', 'Total views'])
const monthlyData = ref([])
const monthlyCols = ref(['#', 'Year', 'Month', 'Total views'])

/**
 * @description 獲得 page-views 資料
 * @param { array } $resource : 資料來源 (raw data)
 * @returns { array } transferedData (二維陣列)
 */
const dataTransfer = async ($resource) => {
  const transferedData = []
  for await (const doc of $resource) {
    const temp = []
    for await (const [key, val] of Object.entries(doc)) {
      if (key !== '_X_ROW_KEY') temp.push(val)
    }
    transferedData.push(temp)
  }

  return transferedData
}

//從 props 取得 raw data, 並改變資料結構
watch(props, async () => {
  //get 1st table data
  const dailyRaws = await props.daily
  dailyData.value = Object.assign([], await dataTransfer(dailyRaws))

  //get 2nd table data
  const weeklyRaws = await props.weekly
  weeklyData.value = Object.assign([], await dataTransfer(weeklyRaws))

  //get 3rd table data
  const monthlyRaws = await props.monthly
  monthlyData.value = Object.assign([], await dataTransfer(monthlyRaws))
})

/**
 * @description 繪製 .xlsx 檔中的工作頁 (worksheet)
 * @param { object } $wb : 工作簿
 * @param { string } $sheetname : 工作表名稱
 * @param { array } $columns : 表頭名
 * @param { array } $data : 表格資料
 */
const drawTable = async ($wb, $sheetname, $columns, $data) => {
  //工作頁 (分頁 sheet)
  const worksheet = $wb.addWorksheet($sheetname)
  //此表格有幾行標題
  const headerRows = 1
  //樣式相關
  const headerFont = { bold: true, size: 10, name: 'Arial' }
  const headerFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' } }
  const bodyFont = { size: 10, name: 'Arial' }
  const blueFont = { size: 10, name: 'Arial', color: { argb: 'FF0000FF' } }
  const alignCenter = { vertical: 'middle', horizontal: 'center' }
  const borderStyle = {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' }
  }

  //插入資料至儲存格
  for (let i = 0; i < $data.length + headerRows; i++) {
    if (i < headerRows) {
      worksheet.addRow($columns)
    } else {
      worksheet.addRow($data[i - headerRows])
    }
  }

  //循環出每一個儲存格
  for (let a = 1; a <= $columns.length; a++) {
    //改變欄寬, 及資料對齊方式
    worksheet.getColumn(a).width = 18
    worksheet.getColumn(a).alignment = alignCenter
    //循環出每一行
    for (let b = 1; b <= worksheet.rowCount; b++) {
      //處理儲存格樣式
      if (b <= headerRows) {
        worksheet.getRow(b).getCell(a).fill = headerFill
        worksheet.getRow(b).getCell(a).font = headerFont
      } else {
        if (a === 4 && worksheet.getRow(b).getCell(a).value > 0) {
          worksheet.getRow(b).getCell(a).font = blueFont
        } else {
          worksheet.getRow(b).getCell(a).font = bodyFont
        }
      }
      //為每個儲存格加上邊框
      worksheet.getRow(b).getCell(a).border = borderStyle
      //預設只顯示 header 與最近的 10 行資料
      if (b > headerRows && b <= worksheet.rowCount - 10) {
        worksheet.getRow(b).hidden = true
      }
    }
  }

  //for debugging
  // console.log(worksheet.rowCount)
  // console.log(worksheet)
}

/**
 * @description 匯出 .xlsx 檔案
 */
const exportXlsx = async () => {
  try {
    const workbook = new ExcelJS.Workbook()
    await drawTable(workbook, sheetnames.value[0], dailyCols.value, dailyData.value)
    await drawTable(workbook, sheetnames.value[1], weeklyCols.value, weeklyData.value)
    await drawTable(workbook, sheetnames.value[2], monthlyCols.value, monthlyData.value)
    const buffer = await workbook.xlsx.writeBuffer()
    ElMessage.success(lang('Export successfully'))
    return FileSaver(new Blob([buffer]), filename.value + '.xlsx')
  } catch (err) {
    console.error(err)
    ElMessage.error(lang('Failed to export'))
  }
}
</script>
<style lang="scss">
#exportXlsx-container {
  //override font color in el-button
  .el-button {
    color: #fff;
  }

  strong {
    font-size: 12px;
  }
}
</style>