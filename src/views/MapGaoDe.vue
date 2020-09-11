<template>
  <div style="width:100%; height:995px">
    <div id="container" style="width:100%; height:100%" />
    <div class="input-card">
      <el-button type="info" @click="removeMarkers()">清除标记点</el-button>
      <el-button type="primary" @click="addMarkers()">添加标记点</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      datalist: [
        {
          reachId: '1567',
          startLon: '120.286927',
          startLat: '29.986895',
          isRiver: '0',
          reachName: '新江岭中心河'
        },
        {
          reachId: '971',
          startLon: '120.41334',
          startLat: '30.18276',
          isRiver: '0',
          reachName: '民丰河'
        },
        {
          reachId: '3406',
          startLon: '120.187151',
          startLat: '30.070764',
          isRiver: '0',
          reachName: '浦阳江（义桥段）'
        },
        {
          reachId: '1111',
          startLon: '120.217002869',
          startLat: '29.9951',
          isRiver: '0',
          reachName: '浦南南河'
        },
        {
          reachId: '1041',
          startLon: '120.525144',
          startLat: '30.214396',
          isRiver: '0',
          reachName: '大东南湾'
        },
        {
          reachId: '3465',
          startLon: '120.077152',
          startLat: '30.102372',
          isRiver: '0',
          reachName: '三号浦（双浦段）'
        },
        {
          reachId: '1018',
          startLon: '120.22445',
          startLat: '29.96826',
          isRiver: '0',
          reachName: '紫湖新开河'
        },
        {
          reachId: '2168',
          startLon: '119.811095',
          startLat: '30.268004',
          isRiver: '0',
          reachName: '童村溪'
        },
        {
          reachId: '3421',
          startLon: '120.291819',
          startLat: '30.212721',
          isRiver: '0',
          reachName: '前解放河（宁围段）'
        },
        {
          reachId: '1022',
          startLon: '120.243295',
          startLat: '30.068937',
          isRiver: '0',
          reachName: '大庄后河'
        },
        {
          reachId: '2223',
          startLon: '119.294156',
          startLat: '30.224157',
          isRiver: '0',
          reachName: '浪山溪'
        },
        {
          reachId: '1048',
          startLon: '120.570056',
          startLat: '30.199252',
          isRiver: '0',
          reachName: '镇龙殿湾'
        },
        {
          reachId: '3278',
          startLon: '119.381542',
          startLat: '30.156861',
          isRiver: '0',
          reachName: '太阳溪於潜镇'
        },
        {
          reachId: '3438',
          startLon: '120.479643',
          startLat: '30.229126',
          isRiver: '0',
          reachName: '生产湾（靖江段）'
        },
        {
          reachId: '3730',
          startLon: '120.451449',
          startLat: '30.282856',
          isRiver: '0',
          reachName: '永丰直河（南阳段）'
        },
        {
          reachId: '2184',
          startLon: '119.724486',
          startLat: '30.106655',
          isRiver: '0',
          reachName: '三口水'
        },
        {
          reachId: '1591',
          startLon: '120.183045',
          startLat: '30.107225',
          isRiver: '0',
          reachName: '桶盘丘河'
        },
        {
          reachId: '2024',
          startLon: '120.3797679716',
          startLat: '30.1718863971',
          isRiver: '0',
          reachName: '郭家埠直河'
        },
        {
          reachId: '2708',
          startLon: '119.202462',
          startLat: '30.222333',
          isRiver: '0',
          reachName: '沿水坑溪'
        },
        {
          reachId: '3703',
          startLon: '',
          startLat: '',
          isRiver: '0',
          reachName: '官河（衙前段）'
        },
        {
          reachId: '3740',
          startLon: '120.343902',
          startLat: '30.231336',
          isRiver: '0',
          reachName: '九号坝直河（开发区段2）'
        },
        {
          reachId: '2255',
          startLon: '119.083026',
          startLat: '30.260502',
          isRiver: '0',
          reachName: '桃花溪'
        },
        {
          reachId: '3605',
          startLon: '120.302348',
          startLat: '30.504992',
          isRiver: '0',
          reachName: '喜庵港（运河街道）'
        },
        {
          reachId: '2017',
          startLon: '120.195836',
          startLat: '30.918118',
          isRiver: '0',
          reachName: '蒋沈河（新塘段）'
        },
        {
          reachId: '3449',
          startLon: '118.960911',
          startLat: '30.001379',
          isRiver: '0',
          reachName: '梅川溪'
        },
        {
          reachId: '1130',
          startLon: '120.299999',
          startLat: '29.950641',
          isRiver: '0',
          reachName: '欢潭直河'
        },
        {
          reachId: '1830',
          startLon: '120.318456',
          startLat: '30.311982',
          isRiver: '0',
          reachName: '5号渠'
        },
        {
          reachId: '1077',
          startLon: '120.123658',
          startLat: '30.095685',
          isRiver: '0',
          reachName: '金家河'
        },
        {
          reachId: '3407',
          startLon: '120.304462',
          startLat: '30.195867',
          isRiver: '0',
          reachName: '北塘河（新街段）'
        },
        {
          reachId: '1587',
          startLon: '120.497279',
          startLat: '30.217079',
          isRiver: '0',
          reachName: '黄公娄湾（靖江段）'
        },
        {
          reachId: '3716',
          startLon: '120.41274',
          startLat: '30.19231',
          isRiver: '0',
          reachName: '坎山直河（瓜沥段）'
        },
        {
          reachId: '3694',
          startLon: '120.215092',
          startLat: '30.368168',
          isRiver: '0',
          reachName: '上塘河（江干段）'
        },
        {
          reachId: '973',
          startLon: '120.135301',
          startLat: '30.94401',
          isRiver: '0',
          reachName: '下湘湖河'
        },
        {
          reachId: '3422',
          startLon: '120.342514',
          startLat: '30.196749',
          isRiver: '0',
          reachName: '前解放河（新街段）'
        },
        {
          reachId: '1155',
          startLon: '120.454203',
          startLat: '30.232754',
          isRiver: '0',
          reachName: '靖东横河'
        },
        {
          reachId: '1562',
          startLon: '120.131256',
          startLat: '30.112297',
          isRiver: '0',
          reachName: '西兴直河'
        },
        {
          reachId: '1840',
          startLon: '120.3321506539',
          startLat: '30.3023436818',
          isRiver: '0',
          reachName: '1号渠'
        },
        {
          reachId: '9440',
          startLon: '120.450646',
          startLat: '30.246406',
          isRiver: '0',
          reachName: '靖港七字河'
        },
        {
          reachId: '3746',
          startLon: '120.147532',
          startLat: '29.999773',
          isRiver: '0',
          reachName: '七都溪（戴村段）'
        },
        {
          reachId: '2192',
          startLon: '119.529238',
          startLat: '30.226404',
          isRiver: '0',
          reachName: '宋家溪天目山镇段'
        },
        {
          reachId: '855',
          startLon: '120.250624',
          startLat: '30.193986',
          isRiver: '0',
          reachName: '五七直河(开发区段)'
        },
        {
          reachId: '3732',
          startLon: '120.440044',
          startLat: '30.300047',
          isRiver: '0',
          reachName: '一工段横河（南阳段）'
        },
        {
          reachId: '1054',
          startLon: '120.558858',
          startLat: '30.154055',
          isRiver: '0',
          reachName: '塘南内河'
        },
        {
          reachId: '3705',
          startLon: '120.180125',
          startLat: '30.092847',
          isRiver: '0',
          reachName: '里自横河（新塘城市河道）'
        },
        {
          reachId: '997',
          startLon: '120.497279',
          startLat: '30.217079',
          isRiver: '0',
          reachName: '清水湾'
        },
        {
          reachId: '2025',
          startLon: '',
          startLat: '',
          isRiver: '0',
          reachName: '北海塘河（衙前段）'
        },
        {
          reachId: '972',
          startLon: '120.23939',
          startLat: '29.96095',
          isRiver: '0',
          reachName: '三湖闸河'
        },
        {
          reachId: '2694',
          startLon: '120.548085',
          startLat: '30.216011',
          isRiver: '0',
          reachName: '老车路湾'
        },
        {
          reachId: '874',
          startLon: '120.28872202411232',
          startLat: '30.19273306726234',
          isRiver: '0',
          reachName: '北塘河（北干段）'
        },
        {
          reachId: '3392',
          startLon: '120.159333',
          startLat: '30.093008',
          isRiver: '0',
          reachName: '钱塘江（义桥段）'
        },
        {
          reachId: '2018',
          startLon: '120.317476',
          startLat: '30.180552',
          isRiver: '0',
          reachName: '山南河'
        },
        {
          reachId: '2208',
          startLon: '119.391319',
          startLat: '30.271082',
          isRiver: '0',
          reachName: '朱湾溪'
        },
        {
          reachId: '982',
          startLon: '120.2556833',
          startLat: '30.17855',
          isRiver: '0',
          reachName: '施家桥河'
        },
        {
          reachId: '2011',
          startLon: '120.301514',
          startLat: '30.015751',
          isRiver: '0',
          reachName: '华锋溪'
        },
        {
          reachId: '3408',
          startLon: '120.36281',
          startLat: '30.19055',
          isRiver: '0',
          reachName: '北塘河（瓜沥段）'
        },
        {
          reachId: '1000',
          startLon: '120.234358',
          startLat: '30.186401',
          isRiver: '0',
          reachName: '大浦河'
        },
        {
          reachId: '3707',
          startLon: '120.52445',
          startLat: '30.18818',
          isRiver: '0',
          reachName: '梅林湾（瓜沥段）'
        },
        {
          reachId: '2169',
          startLon: '119.809746',
          startLat: '30.22588',
          isRiver: '0',
          reachName: '朱村溪'
        },
        {
          reachId: '1003',
          startLon: '120.2497',
          startLat: '30.190498',
          isRiver: '0',
          reachName: '塘南河'
        },
        {
          reachId: '3424',
          startLon: '120.49216',
          startLat: '30.17188',
          isRiver: '0',
          reachName: '盛陵湾（瓜沥段）'
        },
        {
          reachId: '2224',
          startLon: '119.275416',
          startLat: '30.105424',
          isRiver: '0',
          reachName: '锦坑溪太阳镇段'
        },
        {
          reachId: '1023',
          startLon: '120.29078',
          startLat: '30.183237',
          isRiver: '0',
          reachName: '墩里吴河'
        },
        {
          reachId: '3711',
          startLon: '120.550039',
          startLat: '30.171242',
          isRiver: '0',
          reachName: '大林湾（益农段）'
        },
        {
          reachId: '3279',
          startLon: '119.818025',
          startLat: '30.257511',
          isRiver: '0',
          reachName: '青山水库下游河道青山湖街道段'
        },
        {
          reachId: '902',
          startLon: '120.183228',
          startLat: '30.103701',
          isRiver: '0',
          reachName: '山南河（城区河道段）'
        },
        {
          reachId: '3790',
          startLon: '120.204701',
          startLat: '30.106471',
          isRiver: '0',
          reachName: '南庄王西河（新塘段）'
        },
        {
          reachId: '904',
          startLon: '120.173117',
          startLat: '30.946382',
          isRiver: '0',
          reachName: '南官河（城市河道段）'
        },
        {
          reachId: '3733',
          startLon: '120.46107',
          startLat: '30.264081',
          isRiver: '0',
          reachName: '南阳横河（南阳段）'
        },
        {
          reachId: '2185',
          startLon: '119.750702',
          startLat: '30.117982',
          isRiver: '0',
          reachName: '花桥溪'
        },
        {
          reachId: '907',
          startLon: '120.172001',
          startLat: '30.746241',
          isRiver: '0',
          reachName: '王有史直河'
        },
        {
          reachId: '3737',
          startLon: '120.36159',
          startLat: '30.18723',
          isRiver: '0',
          reachName: '大治河（瓜沥段）'
        },
        {
          reachId: '2240',
          startLon: '119.186056',
          startLat: '30.085002',
          isRiver: '0',
          reachName: '浪川溪'
        }
      ],
      datalists: [
        {
          reachId: '1567',
          startLon: 120.286927,
          startLat: 29.986895,
          isRiver: '0',
          reachName: '新江岭中心河'
        },
        {
          reachId: '971',
          startLon: 120.41334,
          startLat: 30.18276,
          isRiver: '0',
          reachName: '民丰河'
        },
        {
          reachId: '3406',
          startLon: 120.187151,
          startLat: 30.070764,
          isRiver: '0',
          reachName: '浦阳江（义桥段）'
        }
      ],
      map: '',
      markers_1: [],
      infoWindow: '',
      title: '',
      content: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var that = this
      // 初始化地图
      var imageLayer = new AMap.ImageLayer({
        // url: '../assets/logo.png',
        url: 'http://json.zhihuihedao.cn/common/mapbackground.png',
        bounds: new AMap.Bounds(
          [118.346812, 29.189361],
          [120.390334, 30.563138]
        ),
        zooms: [5, 12]
      }); 1
      this.map = new AMap.Map('container', {
        zoom: 18,
        center: [120.390334, 30.563138],
        resizeEnable: true,
        layers: [
          new AMap.TileLayer(),
          imageLayer
        ],
        mapStyle: 'amap://styles/blue' // 设置地图的显示样式
      })
      this.map.on('click', function(ev) {
        // 触发事件的对象
        // var target = ev.target
        // 触发事件的地理坐标，AMap.LngLat 类型
        var lnglat = ev.lnglat
        // 触发事件的像素坐标，AMap.Pixel 类型
        // var pixel = ev.pixel
        // // 触发事件类型
        // var type = ev.type
        console.log(lnglat)
      })
      // 添加地图相关控件
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
        that.map.addControl(new AMap.ToolBar())
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
      this.popupcontent()
      // 遍历数据坐标展示所有矢量点
      // this.addMarkers()
      // 实例化信息窗体
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true, // 使用自定义窗体
        // content: 'aaa',
        offset: new AMap.Pixel(16, -45)
      })
    },
    handlePolygon(result) {
      console.log(result)
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
        // 地图自适应
        this.map.setFitView()
      }
    },
    // 清除所有矢量点
    removeMarkers() {
      this.map.remove(this.markers_1)
    },
    addMarkers() {
      var that = this
      for (var i = 0; i < this.datalist.length; i++) {
        var marker = new AMap.Marker({
          position: new AMap.LngLat(
            Number(this.datalist[i].startLon),
            Number(this.datalist[i].startLat)
          ),
          // position: [Number(this.datalist[i].startLon), Number(this.datalist[i].startLat)],
          // 将一张图片的地址设置为 icon
          icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
          offset: new AMap.Pixel(-13, -30)
        })
        marker.content = that.createInfoWindow()
        AMap.event.addListener(marker, 'click', function(e) {
          // that.infoWindow.open(that.map, marker.getPosition())
          that.infoWindow.setContent(e.target.content)
          that.infoWindow.open(that.map, e.target.getPosition())
        })
        this.markers_1.push(marker)
      }
      // 将 markers 添加到地图
      this.map.add(this.markers_1)
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
<style>
.amap-icon img {
  width: 25px;
  height: 34px
}
.input-card {
  position: absolute;
  bottom: 10px;
  right: 10px
}
.content-window-card {
  position: relative;
  box-shadow: none;
  bottom: 0;
  left: 0;
  width: auto;
  padding: 0
}
.content-window-card p {
  height: 2rem
}
.custom-info {
  border: solid 1px silver
}
div.info-top {
  position: relative;
  background: none repeat scroll 0 0 #f9f9f9;
  border-bottom: 1px solid #ccc;
  border-radius: 5px 5px 0 0
}
div.info-top div {
  display: inline-block;
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  line-height: 31px;
  padding: 0 10px
}
div.info-top img {
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s
}
div.info-top img:hover {
  box-shadow: 0px 0px 5px #000
}
div.info-middle {
  font-size: 12px;
  padding: 10px 6px;
  line-height: 20px
}
div.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center
}
div.info-bottom img {
  position: relative;
  z-index: 104
}
span {
  margin-left: 5px;
  font-size: 11px
}
.info-middle img {
  float: left;
  margin-right: 6px
}
</style>
