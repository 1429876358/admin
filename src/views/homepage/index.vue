<template>
  <div v-cloak class="homepage">
    <div class="header">
      <div :class="{tabactive:tabActive==1}" class="tabone" @click="tabchangeindex(1)">
        <span :class="{iconactive:tabActive==1}" /><span>首页</span></div>
      <div :class="{tabactive:tabActive==2}" class="tabtwo" @click="tabchangeindex(2)">
        <span :class="{iconactive:tabActive==2}" /><span>一张图</span></div>
      <div class="timepeal">2020-03-19 14:46</div>
      <div class="weather">
        <div><img src="@/assets/homepage/header/header_06.png"><span>小雨</span></div>
        <div><span>29C</span><span>(杭州当地)</span></div>
        <div><span>500mm</span><span>(降雨量)</span></div>
      </div>
      <div class="lastbutton">业务平台</div>
      <div class="topmove" />
      <div class="bottommove" />
    </div>
    <div v-if="tabActive==1" class="maincontent">
      <mapgaode ref="mapcoordinate" :imgindex="tabmapactive" :coordinatelist="warnlist" :watercoordinatelist="watercoordinatelist" />
      <!-- <div class="titlepre"><img src="@/assets/homepage/header/headermiddle.png"></div> -->
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
          <div><div>大型工程</div><div v-text="projectscope[0]?projectscope[0]:'0'" /><div /></div>
          <div><div>中型工程</div><div v-text="projectscope[1]?projectscope[1]:'0'" /><div /></div>
          <div><div>小(1)工程</div><div v-text="projectscope[2]?projectscope[2]:'0'" /><div /></div>
          <div><div>小(2)工程</div><div v-text="projectscope[3]?projectscope[3]:'0'" /><div /></div>
          <p class="p1" />
          <p class="p2">
            <span v-text="projectscopetotal">094</span>
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
        <div>
          <div id="pieonecharts" class="pieonecharts" />
          <div class="imgrate" />
          <div class="data_box">
            <span v-text="itemtitle" />
            <span v-if="itemvalue!=''">{{ itemvalue }}<span style="font-size:14px;font-family: initial; ">座</span></span>
          </div>
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
            <span v-text="normalnumber">60</span>
          </div>
          <div>
            <span>告警</span>
            <span v-text="wornnumber">40</span>
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
            <span v-text="evalStatusnumber">60</span>
          </div>
          <div>
            <span><i class="el-icon-discover" /> 计划完成任务数</span>
            <span v-text="evalStatustotalnumber">40</span>
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
        <div>
          <el-radio-group v-model="realtimeinformationvalue" @change="radiochangevalue">
            <el-radio :label="1">水情信息</el-radio>
            <el-radio :label="2">雨情信息</el-radio>
            <el-radio :label="3">预警信息</el-radio>
            <el-radio :label="4">视频监控</el-radio>
          </el-radio-group>
        </div>
        <div style="height:230px" @mouseenter="mouseenter" @mouseleave="mouseleave">
          <el-table v-if="realtimeinformationvalue==1" :data="tableData" style="width: 100%;height:233px" :header-cell-style="{'color':'#fff','height':'35px'}">
            <el-table-column
              prop="reservoirName"
              label="站点"
            />
            <el-table-column
              prop="reservoirRealLevel"
              label="水位"
            />
            <el-table-column
              prop="reservoirFloodLevel"
              label="限讯水位"
            />
            <el-table-column
              prop="recordTime"
              label="时间"
            />
          </el-table>
          <el-table v-if="realtimeinformationvalue==2" :data="tableData" style="width: 100%;height:233px" :header-cell-style="{'color':'#fff','height':'35px'}">
            <el-table-column
              prop="reservoirName"
              label="站点"
            />
            <el-table-column
              prop="rainfallNum"
              label="主站雨量"
            />
            <el-table-column
              prop="recordTime"
              label="时间"
            />
          </el-table>
          <el-table v-if="realtimeinformationvalue==3" :data="tableData" style="width: 100%;height:233px" :header-cell-style="{'color':'#fff','height':'35px'}">
            <el-table-column
              prop="reservoirName"
              label="站点"
            />
            <el-table-column
              prop="reservoirRealLevel"
              label="实时水位"
            />
            <el-table-column
              prop="reservoirFloodLevel"
              label="汛限水位"
            />
            <el-table-column
              prop="recordTime"
              label="时间"
            />
          </el-table>
        </div>
      </div>
      <div class="middle_serach">
        <el-select v-model="regionvalue" size="small" placeholder="请选择区划" @change="regionvaluechange">
          <el-option
            v-for="item in regionoptions"
            :key="item.areaId"
            :label="item.areaName"
            :value="item.areaId"
          />
        </el-select>
        <el-select v-model="watergradevalue" size="small" placeholder="选择水库等级" @change="watergradevaluechange">
          <el-option
            v-for="item in watergradeoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div class="selectmessage">
          <!-- <div>
            <div>水库总数</div>
            <div><span v-text="watertotalnumber" /></div>
          </div> -->
          <div>
            <div>水库</div>
            <div><span v-text="waternumber[0]" /></div>
          </div>
          <div>
            <div>山塘</div>
            <div><span v-text="waternumber[1]" /></div>
          </div>
          <div>
            <div>小水电</div>
            <div><span v-text="waternumber[2]" /></div>
          </div>
          <div>
            <div>告警</div>
            <div><span>2</span></div>
          </div>
        </div>
        <!-- <div class="radiobox">
          <el-radio-group v-model="watertyperadiovalue" @change="watertypechange">
            <el-radio :label="3" />
            <el-radio :label="5" />
            <el-radio :label="6" />
            <el-radio :label="4" />
          </el-radio-group>
        </div> -->
        <el-input v-model="serchinputvalue" class="serchinputvalues" size="small" clearable suffix-icon="el-icon-search" placeholder="搜索" @change="waternamevalue" />
      </div>
      <div class="middletab">
        <div :class="tabmapactive==1?'activetabindex':'noactivetabindex'" @click="inittabmapactive(1)">
          <div><img v-if="tabmapactive!=1" src="@/assets/homepage/mappic/water_01.png"><img v-else src="@/assets/homepage/mappic/water_02.png"></div>
          <div>水库分布</div>
        </div>
        <div :class="tabmapactive==2?'activetabindex':'noactivetabindex'" @click="inittabmapactive(2)">
          <div><img v-if="tabmapactive!=2" src="@/assets/homepage/mappic/water_03.png"><img v-else src="@/assets/homepage/mappic/water_04.png"></div>
          <div>水库水位</div>
        </div>
        <div :class="tabmapactive==3?'activetabindex':'noactivetabindex'" @click="inittabmapactive(3)">
          <div><img v-if="tabmapactive!=3" src="@/assets/homepage/mappic/water_05.png"><img v-else src="@/assets/homepage/mappic/water_06.png"></div>
          <div>在建项目</div>
        </div>
        <div :class="tabmapactive==4?'activetabindex':'noactivetabindex'" @click="inittabmapactive(4)">
          <div><img v-if="tabmapactive!=4" src="@/assets/homepage/mappic/shantang_02.png"><img v-else src="@/assets/homepage/mappic/shantan_01.png"></div>
          <div>山塘</div>
        </div>
        <div :class="tabmapactive==5?'activetabindex':'noactivetabindex'" @click="inittabmapactive(5)">
          <div><img v-if="tabmapactive!=5" src="@/assets/homepage/mappic/xsd_02.png"><img v-else src="@/assets/homepage/mappic/xsd_01.png"></div>
          <div>小水电</div>
        </div>
        <div :class="tabmapactive==6?'activetabindex':'noactivetabindex'" @click="inittabmapactive(6)">
          <div><img v-if="tabmapactive!=6" src="@/assets/homepage/mappic/water_11.png"><img v-else src="@/assets/homepage/mappic/water_12.png"></div>
          <div>水库水质</div>
        </div>
        <div :class="tabmapactive==7?'activetabindex':'noactivetabindex'" @click="inittabmapactive(7)">
          <div><img v-if="tabmapactive!=7" src="@/assets/homepage/mappic/water_13.png"><img v-else src="@/assets/homepage/mappic/water_14.png"></div>
          <div>人员分布</div>
        </div>
        <div :class="tabmapactive==8?'activetabindex':'noactivetabindex'" @click="inittabmapactive(8)">
          <div><img v-if="tabmapactive!=8" src="@/assets/homepage/mappic/water_15.png"><img v-else src="@/assets/homepage/mappic/water_16.png"></div>
          <div>监测预警</div>
        </div>
      </div>
      <div v-if="warnlistshow==true" class="warnpopul">
        <div class="titlebox">
          <span>告警提醒</span>
          <span @click="colsepop"><img src="@/assets/homepage/onemapimages/warn_05.png"></span>
        </div>
        <div class="warnnumber">
          <span />
          <span>当前有{{ watercoordinatelist.length }}个报警信息...</span>
        </div>
        <div class="warnlist">
          <div>
            <div v-for="(item,index) in watercoordinatelist" :key="index" :class="index==activeindex?'activeback':''" @click="indexactive(index)">
              <div>
                <div>
                  <img src="@/assets/homepage/onemapimages/warn_04.png">
                </div>
                <div>
                  <div v-text="item.reservoirName" />
                  <div v-text="item.reservoirName" />
                </div>
              </div>
              <div>
                <img src="@/assets/homepage/onemapimages/warn_06.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <onemappage v-if="tabActive==2" />
    <div class="titlepre"><img src="@/assets/homepage/header/headermiddle.png"></div>
    <!-- //告警弹泡 -->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import mapgaode from '../homepage/components/MapGaoDe'
