<template>
  <div>
    <div class="ce-toolbar">
      <span></span>
      <LoadAll
        :is-all="loadAll"
        :loading="loading"
        @get-is-all="getIsAll"
      />
    </div>
    <div class="barchart-parent">
      <div id="weekly-benefit-barchart" class="barchart-container"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts/core'
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { BarChart, LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { LoadAll } from '@/components'
const props = defineProps({
  resource: {
    type: Array,
    required: true
  }
})
let barChart                    //用來綁定 bar-chart 實例
const canvasID = ref(null)      //畫布 dom ID
const canvasWidth = ref(0)      //畫布 width
const lineStyle = { width: 3 }  //客製 echarts styles
let loading = ref(false)        //是否開啟 loading 動畫
let allData = reactive({})      //all data
let filterData = reactive({})   //last 10 data
const loadAll = ref(false)      //是否要讀取所有資料
//從子組件獲取 isAll 的值
const getIsAll = (isAllFromChild) =>loadAll.value = isAllFromChild

//echarts setting
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

//init echart
onMounted(async () => {
  canvasID.value = document.getElementById('weekly-benefit-barchart')
  canvasWidth.value = canvasID.value.clientWidth
  if (props.resource) {
    let p = new Promise((resolve, reject) => {
      allData = loadData(true, props.resource)
      filterData = props.resource.length > 10 ? loadData(false, props.resource) : Object.assign({}, allData)
      resolve(null)
    })
    p.then((res) => {
      barChart = echarts.init(canvasID.value)
      initChart(barChart, filterData)
    })
  }
})

//watch if loadAll value changed
watch(loadAll, (newVal, oldVal) => {
  loading.value = true
  barChart.showLoading()
  setTimeout(() => {
    loading.value = false
    barChart.hideLoading()
    switch (newVal) {
      case true: initChart(barChart, allData); break;
      case false: initChart(barChart, filterData); break;
    }
  }, 1500)
})

/**
 * @description get data in charts
 * @param { Boolean } isNeedAll: load all or part of data
 * @param { Array } resource: resource data from props
 * @returns { Array } _loadData: loaded data
 */
const loadData = (isNeedAll, resource) => {
  let _startIdx = isNeedAll ? 0 : resource.length - 10
  let _loadData = {
    weeks: [],
    staffExps: [],
    staffActs: [],
    testerExps: [],
    testerActs: [],
    qualityExps: [],
    qualityActs: []
  }
  for (let i = _startIdx; i < resource.length; i++) {
    _loadData.weeks.push(resource[i].simpleWeek)
    _loadData.staffExps.push(resource[i].staffExp)
    _loadData.staffActs.push(resource[i].staffAct)
    _loadData.testerExps.push(resource[i].testerExp)
    _loadData.testerActs.push(resource[i].testerAct)
    _loadData.qualityExps.push(resource[i].qualityExp)
    _loadData.qualityActs.push(resource[i].qualityAct)
  }
  return _loadData
}

//初始化 echart 實例
const initChart = (chart, resource) => {
  chart.setOption({
    title: {
      text: 'Weekly summary of Benefits',
      left: 'center'
    },
    color: [
      //Staff saving time
      '#fac858', '#fc8452',
      //Tester saving time
      '#73c0de', '#5470c6',
      //Quality case
      '#91cc75', '#3ba272',
      //閒置色
      '#ee6666', '#9a60b4', '#ea7ccc'
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        },
        label: {
          formatter: (params) => {
            const { axisDimension, axisIndex, value } = params
            if (axisDimension === 'y') {
              if (axisIndex === 1) {
                return value.toString().split('.')[0]
              } else {
                return value.toFixed(1)
              }
            }
            return value
          }
        }
      }
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: true },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      orient: 'vertical',
      top: '12.5%',
      right: '0%',
      data: [
        'Staff time (Expect)',
        'Staff time (Actual)',
        'Tester time (Expect)',
        'Tester time (Actual)',
        'Quality case (Expect)',
        'Quality case (Actual)'
      ]
    },
    xAxis: [
      {
        type: 'category',
        data: resource.weeks,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        name: 'Saving time (hr / month)',
        type: 'value',
        min: 0,
        max: (value) => { return value.max + 1 },
        minInterval: 1
      },
      {
        name: 'Quality cases',
        type: 'value',
        min: 0,
        max: (value) => { return value.max + 1 },
        minInterval: 1,
        splitLine: { show: false }
      }
    ],
    grid: {
      top: '15%',
      right: 180
    },
    series: [
      {
        name: 'Staff time (Expect)',
        type: 'line',
        lineStyle,
        yAxisIndex: 0,
        tooltip: {
          valueFormatter: function (value) { return value === 0 ? value + ' hr / month' : value + ' hrs / month' }
        },
        data: resource.staffExps
      },
      {
        name: 'Staff time (Actual)',
        type: 'line',
        lineStyle,
        yAxisIndex: 0,
        tooltip: {
          valueFormatter: function (value) { return value === 0 ? value + ' hr / month' : value + ' hrs / month' }
        },
        data: resource.staffActs
      },
      {
        name: 'Tester time (Expect)',
        type: 'line',
        lineStyle,
        yAxisIndex: 0,
        tooltip: {
          valueFormatter: function (value) { return value === 0 ? value + ' hr / month' : value + ' hrs / month' }
        },
        data: resource.testerExps
      },
      {
        name: 'Tester time (Actual)',
        type: 'line',
        lineStyle,
        yAxisIndex: 0,
        tooltip: {
          valueFormatter: function (value) { return value === 0 ? value + ' hr / month' : value + ' hrs / month' }
        },
        data: resource.testerActs
      },
      {
        name: 'Quality case (Expect)',
        type: 'bar',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: (value) => { return value > 1 ? value + ' cases' : value + ' case' }
        },
        data: resource.qualityExps
      },
      {
        name: 'Quality case (Actual)',
        type: 'bar',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: (value) => { return value > 1 ? value + ' cases' : value + ' case' }
        },
        data: resource.qualityActs
      }
    ]
  })
}

window.addEventListener('resize', () => {
  canvasWidth.value = canvasID.value.clientWidth
  barChart.resize()
})
</script>