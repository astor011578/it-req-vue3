<template>
  <span>
    <ExportXlsxBtn :on-export="exportXlsx" />
  </span>
</template>

<script setup>
import * as ExcelJS from 'exceljs'
import FileSaver from 'file-saver'
import { ElMessage } from 'element-plus'
import { ExportXlsxBtn } from '@/components'
import { dateGenerator } from '@/hooks/useDate'
import { lang } from '@/hooks/useCommon'
const props = defineProps({
  resource: {
    type: Array,
    require: true,
    default: () => {
      return []
    }
  }
})
const today = dateGenerator()
const filename = ref(`IT Request_${today}_Weekly Benefit Summary`)
const sheetname = ref('Benefit summary')
const cols = ref([])    //欄位名稱
const data = ref([])    //繪製 excel 用的資料

watch(props, (newVal, oldVal) => {
  props.resource.forEach(item => {
    const { fullWeek, simpleWeek, staffExp, staffAct, testerExp, testerAct, qualityExp, qualityAct } = item
    const year = fullWeek.split(' ')[0]
    data.value.push([ year, simpleWeek, staffExp, staffAct, testerExp, testerAct, qualityExp, qualityAct ])
  })
  cols.value.push(
    ['Year', 'Week', 'Save staff time (hr / month)', '', 'Save tester time (hr / month)', '', 'Quality case', ''],
    ['', '', 'Expect', 'Actual', 'Expect', 'Actual', 'Expect', 'Actual']
  )
})

/**
 * @description 繪製 .xlsx 檔中的工作頁 (worksheet)
 * @param { object } $wb : 工作簿
 * @param { string } $sheetname : 工作表名稱
 * @param { array } $columns : 表頭名
 * @param { array } $data : 表格資料
 * @param { number } $width : 各列寬度
 */
 const drawTable = async ($wb, $sheetname, $columns, $data, $width) => {
  //工作頁 (分頁 sheet)
  const worksheet = $wb.addWorksheet($sheetname)
  const column = $columns
  const headerRows = 2                    //此表格有幾行標題
  const headerCols = $columns[0].length   //此表格有幾欄標題
  //樣式相關
  const headerFont = { bold: true, size: 10, name: 'Arial' }
  const headerFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' } }
  const bodyFont = { size: 10, name: 'Arial' }
  // const redFont = { size: 10, name: 'Arial', color: { argb: 'FFFF0000' } }
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
      worksheet.addRow($columns[i])
    } else {
      worksheet.addRow($data[i - headerRows])
    }
  }
  //處理合併儲存格
  const mergeCells = ['A1:A2', 'B1:B2', 'C1:D1', 'E1:F1', 'G1:H1']
  mergeCells.forEach((mergeCell) => worksheet.mergeCells(mergeCell))

  //循環出每一個儲存格
  for (let a = 1; a <= headerCols; a++) {
    //改變欄寬, 及資料對齊方式
    worksheet.getColumn(a).width = $width
    worksheet.getColumn(a).alignment = alignCenter
    //循環出每一行
    for (let b = 1; b <= worksheet.rowCount; b++) {
      //處理儲存格樣式
      if (b <= headerRows) {
        worksheet.getRow(b).getCell(a).fill = headerFill
        worksheet.getRow(b).getCell(a).font = headerFont
      } else {
        //實際效益 > 0 => 標藍字; 其他 => 標黑字
        if (a === 3 && worksheet.getRow(b).getCell(3).value > 0) {
          worksheet.getRow(b).getCell(a).font = blueFont
        } else if (a === 5 && worksheet.getRow(b).getCell(5).value > 0) {
          worksheet.getRow(b).getCell(a).font = blueFont
        } else if (a === 7 && worksheet.getRow(b).getCell(7).value > 0) {
          worksheet.getRow(b).getCell(a).font = blueFont
        } else {
          worksheet.getRow(b).getCell(a).font = bodyFont
        }
      }
      //為每個儲存格加上邊框
      worksheet.getRow(b).getCell(a).border = borderStyle
      //預設只顯示 header 與最近的 10 行資料
      if (b > 2 && b <= worksheet.rowCount - 10) {
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
    await drawTable(workbook, sheetname.value, cols.value, data.value, 15)
    const buffer = await workbook.xlsx.writeBuffer()
    ElMessage.success(lang('Export successfully'))
    return FileSaver(new Blob([buffer]), filename.value + '.xlsx')
  } catch (err) {
    ElMessage.error(lang('Failed to export'))
  }
}
</script>