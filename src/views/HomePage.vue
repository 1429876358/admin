<template>
  <div v-cloak class="homepage">
    <div class="header">
      <div :class="{tabactive:tabActive==1}" class="tabone" @click="tabchangeindex(1)">
        <span :class="{iconactive:tabActive==1}" /><span>首页</span></div>
      <div :class="{tabactive:tabActive==2}" class="tabtwo" @click="tabchangeindex(2)">
        <span :class="{iconactive:tabActive==2}" /><span>一张图</span></div>
      <div class="timepeal">2020-03-19 14:46</div>
      <div class="weather">
        <div><img src="../assets/homepage/header/header_06.png"><span>小雨</span></div>
        <div><span>29C</span><span>(杭州当地)</span></div>
        <div><span>500mm</span><span>(降雨量)</span></div>
      </div>
      <div class="lastbutton">业务平台</div>
      <div class="topmove" />
      <div class="bottommove" />
    </div>
    <div v-if="tabActive==1" class="maincontent">
      <mapgaode />
      <!-- <div class="titlepre"><img src="../assets/homepage/header/headermiddle.png"></div> -->
      <div class="panelbg panelone" />
      <div class="panelbg paneltwo" />
      <div class="panelbg panelthree" />
      <div class="panelbg panelfour" />
      <div class="panelbg panelfif" />
      <div class="panelbg panelsix" />
      <div class="fl box_one">
        <div>
          <div>
            <div><span /><span /><span /></div>
            <span>工程规模类型统计</span>
          </div>
          <div>查看详情 <i class="el-icon-arrow-right" /></div>
        </div>
        <div>
          <div><div>大型工程</div><div>071</div><div /></div>
          <div><div>中型工程</div><div>004</div><div /></div>
          <div><div>小(1)工程</div><div>019</div><div /></div>
          <div><div>小(2)工程</div><div>000</div><div /></div>
          <p class="p1">
            <!-- <span>094</span>
            <span>总工程数</span> -->
          </p>
          <p class="p2">
            <span>094</span>
            <span>总工程数</span>
          </p>
        </div>
      </div>
      <div class="fl box_two">
        <div>
          <div>
            <div><span /><span /><span /></div>
            <span>排名统计分析</span>
          </div>
          <div>放大 <i class="el-icon-zoom-in" /></div>
        </div>
        <div class="tabshow">
          <div :class="{rankanalyseactive:rankanalyse==1}" @click="rankanalysechange(1)">水库除险加固排名</div>
          <div :class="{rankanalyseactive:rankanalyse==2}" @click="rankanalysechange(2)">水库安全鉴定排名</div>
          <div :class="{rankanalyseactive:rankanalyse==3}" @click="rankanalysechange(3)">小水电清理整顿排名</div>
          <div :class="{rankanalyseactive:rankanalyse==4}" @click="rankanalysechange(4)">山塘综合整治排名</div>
        </div>
        <div id="rankanalyseecharts" class="rankanalyseecharts" />
      </div>
      <div class="fl box_three">
        <div>
          <div>
            <div><span /><span /><span /></div>
            <span>病险水库情况</span>
          </div>
          <div>查看详情 <i class="el-icon-arrow-right" /></div>
        </div>
      </div>
      <div class="fl box_four">
        <div>
          <div>
            <div><span /><span /><span /></div>
            <span>水位统计</span>
          </div>
          <div>查看详情 <i class="el-icon-arrow-right" /></div>
        </div>
        <div id="liquidfill" class="liquidfill" />
        <div class="waternumber">
          <div>
            <span>正常</span>
            <span>60</span>
          </div>
          <div>
            <span>告警</span>
            <span>40</span>
          </div>
        </div>
        <div class="waterback" />
      </div>
      <div class="fl box_fif">
        <div>
          <div>
            <div><span /><span /><span /></div>
            <span>安全鉴定</span>
          </div>
          <div>查看详情 <i class="el-icon-arrow-right" /></div>
        </div>
        <div id="panelEcharts" class="panelEcharts" />
        <div class="waternumber">
          <div>
            <span><i class="el-icon-s-claim" /> 已完成任务数</span>
            <span>60</span>
          </div>
          <div>
            <span><i class="el-icon-discover" /> 计划完成任务数</span>
            <span>40</span>
          </div>
        </div>
      </div>
      <div class="fl box_six">
        <div>
          <div>
            <div><span /><span /><span /></div>
            <span>实时信息</span>
          </div>
          <div>查看详情 <i class="el-icon-arrow-right" /></div>
        </div>
      </div>
      <div class="middle_serach">
        <el-select v-model="regionvalue" size="small" placeholder="请选择区划">
          <el-option
            v-for="item in regionoptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select v-model="watergradevalue" size="small" placeholder="选择水库等级">
          <el-option
            v-for="item in watergradeoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div class="selectmessage">
          <div>
            <div>水库总数</div>
            <div><span>884</span><i class="el-select__caret el-input__icon el-icon-arrow-up" /></div>
          </div>
          <div>
            <div>水库</div>
            <div><span>23</span><i class="el-select__caret el-input__icon el-icon-arrow-up" /></div>
          </div>
          <div>
            <div>山塘</div>
            <div><span>561</span><i class="el-select__caret el-input__icon el-icon-arrow-up" /></div>
          </div>
          <div>
            <div>小水电</div>
            <div><span>71</span><i class="el-select__caret el-input__icon el-icon-arrow-up" /></div>
          </div>
          <div>
            <div>告警</div>
            <div><span>97</span><i class="el-select__caret el-input__icon el-icon-arrow-up" /></div>
          </div>
        </div>
        <div class="radiobox">
          <el-radio-group v-model="watertyperadiovalue">
            <el-radio :label="1" />
            <el-radio :label="2" />
            <el-radio :label="3" />
            <el-radio :label="4" />
          </el-radio-group>
        </div>
        <el-input v-model="serchinputvalue" class="serchinputvalue" size="small" suffix-icon="el-icon-search" placeholder="搜索" />
      </div>
      <div class="middletab">
        <div :class="tabmapactive==1?'activetabindex':'noactivetabindex'" @click="inittabmapactive(1)">
          <div><img v-if="tabmapactive!=1" src="../assets/homepage/mappic/water_01.png"><img v-else src="../assets/homepage/mappic/water_02.png"></div>
          <div>水库分布</div>
        </div>
        <div :class="tabmapactive==2?'activetabindex':'noactivetabindex'" @click="inittabmapactive(2)">
          <div><img v-if="tabmapactive!=2" src="../assets/homepage/mappic/water_03.png"><img v-else src="../assets/homepage/mappic/water_04.png"></div>
          <div>水库水位</div>
        </div>
        <div :class="tabmapactive==3?'activetabindex':'noactivetabindex'" @click="inittabmapactive(3)">
          <div><img v-if="tabmapactive!=3" src="../assets/homepage/mappic/water_05.png"><img v-else src="../assets/homepage/mappic/water_06.png"></div>
          <div>在建项目</div>
        </div>
        <div :class="tabmapactive==4?'activetabindex':'noactivetabindex'" @click="inittabmapactive(4)">
          <div><img v-if="tabmapactive!=4" src="../assets/homepage/mappic/water_07.png"><img v-else src="../assets/homepage/mappic/water_08.png"></div>
          <div>重大项目</div>
        </div>
        <div :class="tabmapactive==5?'activetabindex':'noactivetabindex'" @click="inittabmapactive(5)">
          <div><img v-if="tabmapactive!=5" src="../assets/homepage/mappic/water_09.png"><img v-else src="../assets/homepage/mappic/water_10.png"></div>
          <div>水库问题</div>
        </div>
        <div :class="tabmapactive==6?'activetabindex':'noactivetabindex'" @click="inittabmapactive(6)">
          <div><img v-if="tabmapactive!=6" src="../assets/homepage/mappic/water_11.png"><img v-else src="../assets/homepage/mappic/water_12.png"></div>
          <div>水库水质</div>
        </div>
        <div :class="tabmapactive==7?'activetabindex':'noactivetabindex'" @click="inittabmapactive(7)">
          <div><img v-if="tabmapactive!=7" src="../assets/homepage/mappic/water_13.png"><img v-else src="../assets/homepage/mappic/water_14.png"></div>
          <div>人员分布</div>
        </div>
        <div :class="tabmapactive==8?'activetabindex':'noactivetabindex'" @click="inittabmapactive(8)">
          <div><img v-if="tabmapactive!=8" src="../assets/homepage/mappic/water_15.png"><img v-else src="../assets/homepage/mappic/water_16.png"></div>
          <div>监测预警</div>
        </div>
      </div>
    </div>
    <onemappage v-if="tabActive==2" />
    <div class="titlepre"><img src="../assets/homepage/header/headermiddle.png"></div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import mapgaode from '@/components/MapGaoDe.vue'
