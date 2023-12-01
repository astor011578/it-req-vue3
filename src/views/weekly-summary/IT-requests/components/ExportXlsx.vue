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
const filename = ref(`IT Request_${today}_Weekly Summary`)
const sheetnames = ref(['Sheet1', 'Sheet2', 'Sheet3'])
const resource = ref([])
const data1 = ref([]) //二維陣列
const cols1 = ref([])
const data2 = ref([]) //二維陣列
const cols2 = ref([])
const data3 = ref([]) //二維陣列
const cols3 = ref([])

/**
 * @description 改變資料結構
 * @param { array } $resource : 資料來源 (raw data)
 */
const transferData = async ($resource) => {
  //for debugging
  // console.log($resource)

  //1st table
  cols1.value = [
    ['Week', 'Total', 'Status', '', '', '', '', '', 'Type', ''],
    ['', '', 'Reviewing', 'Proceeding', 'Done', 'Cancel', 'Delay', 'Rejected', 'OneTime', 'Project']
  ]

  //2nd table
  cols2.value = [['Week', 'Plant', 'Owner', 'Total', 'Reviewing', 'Proceeding', 'Done', 'Cancel', 'Delay', 'Rejected']]

  //3rd table
  cols3.value = [
    ['Week', 'Total', 'Reviewing', '', '', 'Proceeding', '', '', 'Done', '', '', 'Cancel', '', '', 'Delay', '', '', 'Rejected', '', ''],
    ['', '', 'T1', 'T3', 'T6', 'T1', 'T3', 'T6', 'T1', 'T3', 'T6', 'T1', 'T3', 'T6', 'T1', 'T3', 'T6', 'T1', 'T3', 'T6']
  ]

  data1.value = []
  data2.value = []
  data3.value = []

  for await (const [index, doc] of Object.entries($resource)) {
    //get data in 1st table
    data1.value.push([
      doc.week,
      doc.total,
      doc.reviewing,
      doc.prcd,
      doc.done,
      doc.cancel,
      doc.delay,
      doc.rejected,
      doc.oneTime,
      doc.project
    ])

    //get data in 2nd table
    data2.value.push(
      [
        doc.week,
        'T1',
        doc.T1.owner[0],
        doc.T1.total,
        doc.T1.reviewing,
        doc.T1.prcd,
        doc.T1.done,
        doc.T1.cancel,
        doc.T1.delay,
        doc.T1.rejected
      ],
      ['', 'T3', doc.T3.owner[0], doc.T3.total, doc.T3.reviewing, doc.T3.prcd, doc.T3.done, doc.T3.cancel, doc.T3.delay, doc.T3.rejected],
      ['', 'T6', doc.T6.owner[0], doc.T6.total, doc.T6.reviewing, doc.T6.prcd, doc.T6.done, doc.T6.cancel, doc.T6.delay, doc.T6.rejected]
    )

    //get data in 3rd table
    data3.value.push([
      doc.week,
      doc.total,
      doc.T1.reviewing,
      doc.T3.reviewing,
      doc.T6.reviewing,
      doc.T1.prcd,
      doc.T3.prcd,
      doc.T6.prcd,
      doc.T1.done,
      doc.T3.done,
      doc.T6.done,
      doc.T1.cancel,
      doc.T3.cancel,
      doc.T6.cancel,
      doc.T1.delay,
      doc.T3.delay,
      doc.T6.delay,
      doc.T1.rejected,
      doc.T3.rejected,
      doc.T6.rejected
    ])
  }
}

/**
 * @description 繪製 .xlsx 檔中的工作頁 (worksheet)
 * @param { number } $seq : 第幾張表格
 * @param { object } $wb : 工作簿
 * @param { string } $sheetname : 工作表名稱
 * @param { array } $columns : 表頭名
 * @param { array } $data : 表格資料
 * @param { number } $width : 各列寬度
 */
