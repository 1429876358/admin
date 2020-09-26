<template>
  <div class="onemappage">
    <div style="width:100%; height:100%;background: #0e2339;">
      <div id="container" style="width:100%; height:100%" />
    </div>
    <div class="leftbox">
      <div class="toptab">
        <span :class="{toptabactive:toptabactiveindex==1}" @click="changetoptab(1)">基础信息</span>
        <span :class="{toptabactive:toptabactiveindex==2}" @click="changetoptab(2)">项目管理</span>
      </div>
      <div v-if="toptabactiveindex==1" class="tabfirst">
        <div class="waterbodytype">
          <div :class="{waterbodytypeactive:waterbodytype==3}" @click="changewatertab(3)">水库</div>
          <div :class="{waterbodytypeactive:waterbodytype==5}" @click="changewatertab(5)">山塘</div>
          <div :class="{waterbodytypeactive:waterbodytype==6}" @click="changewatertab(6)">小水电</div>
        </div>
        <div class="selectsearch">
          <el-select v-model="regionvalue" size="small" placeholder="请选择区划" @change="regionvaluechange">
            <el-option v-for="item in regionoptions" :key="item.areaId" :label="item.areaName" :value="item.areaId" />
          </el-select>
          <el-input v-model="serchinputvalue" class="serchinputvalue" size="small" suffix-icon="el-icon-search" placeholder="搜索" @change="waternamevaluechange" />
        </div>
        <div class="selectlist">
          <el-select v-model="projectgmvalue" size="small" placeholder="请选择" @change="projectgmvaluechange">
            <el-option v-for="item in projectgm" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <div class="hr-line-div" />
          <el-select v-model="projectstatusvalue" size="small" placeholder="请选择" @change="projectstatusvaluechange">
            <el-option v-for="item in projectstatuslist" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <div class="hr-line-div" />
          <el-select v-model="projectJdlistvalue" size="small" placeholder="请选择" @change="projectJdlistvaluechange">
            <el-option v-for="item in projectJdlist" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <div class="hr-line-div" />
        </div>
        <div class="contentlist">
          <div v-for="(item,index) in waterlist" :key="index">
            <div>
              <div><img src="../../assets/homepage/onemapimages/river.jpg"></div>
              <div>
                <div><span v-text="item.reservoirName" /><span v-text="item.scope" /><span v-text="item.evalResult" /></div>
                <div><span><i class="el-icon-s-custom" /></span><span v-text="item.administrator" /></div>
                <div><span><i class="el-icon-location-information" /></span><span v-text="item.address" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="toptabactiveindex==2" class="tabsecond">
        <div class="projectbodytype">
          <div :class="{projectbodytypeactive:projectbodytype==''}" @click="changeprojecttab('')">在建项目</div>
          <!-- <div :class="{projectbodytypeactive:projectbodytype==2}" @click="changeprojecttab(2)">重大项目</div> -->
          <div :class="{projectbodytypeactive:projectbodytype==1}" @click="changeprojecttab(1)">民生实时项目</div>
        </div>
        <div class="selectsearch">
          <el-input v-model="buildserchinputvalue" class="serchinputvalue" size="small" suffix-icon="el-icon-search" placeholder="搜索" @change="changebuildserchinputvalue" />
        </div>
        <div class="selectlist" :class="projectbodytype==1?'selectlist_v':''">
          <el-select v-model="buildregionvalue" size="small" placeholder="请选择区划" @change="changebuildregionvalue">
            <el-option v-for="item in regionoptions" :key="item.areaId" :label="item.areaName" :value="item.areaId" />
          </el-select>
          <div v-if="projectbodytype==1" class="hr-line-div" />
          <el-select v-if="projectbodytype==1" v-model="peoplestauts" size="small" placeholder="请选择区划" @change="changepeoplestautsvalue">
            <el-option v-for="item in peoplestautslist" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <div class="hr-line-div" />
          <el-select v-model="yeartimevalue" size="small" placeholder="请选择区划" @change="changeyeartimevalue">
            <el-option v-for="item in timelistoptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="contentlist">
          <div v-for="(item,index) in buildtable" :key="index">
            <div>
              <div><span v-text="item.reservoirName" /><span v-text="item.statusName">施工期</span></div>
              <div><span>{{ item.fundRate }}%</span><span>/{{ item.fundNum }}万元</span><span v-text="item.investNum" /></div>
              <div><el-progress :text-inside="true" :stroke-width="11" :percentage="item.fundRate" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetcharealistdata_present, fetcharealistdata_last, fetchmaploacldata, fetchmaploacldata_detail, fecthbuildprojectdata } from '../../api/homepage'