import onemappage from './OneMapPage'
// eslint-disable-next-line no-unused-vars
import echartsLiquidfill from 'echarts-liquidfill'
export default {
  name: 'HomePage',
  components: {
    mapgaode,
    onemappage
  },
  data() {
    return {
      // 头部数据
      tabActive: '1',
      // 排名统计分析
      rankanalyse: '1',
      rankanalyseecharts: null,
      // 地图搜索
      regionvalue: '',
      regionoptions: [{ id: '', name: '杭州市' }],
      watergradevalue: '',
      watergradeoptions: [{ value: '', label: '全部等级' }],
      watertyperadiovalue: 1,
      serchinputvalue: '',
      tabmapactive: 1
    }
  },
  computed: {},
  mounted() {
    this.initrankanalyseecharts()
    this.initliquidFill()
    this.initpanelecharts()
  },
  methods: {
    // 头部切换
    tabchangeindex(v) {
      this.tabActive = v
    },
    // 排名统计分析
    rankanalysechange(v) {
      this.rankanalyse = v
    },
    initrankanalyseecharts() {
      // console.log('123')
      var rankchart = this.echarts.init(document.getElementById('rankanalyseecharts'))
      var option = {
        legend: {
          textStyle: { // 图例文字的样式
            color: '#fff',
            fontSize: 12
          }
        },
        tooltip: {},
        grid: {
          left: '3%',
          bottom: '4%',
          containLabel: true
        },
        dataset: {
          source: [
            ['项目', '在建项目数', '考核项目数', '完成项目数'],
            ['杭州市', 43.3, 85.8, 93.7],
            ['温州市', 83.1, 73.4, 55.1],
            ['舟山市', 86.4, 65.2, 82.5],
            ['嘉兴市', 72.4, 53.9, 39.1]
          ]
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              // 设置y轴颜色
              color: '#154a83'
            }
          },
          axisTick: { // y轴刻度线
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff', // 更改坐标轴文字颜色
              fontSize: 12 // 更改坐标轴文字大小
            }
          }
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: '12',
              fontFamily: 'PangMenZhengDaoBiaoTiTi'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#154a83',
              width: 1,
              type: 'solid'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#0a2e5b',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: { // y轴刻度线
            show: false
          }
        },
        color: ['#0ca6b1', '#0380b7', '#03c91c'],
        series: [
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' }
        ]
      }
      rankchart.setOption(option)
    },
    initliquidFill() { // 方法
      var liquid = this.echarts.init(document.getElementById('liquidfill'))
      liquid.setOption({
        title: { // 标题
          // text: '水球图',
          // textStyle: { // 标题的样式
          //   color: '#f60', // 字体颜色
          //   fonFfamily: 'PangMenZhengDaoBiaoTiTi', // 字体
          //   align: 'center', // 文字的水平方式
          //   verticalAlign: 'middle'// 文字的垂直方式
          // },
          // left: 'center', // 定位
          // backgroundColor: '#03dbdb'// 文字区域的背景颜色
        },
        series: [{
          type: 'liquidFill', // 类型
          data: [0.7, 0.5, 0.4], // 数据是个数组 数组的每一项的值是0-1
          outline: {
            show: true, // 是否显示轮廓 布尔值
            borderDistance: 0, // 外部轮廓与图表的距离 数字
            itemStyle: {
              // borderColor:'rgba(255,0,0,0.09)', //边框的颜色
              borderWidth: 0 // 边框的宽度
              // shadowBlur: 5 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
              // shadowColor: '#000' //外部轮廓的阴影颜色
            }
          },
          backgroundStyle: {
            color: 'rgba(255,0,0,0.1)', // 图表的背景颜色
            // borderWidth: '10',//图表的边框宽度
            // borderColor: '#000',//图表的边框颜色
            itemStyle: {
              shadowBlur: 100, // 设置无用
              shadowColor: '#f60', // 设置无用
              opacity: 1 // 设置无用
            }
          },
          // itemStyle: {
          //   opacity: 0.5, // 波浪的透明度
          //   shadowBlur: 10, // 波浪的阴影范围
          //   shadowColor: '#f60'// 阴影颜色
          // },
          emphasis: {
            itemStyle: {
              opacity: 0.9 // 鼠标经过波浪颜色的透明度
            }
          },
          // color: ['rgba(255,0,0,0.3)', 'rgba(255,0,0,0.3)', 'rgba(255,0,0,0.3)'], // 水波的颜色 对应的是data里面值
          color: ['#01ab1f'],
          shape: 'circle', // 水填充图的形状 circle默认圆形  rect圆角矩形  triangle三角形  diamond菱形  pin水滴状 arrow箭头状  还可以是svg的path
          center: ['50%', '50%'], // 图表相对于盒子的位置 第一个是水平的位置 第二个是垂直的值 默认是[50%,50%]是在水平和垂直方向居中 可以设置百分比 也可以设置具体值
          radius: '68%', // 图表的大小 值是圆的直径 可以是百分比 也可以是具体值 100%则占满整个盒子 默认是40%; 百分比下是根据宽高最小的一个为参照依据
          amplitude: 3, // 振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
          waveLength: '50%', // 波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
          phase: 0, // 波的相位弧度 默认情况下是自动
          period: (value, index) => { // 控制波的移动速度 可以是函数 也可以是数字 两个参数  value 是data数据里面的值 index 是data值的索引
            return index * 2000
          },
          direction: 'left', // 波移动的速度 两个参数  left 从右往左 right 从左往右
          waveAnimation: true, // 控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
          animationEasing: 'linear', // 初始动画
          animationEasingUpdate: 'quarticInOut', // 数据更新的动画效果
          animationDuration: 3000, // 初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
          animationDurationUpdate: 300 // 数据更新动画的时长

        }]
        // backgroundColor: 'rgba(255,0,0,0.1)'// 容器背景颜色
      })
    },
    // 安全鉴定
    initpanelecharts() {
      var panelEcharts = this.echarts.init(document.getElementById('panelEcharts'))
      var dataArr = 3.4
      var colorSet = {
        color: '#007cff'
      }
      var option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [{
          name: '内部阴影',
          type: 'gauge',
          radius: '70%',
          z: 4,
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              color: [
                [dataArr / 10, new this.echarts.graphic.LinearGradient(
                  0, 1, 0, 0, [{
                    offset: 0,
                    color: 'rgba(145,207,255,0)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(145,207,255,0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(145,207,255,0.6)'
                  }
                  ]
                )],
                [
                  1, 'rgba(28,128,245,.0)'
                ]
              ],
              width: 250
            }
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          itemStyle: {
            show: false
          },
          detail: {
            formatter: function(value) {
              if (value !== 0) {
                return parseInt(value * 10)
              } else {
                return 0
              }
            },
            offsetCenter: [0, 0],
            textStyle: {
              padding: [0, 0, 0, 0],
              fontSize: 20,
              color: '#00b7ff',
              fontFamily: 'PangMenZhengDaoBiaoTiTi'
            }
          },
          title: { // 标题
            show: false
          },
          data: [{
            name: 'title',
            value: dataArr
          }],
          pointer: {
            show: false
          }
        }, {
          name: '内部圈',
          type: 'gauge',
          z: 2,
          min: 0,
          max: 10,
          splitNumber: 10,
          radius: '70%',
          axisLine: {
            lineStyle: {
              color: [
                [1, colorSet.color]
              ],
              width: 3,
              shadowColor: 'rgba(145,207,255,.5)',
              // shadowBlur: 6,
              shadowOffsetX: 0
            }
          },
          tooltip: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false

          },
          splitLine: {
            show: false
          },
          itemStyle: {
            show: false
          },
          title: {
            show: true,
            offsetCenter: [0, '60%'],
            color: '#fff',			// 文字的颜色,默认 #333。
            fontSize: 12			// 文字的字体大小,默认 15。
          },
          // eslint-disable-next-line no-dupe-keys
          itemStyle: {
            normal: {
              color: 'rgba(145,207,255,1)'
            }
          },
          pointer: {
            show: true,
            length: '80%',
            radius: '20%',
            width: 3 // 指针粗细
          },
          animationDuration: 4000,
          detail: {
            // backgroundColor: 'rgba(30,144,255,0.8)',
            // borderWidth: 1,
            // borderColor: '#fff',
            shadowColor: '#fff', // 默认透明
            // shadowBlur: 5,
            offsetCenter: [0, '50%'], // x, y，单位px
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              color: '#fff',
              fontSize: 12
            },
            formatter: function(value) {
              return '任务完成率' + '\n' + '%'// 实际数据显示加单位并且换行
            }
          },
          data: [{
            name: '',
            value: dataArr
          }]
        },
        {
          name: '内部刻度',
          type: 'gauge',
          radius: '65%',
          min: 0, // 最小刻度
          max: 10, // 最大刻度
          splitNumber: 10, // 刻度数量
          startAngle: 225,
          endAngle: -45,
          axisLine: {
            show: false,
            lineStyle: {
              width: 5,
              color: [
                [1, '#1087e2']
              ]
            }
          }, // 仪表盘轴线
          axisLabel: {
            show: true,
            color: '#fff',
            distance: -2,
            fontSize: 12,
            fontFamily: 'PangMenZhengDaoBiaoTiTi',
            formatter: function(v) {
              switch (v + '') {
                case '0':
                  return '0'
                case '1':
                  return '10'
                case '2':
                  return '20'
                case '3':
                  return '30'
                case '4':
                  return '40'
                case '5':
                  return '50'
                case '6':
                  return '60'
                case '7':
                  return '70'
                case '8':
                  return '80'
                case '9':
                  return '90'
                case '10':
                  return '100'
              }
            }
          }, // 刻度标签。
          axisTick: {
            show: true,
            splitNumber: 7,
            lineStyle: {
              color: '#1C3164', // 用颜色渐变函数不起作用
              width: 1
            },
            length: 4
          }, // 刻度样式
          splitLine: {
            show: true,
            length: 8,
            lineStyle: {
              color: '#1C3164' // 用颜色渐变函数不起作用
            }
          }, // 分隔线样式
          detail: {
            show: false
          },
          pointer: {
            show: false
          }
        },
        {
          // 内圆
          name: '内外圆-渐变',
          type: 'pie',
          radius: '22%',
          z: 0,
          itemStyle: {
            normal: {
              color: new this.echarts.graphic.RadialGradient(
                0.5,
                0.5,
                0.5,
                [{
                  offset: 0,
                  color: '#09255f'
                },
                {
                  offset: 0.42,
                  color: '#0a205a'
                },
                {
                  offset: 0.6,
                  color: '#0a1a54'
                },
                {
                  offset: 1,
                  color: '#075c89'
                }
                ],
                false
              ),
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          label: {
            show: false
          },
          tooltip: {
            show: false
          },
          data: [100],
          animationType: 'scale'
        },
        { // 指针上的圆
          name: '小圆形',
          type: 'pie',
          hoverAnimation: false,
          legendHoverLink: false,
          tooltip: {
            show: false
          },
          radius: ['20%', '21%'],
          z: 10,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 10,
            name: '2',
            itemStyle: {
              normal: {
                color: colorSet,
                shadowColor: 'rgba(145,207,255,.5)',
                shadowBlur: 50,
                shadowOffsetX: 100
              }
            }
          }]
        }
        ]
      }
      panelEcharts.setOption(option)
    },
    // 地图中心点击事件
    inittabmapactive(v) {
      if (this.tabmapactive === v) {
        return false
      } else {
        this.tabmapactive = v
      }
    }
  }
}
</script>
<style scoped lang="scss">
[v-cloak] {
  display: none;
}
// .body,html{
//   background: #0e2339;
//   padding: 0px;
//   margin: 0px;
// }
.homepage {
  width: 1894px;
  height: auto;
  background-color: #0d2038;
  .header {
    height: 54px;
    width: 100%;
    position: relative;
    overflow: hidden;
    background: url("../assets/homepage/header/headermain.png") no-repeat 0px 0px;
    .topmove{
     width: 569px;
     height: 5px;
     position: absolute;
     top: 0px;
     left: -500px;
     background: url("../assets/homepage/header/header_01.png") no-repeat 0px 0px;
     animation:guangmove 6s 2s infinite;
     -moz-animation:guangmove 6s 2s infinite; /* Firefox */
     -webkit-animation:guangmove 6s 2s infinite; /* Safari and Chrome */
     -o-animation:guangmove 6s 2s infinite; /* Opera */
    }
    .bottommove{
       width: 569px;
       height: 5px;
       position: absolute;
       top: 52px;
       left: -500px;
       background: url("../assets/homepage/header/header_01.png") no-repeat 0px 0px;
       animation:guangmove 6s 2s infinite;
       -moz-animation:guangmove 6s 2s infinite; /* Firefox */
       -webkit-animation:guangmove 6s 2s infinite; /* Safari and Chrome */
       -o-animation:guangmove 6s 2s infinite; /* Opera */
    }
    .tabone {
      width: 152px;
      height: 32px;
      position: absolute;
      top: 12px;
      left: 20px;
      background: url("../assets/homepage/header/header_08.png") no-repeat 0px 0px;
      cursor: pointer;
      text-align: center;
      > span:nth-child(1) {
        display: inline-block;
        width: 19px;
        height: 19px;
        background: url("../assets/homepage/header/header_03.png") no-repeat 0px 0px;
        position: absolute;
        top: 8px;
      }
      > span:nth-child(2) {
        line-height: 32px;
        margin-left: 24px;
        font-size: 16px;
      }
      .iconactive {
        background: url("../assets/homepage/header/header_04.png") no-repeat 0px 0px !important;
      }
    }
    .tabtwo {
      width: 152px;
      height: 32px;
      position: absolute;
      top: 12px;
      left: 168px;
      background: url("../assets/homepage/header/header_08.png") no-repeat 0px 0px;
      cursor: pointer;
      text-align: center;
      > span:nth-child(1) {
        display: inline-block;
        width: 19px;
        height: 19px;
        background: url("../assets/homepage/header/header_14.png") no-repeat 0px 0px;
        position: absolute;
        top: 9px;
      }
      > span:nth-child(2) {
        line-height: 32px;
        margin-left: 24px;
        font-size: 16px;
      }
      .iconactive {
        background: url("../assets/homepage/header/header_15.png") no-repeat 0px 0px !important;
      }
    }
    .tabactive {
      background: url("../assets/homepage/header/header_09.png") no-repeat 0px 0px;
    }
    .timepeal {
      position: absolute;
      width: 262px;
      height: 35px;
      background: url("../assets/homepage/header/header_02.png") no-repeat 0px 0px;
      left: 405px;
      top: 11px;
      text-align: center;
      line-height: 35px;
      font-family: "PangMenZhengDaoBiaoTiTi";
      font-size: 19px;
    }
    // .titlepre {
    //   margin: 0 auto;
    //   height: 100%;
    //   width: 524px;
    //   text-align: center;
    // }
    .weather {
      position: absolute;
      left: 1255px;
      width: 435px;
      top: 11px;
      height: 35px;
      background: url("../assets/homepage/header/header_05.png") no-repeat 0px 0px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      > div {
        line-height: 35px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        span {
          display: inline-block;
          padding: 0 3px;
          font-size: 13px;
        }
      }
      > div:nth-child(1) {
        img {
          height: 22px;
          margin-top: 8px;
        }
      }
      > div:nth-child(2) {
        span:nth-child(1) {
          font-family: "PangMenZhengDaoBiaoTiTi";
          color: #0ddae2;
          font-size: 20px;
        }
      }
      > div:nth-child(3) {
        span:nth-child(1) {
          font-family: "PangMenZhengDaoBiaoTiTi";
          color: #0ddae2;
          font-size: 20px;
        }
      }
    }
    .lastbutton {
      position: absolute;
      left: 1766px;
      width: 125px;
      top: 11px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      background: url("../assets/homepage/header/header_13.png") no-repeat 0px 0px;
      font-size: 17px;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .titlepre{
    position: absolute;
    height: 120px;
    width:600px;
    top: 8px;
    left: 657px;
  }
  .maincontent {
    height: 1031px;
    width: 100%;
    position: relative;
    .panelbg{
      position: absolute;
      width: 500px;
      height: 316px;
      background: url("../assets/homepage/mappic/boxpanel.png") no-repeat 0px 0px;
    }
    .panelone{
      top: 20px;
      left: 17px;
    }
     .paneltwo{
       top: 355px;
      left: 17px;
    }
     .panelthree{
      top: 690px;
      left: 17px;
    }
     .panelfour{
      top: 20px;
      right: 17px;
    }
     .panelfif{
      top: 355px;
      right: 17px;
    }
     .panelsix{
      top: 690px;
      right: 17px;
    }
    .box_one{
      top: 20px;
      left: 17px;
      >div:nth-child(2){
        width: 425px;
        height: 253px;
        background: url("../assets/homepage/mappic/guang_02.png") no-repeat 0px 0px;
        margin: 15px auto;
        position: relative;
        >div{
          width: 190px;
          height: 110px;
          position: absolute;
          text-align: center;
        }
        >div{
          position: absolute;
          overflow: hidden;
           >div:nth-child(1){
            margin-top: 26px;
            font-size: 17px;
            line-height: 24px;
          }
          >div:nth-child(3){
           position: absolute;
           top: 0;
           left: -200px;
           width: 122px;
           height: 110px;
           background: url("../assets/homepage/mappic/guang_01.png") no-repeat 0px 0px;
           animation:projectbgmove 7s infinite;
           -moz-animation:projectbgmove 7s infinite; /* Firefox */
           -webkit-animation:projectbgmove 7s infinite; /* Safari and Chrome */
           -o-animation:projectbgmove 7s infinite; /* Opera */
          }
        }
        >div:nth-child(1){
          left: 0px;
          top: 0px;
          >div:nth-child(2){
            font-size: 27px;
            line-height: 32px;
            font-family: "PangMenZhengDaoBiaoTiTi";
            color: #01fe13;
            text-shadow:0px 0px 20px #01fe13;
            font-weight: bold;
          }
        }
        >div:nth-child(2){
          right: 0px;
          top: 0px;
          >div:nth-child(2){
            font-size: 27px;
            line-height: 32px;
            font-family: "PangMenZhengDaoBiaoTiTi";
            color: #0de7ed;
            text-shadow:0px 0px 20px #0de7ed;
          }
        }
         >div:nth-child(3){
          left: 0px;
          bottom: 0px;
          >div:nth-child(2){
            font-size: 27px;
            line-height: 32px;
            font-family: "PangMenZhengDaoBiaoTiTi";
            color: #00b7ff;
            text-shadow:0px 0px 20px #00b7ff;
          }
        }
         >div:nth-child(4){
          right: 0px;
          bottom: 0px;
          >div:nth-child(2){
            font-size: 27px;
            line-height: 32px;
            font-family: "PangMenZhengDaoBiaoTiTi";
            color: #ee6806;
            text-shadow:0px 0px 20px #ee6806;
          }
        }
        >.p1{
          position: absolute;
          height: 100px;
          width: 100px;
          background: url("../assets/homepage/mappic/guang_03.png") no-repeat 0px 0px;
          margin: 0;
          padding: 0;
          left: 164px;
          top: 74px;
          border-radius: 50%;
           animation:rotatespin 10s infinite;
          -moz-animation:rotatespin 10s infinite; /* Firefox */
          -webkit-animation:rotatespin 10s infinite; /* Safari and Chrome */
          -o-animation:rotatespin 10s infinite; /* Opera */
        }
        >.p2{
          position: absolute;
          height: 100px;
          width: 100px;
          margin: 0;
          padding: 0;
          left: 164px;
          top: 74px;
          border-radius: 50%;
          text-align: center;
          >span:nth-child(1){
            display: block;
            color: #fcff00;
            font-size: 26px;
            font-family: "PangMenZhengDaoBiaoTiTi";
            margin-top: 23px;
            text-shadow:0px 0px 20px #fcff00;
          }
           >span:nth-child(2){
            display: block;
            font-size: 15px;
            line-height: 20px;
          }
        }
      }
    }
    .box_two{
      top: 355px;
      left: 17px;
      .tabshow{
        height: 53px;
        width: 450px;
        margin: 13px auto;
        >div{
          width: 76px;
          height: 44px;
          padding: 5px 15px;
          float: left;
          font-size: 14px;
          cursor: pointer;
          background: url("../assets/homepage/mappic/paimnotab.png") no-repeat 0px 0px;
        }
        >div:nth-child(2){
          margin: 0 8px;
        }
        >div:nth-child(3){
          margin-right:8px;
        }
        .rankanalyseactive{
          background: url("../assets/homepage/mappic/paimtab.png") no-repeat 0px 0px;
          color: #0dcfd8;
        }
      }
      .rankanalyseecharts{
        width:500px;
        margin: 0 auto;
        height: 200px;
      }
    }
    .box_three{
      top: 690px;
      left: 17px;
    }
    .box_four{
      top: 20px;
      right: 17px;
      >div:nth-child(2){
        width: 320px;
        height: 280px;
        display: inline-block;
      }
      .waterback{
        position: absolute;
        width: 220px;
        height: 220px;
        background: url("../assets/homepage/mappic/waterbac.png") no-repeat 0px 0px;
        top: 62px;
        left: 50px;
        border-radius:50%;
        overflow: hidden;
        animation:rotatespin 20s infinite;
        -moz-animation:rotatespin 20s infinite; /* Firefox */
        -webkit-animation:rotatespin 20s infinite; /* Safari and Chrome */
        -o-animation:rotatespin 20s infinite; /* Opera */
      }
      .waternumber{
        width:170px;
        height: 190px;
        // margin:40px auto;
        display: inline-block;
        position: absolute;
        top: 69px;
        left:320px;
        animation:mymove 2.5s; -webkit-animation:mymove 2.5s;
        >div{
          background: url("../assets/homepage/mappic/waternumber.png") no-repeat 0px 0px;
          height: 84px;
          width:130px;
          >span{
            display: inline-block;
            width: 100%;
            text-align: left;
            padding: 0 0 0 25px;
          }
          >span:nth-child(1){
            font-size: 15px;
            margin-top: 15px;
            line-height: 28px;
          }
          >span:nth-child(2){
            line-height: 25px;
            font-size: 25px;
          }
        }
         >div:nth-child(1){
          >span:nth-child(2){
            color: #0de7ed;
            text-shadow:0px 0px 20px #0de7ed;
            font-family: "PangMenZhengDaoBiaoTiTi";
          }
        }
        >div:nth-child(2){
          margin-top: 22px;
          >span:nth-child(2){
            color: #ee6806;
            text-shadow:0px 0px 20px #ee6806;
            font-family: "PangMenZhengDaoBiaoTiTi";
          }
        }
      }
    }
    .box_fif{
      top: 355px;
      right: 17px;
       >div:nth-child(2){
        width: 320px;
        height: 280px;
        display: inline-block;
      }
       .waternumber{
        width:170px;
        height: 190px;
        // margin:40px auto;
        display: inline-block;
        position: absolute;
        top: 69px;
        left:320px;
        animation:mymove 2.5s; -webkit-animation:mymove 2.5s;
        >div{
          height: 84px;
          width:130px;
          >span{
            display: inline-block;
            width: 100%;
            text-align: left;
            padding: 0 0 0 5px;
          }
          >span:nth-child(1){
            font-size: 15px;
            margin-top: 15px;
            line-height: 28px;
          }
          >span:nth-child(2){
            line-height: 25px;
            font-size: 25px;
          }
        }
         >div:nth-child(1){
          >span:nth-child(2){
            color: #01fe13;
            text-shadow:0px 0px 20px #01fe13;
            font-family: "PangMenZhengDaoBiaoTiTi";
          }
        }
        >div:nth-child(2){
          margin-top: 22px;
          >span:nth-child(2){
            color: #ee6806;
            text-shadow:0px 0px 20px #ee6806;
            font-family: "PangMenZhengDaoBiaoTiTi";
          }
        }
      }
    }
    .box_six{
      top: 690px;
      right: 17px;
    }
    .fl{
      overflow: hidden;
      position: absolute;
      width: 500px;
      height: 316px;
      background: url("../assets/homepage/mappic/boxbackground.png") no-repeat 0px 0px;
       >div:nth-child(1){
        height: 32px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content:space-between;
        >div:nth-child(1){
          padding: 0 10px;
          line-height: 32px;
          >span{
           font-size: 16px;
            font-weight: bold;
            padding: 0 2px;
          }
          >div{
            display: inline-block;
            margin-right: 9px;
            >span{
              display: inline-block;
              width: 3px;
              vertical-align: middle;
            }
            >span:nth-child(1){
              height: 15px;
              background: #0df7f9;
              animation:loadingK 1.2s 0.2s infinite;
              -moz-animation:loadingK 1.2s 0.2s infinite; /* Firefox */
              -webkit-animation:loadingK 1.2s 0.2s infinite; /* Safari and Chrome */
              -o-animation:loadingK 1.2s 0.2s infinite; /* Opera */
            }
            >span:nth-child(2){
              height: 9px;
              margin: 0 4px;
              background: #0df7f9;
              animation:loadingK 1.2s 0.6s infinite;
              -moz-animation:loadingK 1.2s 0.6s infinite; /* Firefox */
              -webkit-animation:loadingK 1.2s 0.6s infinite; /* Safari and Chrome */
              -o-animation:loadingK 1.2s 0.6s infinite; /* Opera */
            }
            >span:nth-child(3){
              height: 7px;
              background: #0df7f9;
              animation:loadingK 1.2s 1s infinite;
              -moz-animation:loadingK 1.2s 1s infinite; /* Firefox */
              -webkit-animation:loadingK 1.2s 1s infinite; /* Safari and Chrome */
              -o-animation:loadingK 1.2s 1s infinite; /* Opera */
            }
          }
        }
        >div:nth-child(2){
          padding: 0 10px;
          line-height: 32px;
          color: #abbbc6;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .middle_serach{
      width:840px;
      height: 66px;
      position: absolute;
      top: 39px;
      left: 50%;
      margin-left: -420px;
      background: url("../assets/homepage/mappic/selectbackground.png") no-repeat 0px 0px;
      .el-select{
        width: 120px;
        top: 15px;
        margin-left: 10px;
      }
      .selectmessage{
        width: 412px;
        height: 33px;
        position: absolute;
        top: 15px;
        left: 272px;
        >div{
          float: left;
          width: 65px;
          height: 100%;
          >div:nth-child(1){
            font-size: 13px;
            text-align: left;
          }
          >div:nth-child(2){
            line-height: 20px;
            text-align: left;
            >span{
               font-size: 14px;
              display: inline-block;
              margin-left: 0px;
               min-width:30px;
               font-family: "PangMenZhengDaoBiaoTiTi";
            }
            .el-input__icon{
              line-height: 20px;
              font-size: 13px;
              width:15px;
               transform: rotate(180deg);
               webkit-transform: rotate(180deg);
              -moz-transform: rotate(180deg);
              -o-transform: rotate(180deg);
              -ms-transform: rotate(180deg);
              cursor: pointer;
            }
          }
        }
         >div:nth-child(2){
          width: 65px;
          margin: 0 20px;
        }
         >div:nth-child(4){
          width: 68px;
          margin: 0 20px;
        }
      }
      .radiobox{
         width: 412px;
         height: 33px;
         position: absolute;
         top: 33px;
         left: 328px;
         .el-radio{
           margin-right: 38px;
         }
      }
      .serchinputvalue{
        width: 140px;
        float: right;
        top: 17px;
        margin-right: 20px;
      }
    }
    .middletab{
      width: 750px;
      height: 130px;
      position: relative;
      bottom: 194px;
      left: 50%;
      margin-left: -375px;
      >div{
        width: 70px;
        height: 93px;
        position: absolute;
        display: inline-block;
        cursor: pointer;
      }
      >div:nth-child(1){
        top: 30px;
        left: 0px;

      }
       >div:nth-child(2){
        top: 30px;
        left: 95px;
      }
       >div:nth-child(3){
        top: 30px;
        left: 185px;
      }
       >div:nth-child(4){
        top: 30px;
        left: 285px;
      }
       >div:nth-child(5){
        top: 30px;
        left: 385px;
      }
       >div:nth-child(6){
        top: 30px;
        left: 485px;
      }
       >div:nth-child(7){
        top: 30px;
        left: 585px;
      }
       >div:nth-child(8){
        top: 30px;
        left: 685px;
      }
      .activetabindex{
        transform:translate(-0px,-30px);
        >div:nth-child(1){
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border:2px solid #0dfbfd;
          // box-shadow:-3px -2px 5px #0dfbfd;
          -webkit-box-shadow:0px 0px 9px rgba(13,251,253,0.79) inset;
          -moz-box-shadow:0px 0px 9px rgba(13,251,253,0.79) inset;
          box-shadow:0px 0px 9px rgba(13,251,253,0.79) inset;

          margin: 0 auto;
          text-align: center;
          >img{
            display: block;
            margin: 11px auto;
          }
        }
        >div:nth-child(2){
          font-size: 14px;
          text-align: center;
          line-height: 30px;
          margin-top: 10px;
        }
      }
      .noactivetabindex{
        transform:translate(-0px,30px);
         >div:nth-child(1){
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border:2px solid #00b7ff;
          // box-shadow:-3px -2px 5px #00b7ff;
          -webkit-box-shadow:0px 0px 9px rgba(0,182,255,0.79) inset;
          -moz-box-shadow:0px 0px 9px rgba(0,182,255,0.79) inset;
          box-shadow:0px 0px 9px rgba(0,182,255,0.79) inset;
          margin: 0 auto;
          text-align: center;
          >img{
            display: block;
            margin: 11px auto;
          }
        }
        >div:nth-child(2){
          font-size: 14px;
          text-align: center;
          line-height: 30px;
          margin-top: 10px;
        }
      }
    }
    // 工程规模类型
    // 头部运动动画
    @keyframes projectbgmove{
     50%{left:-200px;}
     100%{left: 400px;}
    }
    @-moz-keyframes projectbgmove{
      50%{left:-200px;}
     100%{left: 500px;}
    }
    @-webkit-keyframes projectbgmove{
     50%{left:-200px;}
     100%{left: 500px;}
    }
    @-o-keyframes projectbgmove{
     50%{left:-200px;}
     100%{left: 500px;}
    }
    // 头部运动动画
    @keyframes guangmove{
     0% {left: -600px;}
     35% {left: 2100px;}
     70%{left:-600px;}
     85%{left:2100px;}
     100%{left: -600px;}
    }
    @-moz-keyframes guangmove{
      0% {left: -600px;}
     35% {left: 2100px;}
     70%{left:-600px;}
     85%{left:2100px;}
     100%{left: -600px;}
    }
    @-webkit-keyframes guangmove{
     0% {left: -600px;}
     35% {left: 2100px;}
     70%{left:-600px;}
     85%{left:2100px;}
     100%{left: -600px;}
    }
    @-o-keyframes guangmove{
     0% {left: -600px;}
     35% {left: 2100px;}
     70%{left:-600px;}
     85%{left:2100px;}
     100%{left: -600px;}
    }
    // 动画
    @keyframes loadingK{
     from {opacity: 0.3;}
     to {opacity: 1;}
    }

    @-moz-keyframes loadingK{
      from {opacity: 0.3;}
     to {opacity: 1;}
    }

    @-webkit-keyframes loadingK{
      from {opacity: 0.3;}
     to {opacity: 1;}
    }

    @-o-keyframes loadingK{
     from {opacity: 0.3;}
     to {opacity: 1;}
    }
    //--
     @keyframes rotatespin{
     from { transform: rotate(0deg) }
     to { transform: rotate(1080deg) }
    }

    @-moz-keyframes rotatespin{
        from { -moz-transform: rotate(00deg) }
        to { -moz-transform: rotate(1080deg) }
    }

    @-webkit-keyframes rotatespin{
      from { -webkit-transform: rotate(0deg) }
    to { -webkit-transform: rotate(1080deg) }
    }
     @-o-keyframes rotatespin{
     from { -ms-transform: rotate(0deg) }
      to { -ms-transform: rotate(1080deg) }
    }
    //平移
      @keyframes mymove
    {
    from {left:400px;opacity: 0;}
    to {left:320px;opacity: 1;}
    }
    @-webkit-keyframes mymove{
    from {left:400px;opacity: 0;}
    to {left:320px;opacity: 1;}
    }
   }
  }
</style>
<style lang='scss'>
  .middle_serach{
    .el-select{
      .el-input{
        border:1px solid #047bb1;
        .el-input__inner{
          background-color: rgba(92,100,119,0.24)!important;
          border-color: #4e5b85 !important;
          border-radius:0!important;
          color: #fff;
       }
      }
     .is-focus{
        border:1px solid #0ce5ea;
     }
    }
  }
  .el-select-dropdown{
    border: 1px solid #047bb1;
    background-color: rgba(4,123,177,0.86)!important;
    .el-select-dropdown__item.hover{
       background-color: rgba(4,123,177,0.86)!important;
    }
    .el-select-dropdown__item{
       color: #fff;
    }
  }
  .radiobox{
    .el-radio__input{
      margin-right: 4px;
      margin-left: 10px;
      .el-radio__inner{
        border: 1px solid #00b3fa;
        background-color: #0f253d;
      }
    }
    .el-radio__inner::after{
      width:9px;
      height: 9px;
      background: #17e4f7;
    }
    .el-radio__label{
      opacity: 0;
    }
  }
  .serchinputvalue{
        .el-input__inner{
          border-radius: 0px;
          border:1px solid #047bb1;
          background-color: rgba(225,225,225,0.01)!important;
          color: #fff;
        }
        .el-icon-search{
          font-size: 16px;
        }
      }
</style>

