<script setup lang="ts">
import { DataShowApi } from '@/services/api'
import type { ECharts, EChartsOption } from 'echarts'
import { init } from 'echarts'

// const echarts1 = ref<HTMLElement | null>(null)

let chart: ECharts;
let chartVisit: ECharts;
const chartRef: Ref<HTMLElement | null> = ref(null) // 用户分布图
const chartVisitRef: Ref<HTMLElement | null> = ref(null) // 每月访问量

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
const usernum = ref(0)
const visitnum = ref(0)
const goodsnum = ref(0)

onMounted(() => {
  chart = init(chartRef.value as HTMLElement)
  chartVisit = init(chartVisitRef.value as HTMLElement)
  initChart()
  initChartVisit()
  DataShowApi()
  .then(res => {
    if(res) {
      usernum.value = res.data.user.length
      visitnum.value = res.data.sum[0].sum || 0
      goodsnum.value = res.data.goods
      let data = [{value: 0,name:'管理员'},{value: 0,name:'商铺'}]
      for(let i = 0; i < res.data.user.length; i++){
        if(res.data.user[i].power === '管理员') data[0].value++
        else if(res.data.user[i].power === '商铺') data[1].value++
      }
      let entryNum = [],entryDay = []
      for(let j = 0; j < res.data.entry.length; j++){
        entryNum.push(res.data.entry[j].num)
        entryDay.push(res.data.entry[j].day)
      }
      chart.setOption({
        series:[{data}]
      })
      chartVisit.setOption({
        xAxis:{data: entryDay},
        series: [{data: entryNum}]
      })
    }
  })
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
        <div class="data-title">用户数</div>
        <div class="data-number">{{ usernum }}</div>
      </div>
      <div class="data data-all2">
        <div class="data-title">访问量</div>
        <div class="data-number">{{ visitnum }}</div>
      </div>
      <div class="data data-all3">
        <div class="data-title">商品量</div>
        <div class="data-number">{{ goodsnum }}</div>
      </div>
    </div>
    <div class="line-2">
      <div ref="chartRef" class="chart1"></div>
      <div ref="chartVisitRef" class="chartVisit"></div>
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
  background-color: #d85dbd;
}
.chart1 {
  width: 50%;
  height: 400px;
}
.line-2 {
  display: flex;
  justify-content: space-around;
}
.chartVisit {
  width: 50%;
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