import onemappage from '../onepage/index'
import { fetchrankdata, fetchprojectdata, fetchdangerouswaterdata_one, fetchdangerouswaterdata_two, fetchwatercountdata, fetchsafetyappraisaldata, fetchrealtimeinformationdata_one, fetchrealtimeinformationdata_two, fetchrealtimeinformationdata_three, fetcharealistdata_present, fetcharealistdata_last, fetchreservoirdistributiondata, fetchreservoirwaterleveldata, fetchwaterlevelandqualitydata, fetchwaternumberdata, fecthbuildprojectdata } from '@/api/homepage'
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
      areaId: 2678,
      tabActive: '1',
      // 工程规模类型统计
      timeyearvalue: '',
      projectscope: [],
      projectscopetotal: '',
      // 病险水库情况
      evalResultData: [],
      forceData: [],
      namelist: [],
      // 排名统计分析
      rankanalyse: '1',
      rankanalyseecharts: null,
      ranklistecharts: [],
      // 水位统计
      normalnumber: '',
      wornnumber: '',
      wornrate: '',
      // 地图搜索
      regionvalue: 2678,
      regionoptions: [],
      watergradevalue: '',
      watergradeoptions: [{ value: '', label: '全部等级' }, { value: '1', label: '国家级' }, { value: '2', label: '省级' }, { value: '3', label: '市级' }, { value: '4', label: '县级' }, { value: '5', label: '镇级' }, { value: '6', label: '村级' }],
      watertyperadiovalue: 3,
      serchinputvalue: '',
      tabmapactive: 8,
      warnlistshow: false,
      activeindex: '',
      // 病险水库情况
      itemtitle: '',
      itemvalue: '',
      // 安全鉴定
      evalStatusData: '',
      evalStatustotalnumber: '',
      evalStatusnumber: '',
      evalStatusrate: '',
      // 实时信息
      realtimeinformationvalue: 1,
      tableData: [],
      animate: true,
      interval: null,
      warnlist: [],
      watercoordinatelist: [],
      waternumber: [],
      watertotalnumber: ''
    }
  },
  created() {
    // this.mapwarnlist()
    this.getAreaGradeList()
    this.waternumber_v()
    // this.interval = setInterval(this.scroll, 2000)
  },
  mounted() {
    var that = this
    // 工程规模
    that.fetchProjectData()
    // 除险加固
    that.fetchDangerousWaterData()
    // p排名
    that.rankanalysechange(1)
    // 水位统计
    that.fecthWaterlevelStatistics()
    // 安全鉴定
    that.fetchSafetyAppraisalData()
    // this.initpieonecharts()
    // 实时信息
    that.fecthTableData()
    // 水库分布
    that.inittabmapactive(that.tabmapactive)
  },
  methods: {
    // 获取年
    getYearValue() {
      var date = new Date()
      this.timeyearvalue = date.getFullYear()
    },
    // 工程规模
    fetchProjectData() {
      fetchprojectdata({ areaId: this.areaId, year: this.timeyearvalue }).then(res => {
        for (var i = 0; i < res.scopeData.length; i++) {
          this.projectscope.push(res.scopeData[i].scopeNum)
        }
        this.projectscopetotal = res.total
      })
    },
    // 病险水库
    fetchDangerousWaterData() {
      fetchdangerouswaterdata_one({ areaId: this.areaId, year: this.timeyearvalue, evalResults: '2,3' }).then(res => {
        this.evalResultData = res.evalResultData
        fetchdangerouswaterdata_two({ areaId: this.areaId, year: this.timeyearvalue, forceStatus: '2,3' }).then(res => {
          this.forceData = []
          for (var i = 0; i < res.forceData.length; i++) {
            if (res.forceData[i].forceName === '已完成') {
              this.forceData.push({ forceName: '除险加固已完成', forceNum: res.forceData[i].forceNum })
            }
            if (res.forceData[i].forceName === '已开工') {
              this.forceData.push({ forceName: '除险加固已开工', forceNum: res.forceData[i].forceNum })
            }
          }
          this.initpieonecharts()
        })
      })
    },
    // 水位统计
    fecthWaterlevelStatistics() {
      fetchwatercountdata({ areaId: this.areaId }).then(res => {
        for (var i = 0; i < res.list.length; i++) {
          if (res.list[i].type === '告警') {
            this.wornnumber = res.list[i].num
            this.wornrate = res.list[i].rate
          }
          if (res.list[i].type === '正常') {
            this.normalnumber = res.list[i].num
          }
        }
        this.initliquidFill()
      })
    },
    // 安全鉴定
    fetchSafetyAppraisalData() {
      fetchsafetyappraisaldata({ areaId: this.areaId, year: this.timeyearvalue }).then(res => {
        this.evalStatustotalnumber = res.evalStatusData[0].evalStatusNum + res.evalStatusData[1].evalStatusNum
        for (var i = 0; i < res.evalStatusData.length; i++) {
          if (res.evalStatusData[i].evalStatusName === '已完成任务 ') {
            this.evalStatusnumber = res.evalStatusData[i].evalStatusNum
            this.evalStatusrate = Number(res.evalStatusData[i].evalStatusRate)
          }
        }
        this.initpanelecharts()
      })
    },
    // 实时信息
    radiochangevalue() {
      this.fecthTableData()
    },
    fecthTableData() {
      if (this.realtimeinformationvalue === 1) {
        fetchrealtimeinformationdata_one({ areaId: this.areaId, reservoirIds: '13,246,429,643', pageNum: '1', pageSize: '5' }).then(res => {
          this.tableData = res.list
        })
      } else if (this.realtimeinformationvalue === 2) {
        fetchrealtimeinformationdata_two({ areaId: this.areaId, reservoirIds: '13,246,429,643', pageNum: '1', pageSize: '5' }).then(res => {
          this.tableData = res.list
        })
      } else if (this.realtimeinformationvalue === 3) {
        fetchrealtimeinformationdata_three({ areaId: this.areaId, type: '2', pageNum: '1', pageSize: '5' }).then(res => {
          this.tableData = res.list
        })
      } else {
        this.tableData = []
      }
    },
    // 地图预警信息
    mapwarnlist() {
      fetchrealtimeinformationdata_three({ areaId: this.regionvalue, type: '2', reservoirName: this.serchinputvalue, reservoirLevel: this.watergradevalue }).then(res => {
        this.watercoordinatelist = res.list
        if (this.watercoordinatelist.length > 0) {
          this.warnlistshow = true
        }
      })
    },
    // 关闭弹泡
    colsepop() {
      this.warnlistshow = false
    },
    indexactive(index) {
      this.activeindex = index
    },
    // table滚动
    mouseenter() {
      // var that = this
      // clearInterval(that.interval)
      // that.interval = null
    },
    mouseleave() {
      // var that = this
      // this.interval = setInterval(that.scroll, 2000)
    },
    // table滚动
    scroll() {
      this.animate = !this.animate
      var that = this // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
      setTimeout(function() {
        that.tableData.push(that.tableData[0])
        that.tableData.shift()
        that.animate = !that.animate
        setTimeout(function() {}, 5000) // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
      }, 2000)
    },
    // 头部切换
    tabchangeindex(v) {
      this.tabActive = v
    },
    // 排名统计分析
    rankanalysechange(v) {
      this.rankanalyse = v
      if (this.rankanalyse == 1 || this.rankanalyse == 2) {
        this.ranklistecharts = []
        fetchrankdata({ areaId: '2678', rankingStatus: this.rankanalyse }).then(res => {
          this.ranklistecharts.push(['项目', '已开工', '已完工'])
          for (var i = 0; i < res.length; i++) {
            this.ranklistecharts.push([res[i].areaName, res[i].startNum, res[i].finishNum])
          }
          console.log(this.ranklistecharts)
          this.initrankanalyseecharts()
        })
      } else {
        this.$message('该功能正在开发中')
      }
    },
    initrankanalyseecharts() {
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
          source: this.ranklistecharts
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
      var ratevalue = []
      ratevalue.push(this.wornrate)
      ratevalue.push(this.wornrate)
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
          name: '告警率',
          data: ratevalue, // 数据是个数组 数组的每一项的值是0-1
          label: {
            show: true,
            color: '#fff', // 和边框颜色同色
            fontSize: 26,
            normal: {
              show: true,
              position: ['50%', '50%'], // 圈中文字的位置，If it is a string, {a} refers to series name, {b} to data name, and {c} to data value.
              formatter: function(param) {
                return (param.value) * 100 + '%' + '\n' + param.seriesName
              },
              color: '#fff', // 默认背景下的文字颜色
              // insideColor: '#fff', // 水波背景下的文字颜色
              fontSize: 24
              // fontFamily: 'PangMenZhengDaoBiaoTiTi'
            }
          },

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
      var dataArr = this.evalStatusrate
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
                return parseInt(value)
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
      if (v !== 8) {
        this.warnlistshow = false
      }
      if (v === 1) {
        this.tabmapactive = v
        this.reservoirdistribution()
      } else if (v === 2) {
        this.tabmapactive = v
        this.reservoirwaterlevel()
      } else if (v === 3) {
        this.tabmapactive = v
        this.buildproject()
      } else if (v === 4) {
        // this.tabmapactive = v
        // this.mapwarnlist()
        this.$message('该功能正在开发中')
      } else if (v === 5) {
        this.$message('该功能正在开发中')
      } else if (v === 6) {
        this.tabmapactive = v
        this.waterlevelandquality()
      } else if (v === 7) {
        // this.tabmapactive = v
        // this.waterlevelandquality()
        this.$message('该功能正在开发中')
      } else if (v === 8) {
        this.tabmapactive = v
        this.mapwarnlist()
      } else {
        this.$message('该功能正在开发中')
      }
    },
    getAreaGradeList() {
      this.regionoptions = []
      fetcharealistdata_present({ areaId: this.areaId }).then(res => {
        for (var i = 0; i < res.length; i++) {
          this.regionoptions.push(res[i])
        }
        fetcharealistdata_last({ parentId: this.areaId }).then(response => {
          for (var j = 0; j < response.length; j++) {
            this.regionoptions.push(response[j])
          }
        })
      })
    },
    // 单选
    watertypechange() {
      this.inittabmapactive(this.tabmapactive)
    },
    // 区划改变
    regionvaluechange() {
      this.inittabmapactive(this.tabmapactive)
      this.waternumber_v()
    },
    // 水库等级
    watergradevaluechange() {
      this.inittabmapactive(this.tabmapactive)
      this.waternumber_v()
    },
    // 搜索框
    waternamevalue() {
      if (this.tabmapactive === 1) {
        this.reservoirdistribution()
      } else if (this.tabmapactive === 2) {
        this.reservoirwaterlevel()
      } else if (this.tabmapactive === 3) {
        this.buildproject()
      } else if (this.tabmapactive === 6) {
        this.waterlevelandquality()
      } else if (this.tabmapactive === 8) {
        this.mapwarnlist()
      }
    },
    // 水库分布
    reservoirdistribution() {
      fetchreservoirdistributiondata({ areaId: this.regionvalue, reservoirName: this.serchinputvalue, reservoirType: 3, reservoirLevel: this.watergradevalue, pageSize: 999 }).then(res => {
        this.watercoordinatelist = res.list
      })
    },
    // 水库水位
    reservoirwaterlevel() {
      fetchreservoirwaterleveldata({ areaId: this.regionvalue, reservoirName: this.serchinputvalue, reservoirType: '', reservoirLevel: this.watergradevalue, pageSize: 999, listType: 1 }).then(res => {
        this.watercoordinatelist = res.list
      })
    },
    // 在建项目
    buildproject() {
      fecthbuildprojectdata({ areaId: this.regionvalue, forceName: this.serchinputvalue, progressStatus: 1, reservoirLevel: this.watergradevalue }).then(res => {
        this.watercoordinatelist = res.list
        console.log(res)
      })
    },
    // 水库水质
    waterlevelandquality() {
      fetchwaterlevelandqualitydata({ areaId: this.regionvalue, reservoirName: this.serchinputvalue, reservoirType: this.watertyperadiovalue, reservoirLevel: this.watergradevalue, pageSize: 999 }).then(res => {
        this.watercoordinatelist = res.list
      })
    },
    // 水库数目
    waternumber_v() {
      fetchwaternumberdata({ areaId: this.regionvalue, reservoirLevel: this.watergradevalue }).then(res => {
        this.watertotalnumber = 0
        this.waternumber = []
        for (var i = 0; i < res.list.length; i++) {
          if (res.list[i].type === '水库') {
            this.waternumber.push(res.list[i].num)
          } else if (res.list[i].type === '山塘') {
            this.waternumber.push(res.list[i].num)
          } else if (res.list[i].type === '小水电') {
            this.waternumber.push(res.list[i].num)
          }
          // this.watertotalnumber += res.list[i].num
        }
      })
    },
    // 病险水库echarts
    initpieonecharts() {
      var that = this
      var pieonecharts = this.echarts.init(document.getElementById('pieonecharts'))
      var data = []
      var datatwo = []
      var color = ['#01fe13', '#0de7ed', '#00b7ff', '#ee6806']
      var colorone = ['#01fe13', '#0de7ed']
      var colortwo = ['#00b7ff', '#ee6806']
      for (var i = 0; i < this.evalResultData.length; i++) {
        data.push({
          value: this.evalResultData[i].evalResultNum,
          name: this.evalResultData[i].evalResultName,
          itemStyle: {
            normal: {
              borderWidth: 5,
              shadowBlur: 20,
              borderColor: colorone[i],
              shadowColor: colorone[i]
            }
          }
        }, {
          value: 0.3,
          name: '',
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              color: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              borderWidth: 0
            }
          }
        })
      }
      var seriesOptionOne = {
        name: '',
        type: 'pie',
        clockWise: false,
        labelLine: {
          show: false
        },
        label: {
          show: false
        },
        radius: [105, 109],
        center: ['35%', '50%'],
        hoverAnimation: false,
        data: data
      }

      for (var j = 0; j < this.forceData.length; j++) {
        datatwo.push({
          value: this.forceData[j].forceNum,
          name: this.forceData[j].forceName,
          itemStyle: {
            normal: {
              borderWidth: 5,
              shadowBlur: 20,
              borderColor: colortwo[j],
              shadowColor: colortwo[j]
            }
          }
        }, {
          value: 1,
          name: '',
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              color: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              borderWidth: 0
            }
          }
        })
      }
      var seriesOptionTwo = {
        name: '',
        type: 'pie',
        clockWise: false,
        labelLine: {
          show: false
        },
        label: {
          show: false
        },
        radius: [80, 84],
        center: ['35%', '50%'],
        hoverAnimation: false,
        data: datatwo
      }
      var option = {
        color: color,
        tooltip: {
          trigger: 'item',
          formatter: (params) => { // 格式化数据的函数
            this.itemtitle = params.data.name
            this.itemvalue = params.data.value
          }
        },
        legend: {
          orient: 'vertical',
          data: ['二类坝', '三类坝', '除险加固已完成', '除险加固已开工'],
          right: 52,
          bottom: 87,
          align: 'left',
          textStyle: {
            color: '#fff'
          },
          itemGap: 20
        },
        series: [seriesOptionOne, seriesOptionTwo]
      }
      pieonecharts.setOption(option)
      pieonecharts.on('mouseout', function(params) {
        that.itemtitle = ''
        that.itemvalue = ''
      })
    }
  }
}
</script>
<style scoped lang="scss">
[v-cloak] {
  display: none;
}
.homepage {
  width: 1920px;
  height: auto;
  background-color: #0d2038;
  .header {
    height: 54px;
    width: 100%;
    position: relative;
    overflow: hidden;
    background: url("../../assets/homepage/header/headermain.png") no-repeat 0px 0px;
    .topmove{
     width: 569px;
     height: 5px;
     position: absolute;
     top: 0px;
     left: -500px;
     background: url("../../assets/homepage/header/header_01.png") no-repeat 0px 0px;
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
       background: url("../../assets/homepage/header/header_01.png") no-repeat 0px 0px;
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
      background: url("../../assets/homepage/header/header_08.png") no-repeat 0px 0px;
      cursor: pointer;
      text-align: center;
      > span:nth-child(1) {
        display: inline-block;
        width: 19px;
        height: 19px;
        background: url("../../assets/homepage/header/header_03.png") no-repeat 0px 0px;
        position: absolute;
        top: 8px;
      }
      > span:nth-child(2) {
        line-height: 32px;
        margin-left: 24px;
        font-size: 16px;
      }
      .iconactive {
        background: url("../../assets/homepage/header/header_04.png") no-repeat 0px 0px !important;
      }
    }
    .tabtwo {
      width: 152px;
      height: 32px;
      position: absolute;
      top: 12px;
      left: 168px;
      background: url("../../assets/homepage/header/header_08.png") no-repeat 0px 0px;
      cursor: pointer;
      text-align: center;
      > span:nth-child(1) {
        display: inline-block;
        width: 19px;
        height: 19px;
        background: url("../../assets/homepage/header/header_14.png") no-repeat 0px 0px;
        position: absolute;
        top: 9px;
      }
      > span:nth-child(2) {
        line-height: 32px;
        margin-left: 24px;
        font-size: 16px;
      }
      .iconactive {
        background: url("../../assets/homepage/header/header_15.png") no-repeat 0px 0px !important;
      }
    }
    .tabactive {
      background: url("../../assets/homepage/header/header_09.png") no-repeat 0px 0px;
    }
    .timepeal {
      position: absolute;
      width: 262px;
      height: 35px;
      background: url("../../assets/homepage/header/header_02.png") no-repeat 0px 0px;
      left: 405px;
      top: 11px;
      text-align: center;
      line-height: 35px;
      font-family: "PangMenZhengDaoBiaoTiTi";
      font-size: 19px;
    }
    .weather {
      position: absolute;
      left: 1255px;
      width: 435px;
      top: 11px;
      height: 35px;
      background: url("../../assets/homepage/header/header_05.png") no-repeat 0px 0px;
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
      background: url("../../assets/homepage/header/header_13.png") no-repeat 0px 0px;
      font-size: 17px;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .titlepre{
    position: absolute;
    height: 120px;
    width:600px;
    top: 0px;
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
      background: url("../../assets/homepage/mappic/boxpanel.png") no-repeat 0px 0px;
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
        background: url("../../assets/homepage/mappic/guang_02.png") no-repeat 0px 0px;
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
           background: url("../../assets/homepage/mappic/guang_01.png") no-repeat 0px 0px;
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
          background: url("../../assets/homepage/mappic/guang_03.png") no-repeat 0px 0px;
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
          background: url("../../assets/homepage/mappic/paimnotab.png") no-repeat 0px 0px;
        }
        >div:nth-child(2){
          margin: 0 8px;
        }
        >div:nth-child(3){
          margin-right:8px;
        }
        .rankanalyseactive{
          background: url("../../assets/homepage/mappic/paimtab.png") no-repeat 0px 0px;
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
      >div:nth-child(2){
        width: 500px;
        height: 285px;
        position: relative;
        >div:nth-child(1){
          width: 500px;
          height: 285px;
          position: absolute;
          top: 0;
          left: 0px;
        }
        >div:nth-child(2){
         width: 108px;
         height: 108px;
         position: absolute;
         background: url('../../assets/homepage/mappic/echartsrate.png') no-repeat 0px 0px;
         top: 91px;
         left: 121px;
         animation:rotatespin 8s infinite;
         -moz-animation:rotatespin 8s infinite; /* Firefox */
         -webkit-animation:rotatespin 8s infinite; /* Safari and Chrome */
         -o-animation:rotatespin 8s infinite; /* Opera */
         }
        >div:nth-child(3){
           width: 108px;
           height: 108px;
           position: absolute;
           top: 91px;
           left: 121px;
           >span:nth-child(1){
             width: 100%;
             display: inline-block;
             margin-top: 23px;
             text-align: center;
             line-height: 24px;
             font-size: 14px;
           }
            >span:nth-child(2){
             display: inline-block;
             width: 100%;
             text-align: center;
             color: #01fe13;
             font-size: 26px;
             font-family: "PangMenZhengDaoBiaoTiTi";
           }
        }
       }
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
        background: url("../../assets/homepage/mappic/waterbac.png") no-repeat 0px 0px;
        top: 62px;
        left: 50px;
        border-radius:50%;
        overflow: hidden;
        animation:rotatespin 40s infinite;
        -moz-animation:rotatespin 40s infinite; /* Firefox */
        -webkit-animation:rotatespin 40s infinite; /* Safari and Chrome */
        -o-animation:rotatespin 40s infinite; /* Opera */
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
          background: url("../../assets/homepage/mappic/waternumber.png") no-repeat 0px 0px;
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
      >div:nth-child(2){
        height: 32px;
        margin-top: 22px;
      }
      >div:nth-child(3){
        .el-table{
        color: #fff;
        tr{
           background: #0a3858;
            th{
          background: #0a3858;
        }
        }
        }
      }
    }
    .fl{
      overflow: hidden;
      position: absolute;
      width: 500px;
      height: 316px;
      background: url("../../assets/homepage/mappic/boxbackground.png") no-repeat 0px 0px;
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
      background: url("../../assets/homepage/mappic/selectbackground.png") no-repeat 0px 0px;
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
            text-align: center;
          }
          >div:nth-child(2){
            line-height: 20px;
            // text-align: left;
             text-align: center;
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
          margin: 0 10px;
        }
         >div:nth-child(4){
          width: 68px;
          margin: 0 10px;
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
      .serchinputvalues{
        width: 240px;
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
    .warnpopul{
      width: 375px;
      height: 284px;
      position: absolute;
      left: 50%;
      margin-left: -187px;
      top: 38%;
      background: url('../../assets/homepage/onemapimages/warn_03.png') no-repeat 0px 0px;
      .titlebox{
        height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        justify-items: center;
        >span{
          display: inline-block;
          height: 100%;
          padding: 24px 23px;
        }
        >span:nth-child(2){
          cursor: pointer;
        }
      }
      .warnnumber{
        width: 340px;
        height: 36px;
        margin:0 auto;
        background: url('../../assets/homepage/onemapimages/warn_01.png') no-repeat -3px -7px;
        text-align: center;
        >span{
          line-height: 36px;
        }
        >span:nth-child(1){
          height: 24px;
          width: 25px;
          display: inline-block;
          background: url('../../assets/homepage/onemapimages/warn_02.png') no-repeat 0px 8px;
        }
      }
      .warnlist{
        margin-top: 15px;
        height: 170px;
       overflow: hidden;
        >div{
          height: 170px;
          width: 395px;
          overflow-x: hidden;
          >div{
            cursor: pointer;
            height: 66px;
            >div{
              float: left;
               height: 100%;
            }
            >div:nth-child(1){
              height: 42px;
              width: 300px;
              margin-top: 13px;
              >div{
                height: 100%;
                float: left;
                margin: auto;
              }
              >div:nth-child(1){
                width:44px;
                margin-left: 24px;
              }
              >div:nth-child(2){
                margin-left:10px;
                >div:nth-child(1){
                  font-size: 16px;
                }
                  >div:nth-child(2){
                  font-size: 13px;
                  color:#e1ccbd;
                  overflow:hidden;
                  text-overflow:ellipsis;
                  white-space:nowrap;
                }
              }
            }
             >div:nth-child(2){
              width:70px;
              height: 42px;
              margin-top: 13px;
              text-align: center;
              img{
                margin-top: 12px;
                cursor: pointer;
              }
            }
          }
          .activeback{
            background: -webkit-linear-gradient(left bottom,#983337, rgb(225,0,0,0.06));
            background: -o-linear-gradient(left bottom,#983337, rgb(225,0,0,0.06));
            background: -moz-linear-gradient(left bottom,#983337, rgb(225,0,0,0.06));
            background: -mos-linear-gradient(left bottom,#983337, rgb(225,0,0,0.06));
            background: linear-gradient(left bottom,#983337, rgb(225,0,0,0.06));
          }
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
.homepage{
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
  .serchinputvalues{
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
  .box_six{
    >div:nth-child(2){
      .el-radio-group{
        margin-left: 20px;
        .el-radio{
        margin-right: 15px;
         .el-radio__input{
         margin-right: 4px;
         margin-left: 5px;
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
        color: #fff;
       }
      }
      }
    }
     >div:nth-child(3){
        .el-table::before{
          border-bottom:  1px solid red;
          height: 2px
        }
        .el-table{
        background-color: transparent;
        // color: #fff;
        .el-table__header{
          tr{
             background-color: transparent;
            th{
             text-align: center;
             background: rgb(10,56,88,0.48);
             padding: 0px;
             line-height: 36px;
           }
          .is-leaf{
            border: none;
          }
         }
        }
        .el-table__body-wrapper{
          .el-table__body{
            tr:hover>td {
             background-color: #114696;
            }
            tr:nth-child(odd){
            //  background-color:rgb(225,225,225,0)
              // background-color: transparent;
            }
            tr:nth-child(even){
              td{
              text-align: center;
              background: rgb(10,56,88,0.48);
              padding: 0px;
              height: 38px;
             }
            }
            tr{
             background-color: transparent;
             td{
              text-align: center;
              // background: rgb(10,56,88,0.48);
              padding: 0px;
              height: 38px;
              border: none;
              .cell{
                height: 38px;
                line-height: 38px;
              }
             }
             .is-leaf{
               border: none;
             }
            }
          }
        }
        }
      }
  }
}
</style>