const drawTable = async ($seq, $wb, $sheetname, $columns, $data, $width) => {
  //工作頁 (分頁 sheet)
  const worksheet = $wb.addWorksheet($sheetname)
  const column = $seq === 2 ? $columns[0] : $columns[1]
  //此表格有幾行標題
  const headerRows = $seq === 2 ? 1 : 2

  //樣式相關
  const headerFont = { bold: true, size: 10, name: 'Arial' }
  const headerFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' } }
  const bodyFont = { size: 10, name: 'Arial' }
  const redFont = { size: 10, name: 'Arial', color: { argb: 'FFFF0000' } }
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
  switch ($seq) {
    case 1: {
      const mergeCells = ['A1:A2', 'B1:B2', 'C1:H1', 'I1:J1']
      mergeCells.forEach((mergeCell) => worksheet.mergeCells(mergeCell))
      break
    }
    case 2: {
      let mergeCells = []
      for (let i = 0; i < $data.length; i++) {
        if (i % 3 === 0) mergeCells.push(`A${i + 2}:A${i + 4}`)
      }
      mergeCells.forEach((mergeCell) => worksheet.mergeCells(mergeCell))
      break
    }
    case 3: {
      const mergeCells = ['A1:A2', 'B1:B2', 'C1:E1', 'F1:H1', 'I1:K1', 'L1:N1', 'O1:Q1', 'R1:T1']
      mergeCells.forEach((mergeCell) => worksheet.mergeCells(mergeCell))
      break
    }
  }

  //循環出每一個儲存格
  for (let a = 1; a <= column.length; a++) {
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
        switch ($seq) {
          case 1: {
            if (a === 5 && worksheet.getRow(b).getCell(a).value > 0) {
              //done 件數 > 0 => 標藍字
              worksheet.getRow(b).getCell(a).font = blueFont
            } else if (6 <= a && a <= 8 && worksheet.getRow(b).getCell(a).value > 0) {
              //cancel, delay, rejected 件數 > 0 => 標紅字
              worksheet.getRow(b).getCell(a).font = redFont
            } else {
              //other => 正常黑字
              worksheet.getRow(b).getCell(a).font = bodyFont
            }
            break
          }
          case 2: {
            if (a === 7 && worksheet.getRow(b).getCell(a).value > 0) {
              //done 件數 > 0 => 標藍字
              worksheet.getRow(b).getCell(a).font = blueFont
            } else if (8 <= a && a <= 10 && worksheet.getRow(b).getCell(a).value > 0) {
              //cancel, delay, rejected 件數 > 0 => 標紅字
              worksheet.getRow(b).getCell(a).font = redFont
            } else {
              //other => 正常黑字
              worksheet.getRow(b).getCell(a).font = bodyFont
            }
            break
          }
          case 3: {
            if (9 <= a && a <= 11 && worksheet.getRow(b).getCell(a).value > 0) {
              //done 件數 > 0 => 標藍字
              worksheet.getRow(b).getCell(a).font = blueFont
            } else if (12 <= a && a <= 20 && worksheet.getRow(b).getCell(a).value > 0) {
              //cancel, delay, rejected 件數 > 0 => 標紅字
              worksheet.getRow(b).getCell(a).font = redFont
            } else {
              //other => 正常黑字
              worksheet.getRow(b).getCell(a).font = bodyFont
            }
            break
          }
        }
      }
      //為每個儲存格加上邊框
      worksheet.getRow(b).getCell(a).border = borderStyle

      //預設只顯示 header 與最近的 10 行資料
      if ($seq !== 2) {
        if (b > 2 && b <= worksheet.rowCount - 10) {
          worksheet.getRow(b).hidden = true
        }
      } else {
        if (b > 1 && b <= worksheet.rowCount - 15) {
          worksheet.getRow(b).hidden = true
        }
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
    await transferData(props.resource)      //取得 columns, data
    const workbook = new ExcelJS.Workbook()
    await drawTable(1, workbook, sheetnames.value[0], cols1.value, data1.value, 12)
    await drawTable(2, workbook, sheetnames.value[1], cols2.value, data2.value, 12)
    await drawTable(3, workbook, sheetnames.value[2], cols3.value, data3.value, 8)
    const buffer = await workbook.xlsx.writeBuffer()
    ElMessage.success(lang('Export successfully'))
    return FileSaver(new Blob([buffer]), filename.value + '.xlsx')
  } catch (err) {
    console.log(err)
    ElMessage.error(lang('Failed to export'))
  }
}
</script>