export default {
  name: 'OneMapPage',
  data() {
    return {
      page: {
        row: '10',
        current: 1,
        total: 0
      },
      areaId: 2678,
      toptabactiveindex: '1',
      waterbodytype: '3',
      // 地图搜索
      regionvalue: 2678,
      regionoptions: [],
      watergradevalue: '',
      watergradeoptions: [{ value: '', label: '全部等级' }],
      serchinputvalue: '',
      waterlist: [],
      // 项目管理
      projectbodytype: '',
      // 工程规模
      projectgm: [{ value: '1,2,3,4', label: '全部规模' }, { value: '1', label: '大型' }, { value: '2', label: '中型' }, { value: '3', label: '小（1）型' }, { value: '4', label: '小（2）型' }],
      projectgmvalue: '1,2,3,4',
      projectstatuslist: [{ value: '', label: '全部除险加固水库' }, { value: '1', label: '未开工' }, { value: '2', label: '已开工' }, { value: '3', label: '已完工' }, { value: '4', label: '已竣工' }],
      projectstatusvalue: '',
      projectJdlist: [{ value: '', label: '全部鉴定类型' }, { value: '1', label: '一类坝' }, { value: '2', label: '二类坝' }, { value: '3', label: '三类坝' }, { value: '4', label: '加固五年内' }, { value: '5', label: '逾期未鉴定' }, { value: '6', label: '新建未鉴定' }],
      projectJdlistvalue: '',
      countList: [],
      reservoirLayer: [],
      pageVO: [],
      // 地图
      map: '',
      markers_1: [],
      infoWindow: '',
      title: '',
      content: '',
      markers: [],
      markersMid: [],
      areaIdvalue: '',
      mapzoomvalue: 9,
      // 在建项目
      buildregionvalue: 2678,
      buildserchinputvalue: '',
      yeartimevalue: 2020,
      timelistoptions: [{ value: 2020, label: '2020年' }, { value: 2019, label: '2019年' }, { value: 2018, label: '2018年' }, { value: 2017, label: '2017年' }],
      peoplestauts: '',
      peoplestautslist: [{ value: '', label: '全部状态' }, { value: 1, label: '已开工' }, { value: 2, label: '已完工' }, { value: 3, label: '已竣工' }],
      buildtable: []
    }
  },
  computed: {},
  created() {
    this.getAreaGradeList()
    this.fecthvulgarlistdata()
  },
  mounted() {
    this.init()
  },
  methods: {
    // 基础信息
    regionvaluechange() {
      this.map.setZoomAndCenter(9, [118.65209961, 29.86855625])
      this.areaId = this.regionvalue
      this.mapZoomend()
    },
    projectgmvaluechange() {
      this.mapZoomend()
    },
    projectstatusvaluechange() {
      this.mapZoomend()
    },
    projectJdlistvaluechange() {
      this.mapZoomend()
    },
    waternamevaluechange() {
      this.mapZoomend()
    },
    // 项目管理
    changebuildserchinputvalue() {
      if (this.projectbodytype === '') {
        this.buildproject()
      } else {
        this.peopleloacldata()
      }
    },
    changebuildregionvalue() {
      if (this.projectbodytype === '') {
        this.buildproject()
      } else {
        this.peopleloacldata()
      }
    },
    changepeoplestautsvalue() {
      this.peopleloacldata()
    },
    changeyeartimevalue() {
      if (this.projectbodytype === '') {
        this.buildproject()
      } else {
        this.peopleloacldata()
      }
    },
    // 获取区划
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
    // 低层级获取坐标
    fecthvulgarlistdata() {
      fetchmaploacldata({ areaId: this.areaId, reservoirType: this.waterbodytype, forceStatus: this.projectstatusvalue, evalResult: this.projectJdlistvalue, reservoirName: this.serchinputvalue, scopes: this.projectgmvalue, pageNum: this.page.current, pageSize: this.page.row }).then(res => {
        this.countList = res.countList
        this.waterlist = res.pageVO.list
        this.getNum(this.countList)
      })
    },
    // 高层级获取坐标
    fecthheightlistdata() {
      fetchmaploacldata_detail({ areaId: this.areaId, reservoirType: this.waterbodytype, forceStatus: this.projectstatusvalue, evalResult: this.projectJdlistvalue, reservoirName: this.serchinputvalue, scopes: this.projectgmvalue, pageNum: this.page.current, pageSize: this.page.row }).then(res => {
        this.countList = res.reservoirLayer
        this.waterlist = res.pageVO.list
        this.getNum(this.countList)
        this.getInfo(this.countList)
      })
    },
    // 在建项目
    buildproject() {
      fecthbuildprojectdata({ areaId: this.buildregionvalue, forceName: this.buildserchinputvalue, progressStatus: 1, year: this.yeartimevalue }).then(res => {
        this.buildprojectmap(res.list)
      })
      fecthbuildprojectdata({ areaId: this.buildregionvalue, forceName: this.buildserchinputvalue, progressStatus: 1, year: this.yeartimevalue, map: '1', pageSize: this.page.row, pageNum: this.page.current }).then(res => {
        this.buildtable = res
        console.log(this.buildtable)
      })
    },
    // 民生实事
    peopleloacldata() {
      fecthbuildprojectdata({ areaId: this.buildregionvalue, forceName: this.buildserchinputvalue, assessType: 1, year: this.yeartimevalue }).then(res => {
        this.peoplemaplocal(res.list)
      })
      fecthbuildprojectdata({ areaId: this.buildregionvalue, forceName: this.buildserchinputvalue, progressStatus: 1, year: this.yeartimevalue, map: '1', pageSize: this.page.row, pageNum: this.page.current }).then(res => {
        this.buildtable = res
        console.log(this.buildtable)
      })
    },
    // tab切换
    changetoptab(v) {
      this.toptabactiveindex = v
      if (v === 1) {
        this.queryvaluebase()
        this.map.setZoomAndCenter(9, [118.65209961, 29.86855625])
        this.fecthvulgarlistdata()
      } else {
        this.map.setZoomAndCenter(9, [118.65209961, 29.86855625])
        this.queryprojectbase()
        this.buildproject()
      }
    },
    // 初始化项目管理
    queryprojectbase() {
      this.buildregionvalue = this.areaId
      this.buildserchinputvalue = ''
      this.yeartimevalue = 2020
      this.projectbodytype = ''
      this.peoplestauts = ''
    },
    // 初始化基础信息
    queryvaluebase() {
      this.regionvalue = this.areaId
      this.serchinputvalue = ''
      this.projectgmvalue = '1,2,3,4'
      this.projectstatusvalue = ''
      this.projectJdlistvalue = ''
    },
    // 基础信息
    changewatertab(v) {
      if (v != 3) {
        this.$message('该功能正在开发中')
        return
      }
      this.waterbodytype = v
    },
    // 项目管理
    changeprojecttab(v) {
      this.queryprojectbase()
      this.projectbodytype = v
      if (v == '') {
        this.buildproject()
      } else {
        this.peopleloacldata()
      }
    },
    // 监听图层变化
    mapZoomend() {
      this.areaId = this.regionvalue
      if (this.map.getZoom() < 10) {
        if (this.toptabactiveindex == 1) {
          this.fecthvulgarlistdata()
        }
      } else {
        if (this.toptabactiveindex == 1) {
          this.fecthheightlistdata()
        }
      }
    },
    getNum(res) {
      res.forEach((marker) => {
        marker = new AMap.Marker({
          content: `<div style="color:#fff;width:64px;height:54px;background:url('http://sk.zhihuihedao.cn/common/public/images/map/point.png') center no-repeat;background-size: cover;text-align: center;font-size:18px;padding-top:10px;line-height:40px">${marker.count}</div>`,
          areaId: marker.areaId, // 增加行政区划ID
          areaName: marker.areaName,
          position: [marker.lon, marker.lat],
          offset: new AMap.Pixel(-13, -30),
          animation: 'AMAP_ANIMATION_DROP',
          clickable: true
        })

        // 给标记点添加点击事件
        marker.on('click', (e) => {
          this.removeMarkers()
          this.map.setZoomAndCenter(10, [e.lnglat.lng, e.lnglat.lat])
          this.areaId = e.target.w.areaId
          this.regionvalue = this.areaId
          this.fecthheightlistdata()
        })
        this.markers.push(marker)
      })
      this.addMarkers()
    },
    getInfo(res) {
      var Icon_one = new AMap.Icon({
        size: new AMap.Size(20, 25),
        image: 'http://192.168.1.128:9528/images/remarks/reserior_04.png',
        offset: new AMap.Pixel(-13, -30),
        imageSize: new AMap.Size(20, 25)
      })
      res.forEach((item) => {
        var marker = new AMap.Marker({
          icon: Icon_one,
          // position: [marker.lon, marker.lat],
          position: new AMap.LngLat(item.lon, item.lat),
          reservoirId: item.reservoirId,
          reservoirName: item.reservoirName,
          offset: new AMap.Pixel(-13, -30),
          animation: 'AMAP_ANIMATION_DROP',
          clickable: true
        })
        marker.setMap(this.map)
        // 设置鼠标划过点标记显示的文字提示
        marker.setTitle(item.reservoirName)
        marker.setLabel({
          offset: new AMap.Pixel(0, 0), // 设置文本标注偏移量
          content: "<div class='info' style='color:black;background:#DCDCDC;border-radius:5px;margin:0px'>" + item.reservoirName + '</div>', // 设置文本标注内容
          direction: 'top' // 设置文本标注方位
        })
        // 给标记点添加点击事件
        marker.on('click', (e) => {
          console.log(e)
        })
        // marker.content = this.createInfoWindow(this.watercoordinatelist[i])
        this.markers.push(marker)
      })
      this.addMarkers()
    },
    buildprojectmap(res) {
      var Icon_one = new AMap.Icon({
        size: new AMap.Size(20, 25),
        image: 'http://192.168.1.128:9528/images/remarks/reserior_03.png',
        offset: new AMap.Pixel(-13, -30),
        imageSize: new AMap.Size(20, 25)
      })
      res.forEach((item) => {
        var marker = new AMap.Marker({
          icon: Icon_one,
          position: new AMap.LngLat(item.lon, item.lat),
          reservoirId: item.reservoirId,
          reservoirName: item.reservoirName,
          offset: new AMap.Pixel(-13, -30),
          animation: 'AMAP_ANIMATION_DROP',
          clickable: true
        })
        marker.setMap(this.map)
        // 设置鼠标划过点标记显示的文字提示
        marker.setTitle(item.reservoirName)
        marker.setLabel({
          offset: new AMap.Pixel(0, 0), // 设置文本标注偏移量
          content: "<div class='info' style='color:black;background:#DCDCDC;border-radius:5px;margin:0px'>" + item.reservoirName + '</div>', // 设置文本标注内容
          direction: 'top' // 设置文本标注方位
        })
        // 给标记点添加点击事件
        marker.on('click', (e) => {
          console.log(e)
        })
        // marker.content = this.createInfoWindow(this.watercoordinatelist[i])
        this.markers.push(marker)
      })
      this.addMarkers()
    },
    peoplemaplocal(res) {
      var Icon_one = new AMap.Icon({
        size: new AMap.Size(20, 25),
        image: 'http://192.168.1.128:9528/images/remarks/alarm_01.png',
        offset: new AMap.Pixel(-13, -30),
        imageSize: new AMap.Size(20, 25)
      })
      res.forEach((item) => {
        var marker = new AMap.Marker({
          icon: Icon_one,
          position: new AMap.LngLat(item.lon, item.lat),
          reservoirId: item.reservoirId,
          reservoirName: item.reservoirName,
          offset: new AMap.Pixel(-13, -30),
          animation: 'AMAP_ANIMATION_DROP',
          clickable: true
        })
        marker.setMap(this.map)
        // 设置鼠标划过点标记显示的文字提示
        marker.setTitle(item.reservoirName)
        marker.setLabel({
          offset: new AMap.Pixel(0, 0), // 设置文本标注偏移量
          content: "<div class='info' style='color:black;background:#DCDCDC;border-radius:5px;margin:0px'>" + item.reservoirName + '</div>', // 设置文本标注内容
          direction: 'top' // 设置文本标注方位
        })
        // 给标记点添加点击事件
        marker.on('click', (e) => {
          console.log(e)
        })
        // marker.content = this.createInfoWindow(this.watercoordinatelist[i])
        this.markers.push(marker)
      })
      this.addMarkers()
    },
    addMarkers() {
      this.removeMarkers()	// 先移除
      this.map.add(this.markers)	// 再加点
      this.markers = []
    },
    removeMarkers() {
      this.map.remove(this.markersMid)
      this.markersMid = this.markers
    },
    // 地图
    init() {
      var that = this
      // 初始化地图
      var imageLayer = new AMap.ImageLayer({
        url: 'http://json.zhihuihedao.cn/common/mapbackground1.png',
        bounds: new AMap.Bounds(
          [118.346812, 29.189361],
          [120.722108, 30.563138]
        ),
        zooms: [5, 17]
      })
      this.map = new AMap.Map('container', {
        zoom: this.mapzoomvalue,
        center: [118.65209961, 29.86855625],
        resizeEnable: false,
        layers: [
          new AMap.TileLayer(),
          imageLayer
        ],
        mapStyle: 'amap://styles/grey'
      })
      this.map.on('zoomend', this.mapZoomend)
      // 添加地图相关控件
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
        that.map.addControl(new AMap.Scale())
      })
      // 获取边界坐标点
      AMap.plugin('AMap.DistrictSearch', () => {
        var districtSearch = new AMap.DistrictSearch({
        // 关键字对应的行政区级别，共有5种级别
          level: 'city',
          //  是否显示下级行政区级数，1表示返回下一级行政区
          subdistrict: 0,
          // 返回行政区边界坐标点
          extensions: 'all'
        })
        // 搜索所有省/直辖市信息
        districtSearch.search('杭州市', (status, result) => {
          // 查询成功时，result即为对应的行政区信息
          this.handlePolygon(result)
        })
      })
      // 弹泡内容结构
      // this.popupcontent()
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true, // 使用自定义窗体
        // content: 'aaa',
        offset: new AMap.Pixel(16, -45)
      })
    },
    handlePolygon(result) {
      const bounds = result.districtList[0].boundaries
      if (bounds) {
        for (let i = 0, l = bounds.length; i < l; i++) {
          // 生成行政区划polygon
          const polygon = new AMap.Polygon({
            map: this.map, // 指定地图对象
            strokeWeight: 1, // 轮廓线宽度
            path: bounds[i], // 轮廓线的节点坐标数组
            fillOpacity: 0.15, // 透明度
            fillColor: '#256edc', // 填充颜色
            strokeColor: '#256edc' // 线条颜色
          })
          polygon.on('click', (e) => {
            console.log(e)
          })
        }
        // 地图自适应(自动居中)
        // this.map.setFitView()
      }
    },
    // 弹出窗体内容
    popupcontent() {
      this.title =
        '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>'
      this.content = []
      this.content.push(
        '<img src="http://tpc.googlesyndication.com/simgad/5843493769827749134">地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里'
      )
      this.content.push('电话：010-64733333')
      this.content.push(
        '<a href="https://ditu.amap.com/detail/B000A8URXB?citycode=110105">详细信息</a>'
      )
    },
    // 构建自定义信息窗体
    createInfoWindow() {
      var info = document.createElement('div')
      info.className = 'custom-info input-card content-window-card'
      // 可以通过下面的方式修改自定义窗体的宽高
      // info.style.width = '400px'
      // 定义顶部标题
      var top = document.createElement('div')
      var titleD = document.createElement('div')
      var closeX = document.createElement('img')
      top.className = 'info-top'
      titleD.innerHTML = this.title
      closeX.src = 'https://webapi.amap.com/images/close2.gif'
      closeX.onclick = this.closeInfoWindow
      top.appendChild(titleD)
      top.appendChild(closeX)
      info.appendChild(top)
      // 定义中部内容
      var middle = document.createElement('div')
      middle.className = 'info-middle'
      middle.style.backgroundColor = 'white'
      middle.innerHTML = this.content
      info.appendChild(middle)
      // 定义底部内容
      var bottom = document.createElement('div')
      bottom.className = 'info-bottom'
      bottom.style.position = 'relative'
      bottom.style.top = '0px'
      bottom.style.margin = '0 auto'
      var sharp = document.createElement('img')
      sharp.src = 'https://webapi.amap.com/images/sharp.png'
      bottom.appendChild(sharp)
      info.appendChild(bottom)
      return info
    },
    // 关闭信息窗体
    closeInfoWindow() {
      this.map.clearInfoWindow()
    }
  }
}
</script>
<style lang='scss' scoped>
.onemappage {
  width: 1920px;
  height: 1031px;
  position: absolute;
  .leftbox {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 500px;
    height: 990px;
    overflow: hidden;
    overflow-x: hidden;
    background: url("../../assets/homepage/onemapimages/picture_05.png") no-repeat
      0px 0px;
    .toptab {
      width: 100%;
      height: 32px;
      > span {
        display: inline-block;
        width: 50%;
        height: 32px;
        line-height: 32px;
        text-align: center;
        cursor: pointer;
        font-size: 16px;
        color: #b8c1ca;
      }
      .toptabactive {
        background: url("../../assets/homepage/onemapimages/picture_06.png")
          no-repeat 0px 0px;
        color: #fff;
      }
    }
    .tabfirst {
      .waterbodytype {
        padding: 0px 20px;
        height: 33px;
        border-bottom: 1px solid #0173e4;
        margin-top: 24px;
        > div {
          float: left;
          width: 90px;
          height: 32px;
          border: 1px solid rgb(1, 115, 228, 0.3);
          text-align: center;
          line-height: 32px;
          font-size: 15px;
          cursor: pointer;
          background: rgb(1, 115, 228, 0.07);
          -webkit-box-shadow: 0px 0px 10px rgba(112, 182, 253, 0.3) inset;
          -moz-box-shadow: 0px 0px 10px rgb(1, 115, 228, 0.3) inset;
          box-shadow: 0px 0px 10px rgb(1, 115, 228, 0.3) inset;
        }
        > div:nth-child(2) {
          margin: 0 7px;
        }
        .waterbodytypeactive {
          border: 1px solid #0173e4;
          border-bottom: none;
          -webkit-box-shadow: 0px 0px 13px #0173e4 inset;
          -moz-box-shadow: 0px 0px 13px #0173e4 inset;
          box-shadow: 0px 0px 13px #0173e4 inset;
        }
      }
      .selectsearch {
        padding: 0px 20px;
        height: 65px;
        .el-select {
          width: 109px;
          top: 15px;
          float: left;
        }
        .select_fl {
          margin: 0px 16px 0px 8px !important;
        }
        .serchinputvalue {
          width: 330px;
          float: left;
          top: 15px;
          margin-left: 20px;
        }
        .el-button{
          height: 34px;
          line-height: 9px;
          margin-top: 15px;
          margin-left: 20px;
          background: (225,225,225,0.00);
          color: #fff;
        }
      }
      .selectlist {
        width: 499px;
        height: 34px;
        border-top: 1px solid #026bd7 !important;
        border-bottom: 1px solid #026bd7 !important;
        .el-select {
          width: 165px;
          float: left;
        }
        .hr-line-div {
          height: 100%;
          width: 1px;
          float: left;
          background: -webkit-linear-gradient(#0b2036, #016ad6, #0b2036);
          background: -o-linear-gradient(#0b2036, #016ad6, #0b2036);
          background: -moz-linear-gradient(#0b2036, #016ad6, #0b2036);
          background: -mos-linear-gradient(#0b2036, #016ad6, #0b2036);
          background: linear-gradient(#0b2036, #016ad6, #0b2036);
        }
      }
      .contentlist {
        height: 780px;
        width: 520px;
        overflow-x: hidden;
        > div {
          width: 500px;
          height: 130px;
          > div {
            padding: 20px 27px;
            height: 90px;
            margin: 0 auto;
            > div:nth-child(1) {
              float: left;
              width: 90px;
              height: 90px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            > div:nth-child(2) {
              float: left;
              width: 330px;
              height: 100%;
              margin-left: 16px;
              > div:nth-child(1) {
                height: 34px;
                > span {
                  display: inline-block;
                  float: left;
                }
                > span:nth-child(1) {
                  min-width: 100px;
                  text-align: left;
                  font-size: 19px;
                }
                > span:nth-child(2) {
                  width: 70px;
                  height: 25px;
                  line-height: 25px;
                  background: url("../../assets/homepage/onemapimages/picture_01.png")
                    no-repeat 0px 0px;
                  text-align: center;
                  font-size: 14px;
                  color: #0ce5ea;
                  margin: 0 8px;
                }
                > span:nth-child(3) {
                  width: 70px;
                  height: 25px;
                  line-height: 25px;
                  background: url("../../assets/homepage/onemapimages/picture_01.png")
                    no-repeat 0px 0px;
                  text-align: center;
                  font-size: 14px;
                  color: #0ce5ea;
                }
              }
              > div:nth-child(2) {
                height: 28px;
                line-height: 28px;
                > span:nth-child(1) {
                  .el-icon-s-custom {
                    color: #c5d6ed;
                  }
                }
                > span:nth-child(2) {
                  margin-left: 10px;
                  color: #c5d6ed;
                  font-size: 13px;
                }
              }
              > div:nth-child(3) {
                height: 28px;
                line-height: 28px;
                > span:nth-child(1) {
                  .el-icon-location-information {
                    color: #c5d6ed;
                  }
                }
                > span:nth-child(2) {
                  margin-left: 10px;
                  color: #c5d6ed;
                  font-size: 13px;
                }
              }
            }
          }
        }
        > div:nth-child(even) {
          // background: #1d5e82;
          // background: rgb(36, 88, 117, 0.52);
          background: -webkit-linear-gradient(
            left bottom,
            #1d5e82,
            rgb(36, 88, 117, 0.12)
          );
          background: -o-linear-gradient(
            left bottom,
            #1d5e82,
            rgb(36, 88, 117, 0.12)
          );
          background: -mos-linear-gradient(
            left bottom,
            #1d5e82,
            rgb(36, 88, 117, 0.12)
          );
          background: -moz-linear-gradient(
            left bottom,
            #1d5e82,
            rgb(36, 88, 117, 0.12)
          );
          background: linear-gradient(
            left bottom,
            #1d5e82,
            rgb(36, 88, 117, 0.12)
          );
        }
      }
    }
    .tabsecond{
       .projectbodytype {
        padding: 0px 20px;
        height: 33px;
        border-bottom: 1px solid #0173e4;
        margin-top: 24px;
        > div {
          float: left;
          min-width: 65px;
          height: 32px;
          border: 1px solid rgb(1, 115, 228, 0.3);
          text-align: center;
          line-height: 32px;
          font-size: 15px;
          padding: 0 10px;
          cursor: pointer;
          background: rgb(1, 115, 228, 0.07);
          -webkit-box-shadow: 0px 0px 10px rgba(112, 182, 253, 0.3) inset;
          -moz-box-shadow: 0px 0px 10px rgb(1, 115, 228, 0.3) inset;
          box-shadow: 0px 0px 10px rgb(1, 115, 228, 0.3) inset;
        }
        > div:nth-child(2) {
          margin: 0 7px;
        }
        .projectbodytypeactive {
          border: 1px solid #0173e4;
          border-bottom: none;
          -webkit-box-shadow: 0px 0px 13px #0173e4 inset;
          -moz-box-shadow: 0px 0px 13px #0173e4 inset;
          box-shadow: 0px 0px 13px #0173e4 inset;
        }
      }
       .selectsearch {
        padding: 0px 20px;
        height: 65px;
        .serchinputvalue {
          top: 15px;
        }
      }
      .selectlist {
        width: 499px;
        height: 34px;
        border-top: 1px solid #026bd7 !important;
        border-bottom: 1px solid #026bd7 !important;
        .el-select {
          width: 248px;
          float: left;
        }
        .hr-line-div {
          height: 100%;
          width: 1px;
          float: left;
          background: -webkit-linear-gradient(#0b2036, #016ad6, #0b2036);
          background: -o-linear-gradient(#0b2036, #016ad6, #0b2036);
          background: -moz-linear-gradient(#0b2036, #016ad6, #0b2036);
          background: -mos-linear-gradient(#0b2036, #016ad6, #0b2036);
          background: linear-gradient(#0b2036, #016ad6, #0b2036);
        }
      }
      .selectlist_v{
        width: 499px;
        height: 34px;
        border-top: 1px solid #026bd7 !important;
        border-bottom: 1px solid #026bd7 !important;
        .el-select {
          width: 165px!important;
          float: left;
        }
        .hr-line-div {
          height: 100%;
          width: 1px;
          float: left;
          background: -webkit-linear-gradient(#0b2036, #016ad6, #0b2036);
          background: -o-linear-gradient(#0b2036, #016ad6, #0b2036);
          background: -moz-linear-gradient(#0b2036, #016ad6, #0b2036);
          background: -mos-linear-gradient(#0b2036, #016ad6, #0b2036);
          background: linear-gradient(#0b2036, #016ad6, #0b2036);
        }
      }
      .contentlist {
        height: 780px;
        width: 520px;
        overflow-x: hidden;
        > div {
          width: 500px;
          height: 130px;
          > div {
            padding: 20px 27px;
            height: 90px;
            margin: 0 auto;
            > div:nth-child(1) {
              width: 100%;
              height: 32px;
              >span{
                display: inline-block;
              }
              >span:nth-child(1){
                width: 320px;
                line-height: 32px;
                font-size: 18px;
              }
              >span:nth-child(2){
                 width: 70px;
                 height: 25px;
                 line-height: 25px;
                 background: url("../../assets/homepage/onemapimages/picture_01.png") no-repeat 0px 0px;
                 text-align: center;
                 font-size: 14px;
                 color: #0ce5ea;
                 margin: 3px 8px;
              }
            }
            > div:nth-child(2) {
              height: 19px;
              margin-top: 18px;
              line-height: 19px;
              >span:nth-child(1){
                float:left;
                font-family: "PangMenZhengDaoBiaoTiTi";
                font-size: 18px;
                color: #0cd9df;
              }
              >span:nth-child(2){
                float: right;
                font-family: "PangMenZhengDaoBiaoTiTi";
                color: #758eaf;
                font-size: 16px;
              }
               >span:nth-child(3){
                float: right;
                font-family: "PangMenZhengDaoBiaoTiTi";
                color: #0cd9df;
                font-size: 16px;
              }
            }
          }
        }
        > div:nth-child(even) {
          // background: #1d5e82;
          // background: rgb(36, 88, 117, 0.52);
          background: -webkit-linear-gradient(
            left bottom,
            #1d5e82,
            rgb(36, 88, 117, 0.12)
          );
          background: -o-linear-gradient(
            left bottom,
            #1d5e82,
            rgb(36, 88, 117, 0.12)
          );
          background: -mos-linear-gradient(
            left bottom,
            #1d5e82,
            rgb(36, 88, 117, 0.12)
          );
          background: -moz-linear-gradient(
            left bottom,
            #1d5e82,
            rgb(36, 88, 117, 0.12)
          );
          background: linear-gradient(
            left bottom,
            #1d5e82,
            rgb(36, 88, 117, 0.12)
          );
        }
      }
    }
  }
}
</style>
<style lang='scss'>
.selectsearch {
  .el-select {
    .el-input {
      border: 1px solid #047bb1;
      .el-input__inner {
        background-color: rgba(92, 100, 119, 0.24) !important;
        border-color: #4e5b85 !important;
        border-radius: 0 !important;
        color: #fff;
      }
    }
    .is-focus {
      border: 1px solid #0ce5ea;
    }
  }
}
.el-select-dropdown {
  border: 1px solid #047bb1;
  background-color: rgba(4, 123, 177, 0.86) !important;
  .el-select-dropdown__item.hover {
    background-color: rgba(4, 123, 177, 0.86) !important;
  }
  .el-select-dropdown__item {
    color: #fff;
  }
}
.serchinputvalue {
  .el-input__inner {
    border-radius: 0px;
    border: 1px solid #047bb1;
    background-color: rgba(225, 225, 225, 0.01) !important;
    color: #fff;
    height: 34px;
    text-align: left;
  }
  .el-icon-search {
    font-size: 16px;
  }
}
.selectlist {
  .el-input__inner {
    background-color: rgba(12, 32, 56, 0.26) !important;
    border: none;
    color: #fff;
    text-align: center;
  }
}
.contentlist{
   .el-progress-bar__outer{
     background-color: #0f3880;
     .el-progress-bar__inner{
        background: -webkit-linear-gradient(
            left bottom,
            #0f3d83,
            #00e2f0
          );
          background: -o-linear-gradient(
            left bottom,
             #0f3d83,
            #00e2f0
          );
          background: -mos-linear-gradient(
            left bottom,
             #0f3d83,
            #00e2f0
          );
          background: -moz-linear-gradient(
            left bottom,
             #0f3d83,
            #00e2f0
          );
          background: linear-gradient(
            left bottom,
             #0f3d83,
            #00e2f0
          );
          .el-progress-bar__innerText{
            display: none;
          }
     }
   }
}

</style>

