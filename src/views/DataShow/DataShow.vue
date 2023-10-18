<script setup lang="ts">
import type { ECharts, EChartsOption } from 'echarts'
import { init } from 'echarts'

// const echarts1 = ref<HTMLElement | null>(null)

let chart: ECharts;
let chartVisit: ECharts;
let chartUser: ECharts;
const chartRef: Ref<HTMLElement | null> = ref(null) // 用户分布图
const chartVisitRef: Ref<HTMLElement | null> = ref(null) // 每月访问量
const chartUserRef: Ref<HTMLElement | null> = ref(null) // 用户数目

const initChart = () => {
  const option: EChartsOption = {
    title: {
      text: '用户图表',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '管理员' },
          { value: 735, name: '商铺铺主' },
          { value: 580, name: '员工' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  chart.setOption(option);
}
const initChartVisit = () => {
  const option: EChartsOption = {
    title: {
      text: '每日访问量',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
  chartVisit.setOption(option);
}
const initChartUser = () => {
  const option: EChartsOption = {
    title: {
      text: '每日新增用户',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  };
  chartUser.setOption(option);
}

onMounted(() => {
  chart = init(chartRef.value as HTMLElement)
  chartVisit = init(chartVisitRef.value as HTMLElement)
  chartUser = init(chartUserRef.value as HTMLElement)
  initChart()
  initChartVisit()
  initChartUser()
  // 延时2秒后执行增量更新
  // setTimeout(() => {
  //   updateChart()
  // }, 2000)
})


</script>

<template>
  <el-scrollbar>
    <div class="line-1">
      <div class="data data-all1">
        <div class="data-title">数据</div>
        <div class="data-number">123123123</div>
      </div>
      <div class="data data-all2">
        <div class="data-title">数据</div>
        <div class="data-number">123123123</div>
      </div>
      <div class="data data-all3">
        <div class="data-title">数据</div>
        <div class="data-number">123123123</div>
      </div>
    </div>
    <div class="line-2">
      <div ref="chartRef" class="chart1"></div>
    </div>
    <div class="line-3">
      <div ref="chartVisitRef" class="chartVisit"></div>
      <div ref="chartUserRef" class="chartUser"></div>
    </div>
  </el-scrollbar>
</template>

<style scoped>
.line-1 {
  display: grid; 
  grid-template-columns: auto auto auto;
  grid-column-gap: 100px;
}
.data {
  display: flex;
  align-items: center;
  overflow: hidden;
  word-break: break-all;
  height: 100px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 10px;
}
.data-title {
  width: 40%;
  font-size: 36px;
}
.data-number {
  width: 60%;
  font-size: 24px;
  color: white;
}
.data-all1 {
  background-color: #e25c5c;
}
.data-all2 {
  background-color: #1ca76b;
}
.data-all3 {
  background-color: #801b6a;
}
.chart1 {
  width: 400px;
  height: 400px;
}
.line-3 {
  display: flex;
  justify-content: space-around;
}
.chartVisit {
  width: 40%;
  height: 400px;
}
.chartUser {
  width: 40%;
  height: 400px;
}
@media screen and (max-width: 800px) {
  .line-1 {
    display: block;
  }
}
</style>