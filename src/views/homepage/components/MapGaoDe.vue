<template>
  <div style="width:100%; height:100%;background: #0e2339;">
    <div id="container" style="width:100%; height:100%" />
  </div>
</template>
<script>
export default {
  props: {
    imgindex: {
      type: Number,
      default: 8
    },
    coordinatelist: {
      type: Array,
      default: null
    },
    watercoordinatelist: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      map: null,
      markers_water: [],
      markers_warn: [],
      removeList: [],
      infoWindow: '',
      title: '',
      content: '',
      watermarker: '',
      waterkuicon_one: null,
      imglist: [
        'http://sk.zhihuihedao.cn/common/public/images/map/waterkumarter.png',
        'http://sk.zhihuihedao.cn/common/public/images/map/waterkumarker_wei.png',
        'http://sk.zhihuihedao.cn/common/public/images/map/nowproject.png',
        'http://sk.zhihuihedao.cn/common/public/images/map/importantproject.png',
        'http://sk.zhihuihedao.cn/common/public/images/map/waterkuproblem.png',
        'http://sk.zhihuihedao.cn/common/public/images/map/waterkumarker_zhi.png',
        'http://sk.zhihuihedao.cn/common/public/images/map/waterkumarter.png',
        'http://sk.zhihuihedao.cn/common/public/images/map/warning.png'
      ],
      imageicon: 'http://sk.zhihuihedao.cn/common/public/images/map/warning.png',
      poputitle: '',
      waterdetails: ''
    }
  },
  watch: {
    imgindex: {
      handler(newValue, oldValue) {
        this.imageicon = this.imglist[newValue - 1]
        this.closeInfoWindow()
      },
      deep: true
    },
    watercoordinatelist: {
      handler(newValue, oldValue) {
        this.addMarkers_v()
      },
      deep: true
    }
  },
  created() {
  },
  mounted() {
    var that = this
    // setTimeout(function() { that.init() }, 1000)
    that.init()
  },
  methods: {
    init() {
      // var that = this
      this.map = new AMap.Map('container', {
        zoom: 9,
        center: [120.153576, 30.287459],
        resizeEnable: true,
        viewMode: '3D',
        pitch: 45,
        layers: [
          new AMap.TileLayer()
        ],
        // mapStyle: 'amap://styles/blue' // 设置地图的显示样式
        mapStyle: 'amap://styles/grey'
      })
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true, // 使用自定义窗体
        // content: 'aaa',
        offset: new AMap.Pixel(16, -45)
      })
    },
    // 清除水库坐标点
    removeWaterMarkers() {
      this.map.remove(this.removeList)
      this.removeList = this.markers_water
    },
    addMarkers_v() {
      var that = this
      this.map.remove(this.markers_water)
      // 创建一个 icon
      var Icon_one = new AMap.Icon({
        size: new AMap.Size(20, 25),
        image: this.imageicon,
        offset: new AMap.Pixel(-13, -30),
        imageSize: new AMap.Size(20, 25)
      })
      // for (var i = 0; i < this.watercoordinatelist.length; i++) {
      this.watercoordinatelist.forEach((item) => {
        var _mark = new AMap.Marker({
          position: new AMap.LngLat(
            Number(item.lon),
            Number(item.lat)
          ),
          animation: 'AMAP_ANIMATION_DROP',
          // 将一张图片的地址设置为 icon
          icon: Icon_one
        })
        _mark.watername = item.reservoirName
        _mark.reservoirId = item.reservoirId
        _mark.setMap(this.map)
        // 设置鼠标划过点标记显示的文字提示
        _mark.setTitle(item.reservoirName)
        _mark.setLabel({
          offset: new AMap.Pixel(0, 0), // 设置文本标注偏移量
          content: "<div class='info' style='color:black;background:#DCDCDC;border-radius:5px;margin:0px;cursor: pointer;'>" + _mark.watername + '</div>', // 设置文本标注内容
          direction: 'top' // 设置文本标注方位
        })
        _mark.content = that.createInfoWindow(item)
        AMap.event.addListener(_mark, 'click', function(e) {
          that.infoWindow.setContent(e.target.content)
          that.infoWindow.open(that.map, e.target.getPosition())
        })
        this.markers_water.push(_mark)
      })
      // 将 markers 添加到地图
      this.removeWaterMarkers()
      this.map.add(this.markers_water)
      this.markers_water = []
    },
    // 构建自定义信息窗体
    createInfoWindow(watercoordinatelist) {
      if (this.imgindex == 1) {
        return this.reservoirdistributionpop(watercoordinatelist)
      } else if (this.imgindex == 2) {
        return this.reservoirwaterlevelpop(watercoordinatelist)
      } else if (this.imgindex == 3) {
        return this.buildprojectpop(watercoordinatelist)
      } else if (this.imgindex == 4) {
        this.removeWaterMarkers()
      } else if (this.imgindex == 5) {
        this.removeWaterMarkers()
      } else if (this.imgindex == 6) {
        return this.waterlevelandqualitypop(watercoordinatelist)
      } else if (this.imgindex == 7) {
        this.removeWaterMarkers()
      } else if (this.imgindex == 8) {
        return this.waterwarnpop(watercoordinatelist)
      }
    },
    // 水库分布弹泡
    reservoirdistributionpop(watercoordinatelist) {
      var info = document.createElement('div')
      info.className = 'custom-info input-card content-window-card distribution'
      // 可以通过下面的方式修改自定义窗体的宽高
      // info.style.width = '400px'
      // 定义顶部标题
      var top = document.createElement('div')
      var titleD = document.createElement('div')
      var closeX = document.createElement('div')
      top.className = 'info-topwarn'
      titleD.innerHTML = ''
      closeX.innerHTML = '✖'
      closeX.className = 'closeX'
      closeX.onclick = this.closeInfoWindow
      top.appendChild(titleD)
      top.appendChild(closeX)
      info.appendChild(top)
      // 定义中部内容
      var middle = document.createElement('div')
      middle.className = 'info-middle'
      middle.style.backgroundColor = 'white'
      middle.innerHTML = '<div><div><span>' + watercoordinatelist.reservoirName + '</span><span>' + watercoordinatelist.scope + '</span><span>' + watercoordinatelist.evalResult +
      '</span></div><div><span>责任人</span><span>' + watercoordinatelist.administrator + '</div></div>'
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
    // 水库水位弹泡
    reservoirwaterlevelpop(watercoordinatelist) {
      var info = document.createElement('div')
      info.className = 'custom-info input-card content-window-card reservoirwaterlevel'
      // 可以通过下面的方式修改自定义窗体的宽高
      // info.style.width = '400px'
      // 定义顶部标题
      var top = document.createElement('div')
      var titleD = document.createElement('div')
      var closeX = document.createElement('div')
      top.className = 'info-topwarn'
      titleD.innerHTML = ''
      closeX.innerHTML = '✖'
      closeX.className = 'closeX'
      closeX.onclick = this.closeInfoWindow
      top.appendChild(titleD)
      top.appendChild(closeX)
      info.appendChild(top)
      // 定义中部内容
      var middle = document.createElement('div')
      middle.className = 'info-middle'
      middle.style.backgroundColor = 'white'
      middle.innerHTML = '<div><div><span>' + watercoordinatelist.reservoirName + '</span><span>' + watercoordinatelist.scope + '</span><span>' + watercoordinatelist.evalResult +
      '</span></div><div><span>实时水位</span><span>' + watercoordinatelist.reservoirRealLevel + 'm</span><span>限讯水位</span><span>' + watercoordinatelist.reservoirFloodLevel + 'm</span></div></div>'
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
    // 在建项目
    buildprojectpop(watercoordinatelist) {
      var info = document.createElement('div')
      info.className = 'custom-info input-card content-window-card reservoirwaterlevel'
      // 可以通过下面的方式修改自定义窗体的宽高
      // info.style.width = '400px'
      // 定义顶部标题
      var top = document.createElement('div')
      var titleD = document.createElement('div')
      var closeX = document.createElement('div')
      top.className = 'info-topwarn'
      titleD.innerHTML = ''
      closeX.innerHTML = '✖'
      closeX.className = 'closeX'
      closeX.onclick = this.closeInfoWindow
      top.appendChild(titleD)
      top.appendChild(closeX)
      info.appendChild(top)
      // 定义中部内容
      var middle = document.createElement('div')
      middle.className = 'info-middle'
      middle.style.backgroundColor = 'white'
      middle.innerHTML = '<div><div><span>' + watercoordinatelist.reservoirName + '</span></div><div><span>项目状态</span><span>' + watercoordinatelist.statusName + '</span></div></div>'
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
    // 水库水质弹泡
    waterlevelandqualitypop(watercoordinatelist) {
      var info = document.createElement('div')
      info.className = 'custom-info input-card content-window-card waterlevelandquality'
      // 可以通过下面的方式修改自定义窗体的宽高
      // info.style.width = '400px'
      // 定义顶部标题
      var top = document.createElement('div')
      var titleD = document.createElement('div')
      var closeX = document.createElement('div')
      top.className = 'info-topwarn'
      titleD.innerHTML = ''
      closeX.innerHTML = '✖'
      closeX.className = 'closeX'
      closeX.onclick = this.closeInfoWindow
      top.appendChild(titleD)
      top.appendChild(closeX)
      info.appendChild(top)
      // 定义中部内容
      var middle = document.createElement('div')
      middle.className = 'info-middle'
      middle.style.backgroundColor = 'white'
      middle.innerHTML = '<div><div><span>' + watercoordinatelist.reservoirName + '</span><span>' + watercoordinatelist.scope + '</span><span>' + watercoordinatelist.evalResult +
      '</span></div><div><span>实时水位</span><span>' + watercoordinatelist.type + '级</span></div></div>'
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
    // 监测预警弹泡
    waterwarnpop(watercoordinatelist) {
      var info = document.createElement('div')
      info.className = 'custom-info input-card content-window-card waterwarn'
      // 可以通过下面的方式修改自定义窗体的宽高
      // info.style.width = '400px'
      // 定义顶部标题
      var top = document.createElement('div')
      var titleD = document.createElement('div')
      var closeX = document.createElement('div')
      top.className = 'info-topwarn'
      titleD.innerHTML = ''
      closeX.innerHTML = '✖'
      closeX.className = 'closeX'
      // closeX.src = 'https://webapi.amap.com/images/close2.gif'
      closeX.onclick = this.closeInfoWindow
      top.appendChild(titleD)
      top.appendChild(closeX)
      info.appendChild(top)
      // 定义中部内容
      var middle = document.createElement('div')
      middle.className = 'info-middle'
      middle.style.backgroundColor = 'white'
      middle.innerHTML = '<div><div><span>' + watercoordinatelist.reservoirName + '</span><span>' + watercoordinatelist.scope + '</span><span>' + watercoordinatelist.evalResult +
      '</span></div><div><span>实时水位</span><span>' + watercoordinatelist.reservoirRealLevel + 'm</span><span>限讯水位</span><span>' + watercoordinatelist.reservoirFloodLevel + 'm</span></div></div>'
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
<style lang='scss'>
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
  padding: 0;
}
.content-window-card p {
  height: 2rem
}

.amap-info-contentContainer{
  width: 422px;
  height: 82px;
  border-radius: 5px;
  .waterwarn {
    position: relative;
    box-shadow: none;
    bottom: 0;
    left: 0;
    width: auto;
    padding: 0;
    .info-topwarn{
      height: 0px;
      .closeX{
       display: inline-block;
       position: absolute;
       right: 20px;
       top: 10px;
       cursor: pointer;
      }
    }
    .info-middle{
       height: 82px;
       width: 100%;
       clear: both;
       text-align: left;
       background-image: url('../../../assets/homepage/onemapimages/warnback.png');
       background-color:rgb(225,225,225,0.00)!important;
      >div{
        height: 100%;
        >div:nth-child(1){
          height: 50%;
          >span{
            display:inline-block;
            height: 100%;
            text-align: center;
            line-height: 30px;
             line-height:50px;
          }
          >span:nth-child(1){
            padding: 0 20px;
            color: #ff6c00;
            font-size: 18px;
          }
          >span:nth-child(2){
            font-size: 13px;
            padding: 0 5px;
            color: #fff;
          }
           >span:nth-child(3){
            font-size: 13px;
            padding: 0 5px;
            color: #fff;
          }
        }
        >div:nth-child(2){
          height: 50%;
          >span{
            display:inline-block;
            text-align: center;
            line-height: 30px;
          }
          >span:nth-child(1){
            padding: 0 20px;
            color: #fff;
            font-size: 14px;
          }
          >span:nth-child(2){
            font-size: 16px;
            padding: 0 5px;
            color: #ef873e;
          }
           >span:nth-child(3){
            font-size: 14px;
            padding: 0 10px;
            color: #fff;
          }
            >span:nth-child(4){
            font-size: 16px;
            padding: 0 5px;
            color: #ef873e;
          }
        }
      }
    }
    .info-bottom{
      img {
        position: absolute;
        z-index: 104;
        top: 0px;
        left: 200px;
      }
    }
  }
  .distribution {
    position: relative;
    box-shadow: none;
    bottom: 0;
    left: 0;
    width: auto;
    padding: 0;
    .info-topwarn{
      height: 0px;
     .closeX{
       display: inline-block;
       position: absolute;
       right: 20px;
       top: 10px;
       cursor: pointer;
      }
    }
    .info-middle{
       height: 82px;
       width: 100%;
       clear: both;
       text-align: left;
       background-image: url('../../../assets/homepage/onemapimages/otherback.png');
       background-color:rgb(225,225,225,0.00)!important;
      >div{
        height: 100%;
        >div:nth-child(1){
          height: 50%;
          >span{
            display:inline-block;
            height: 100%;
            text-align: center;
            line-height: 30px;
             line-height:50px;
          }
          >span:nth-child(1){
            padding: 0 20px;
            color: #00f6ff;
            font-size: 18px;
          }
          >span:nth-child(2){
            font-size: 13px;
            padding: 0 5px;
            color: #fff;
          }
           >span:nth-child(3){
            font-size: 13px;
            padding: 0 5px;
            color: #fff;
          }
        }
        >div:nth-child(2){
          height: 50%;
          >span{
            display:inline-block;
            text-align: center;
            line-height: 30px;
          }
          >span:nth-child(1){
            padding: 0 20px;
            color: #fff;
            font-size: 14px;
          }
          >span:nth-child(2){
            font-size: 16px;
            padding: 0 5px;
            color: #00f6ff;
          }
           >span:nth-child(3){
            font-size: 14px;
            padding: 0 10px;
            color: #fff;
          }
            >span:nth-child(4){
            font-size: 16px;
            padding: 0 5px;
            color: #00f6ff;
          }
        }
      }
    }
    .info-bottom{
      img {
        position: absolute;
        z-index: 104;
        top: 0px;
        left: 200px;
      }
    }
  }
  .reservoirwaterlevel {
    position: relative;
    box-shadow: none;
    bottom: 0;
    left: 0;
    width: auto;
    padding: 0;
    .info-topwarn{
      height: 0px;
     .closeX{
       display: inline-block;
       position: absolute;
       right: 20px;
       top: 10px;
       cursor: pointer;
      }
    }
    .info-middle{
       height: 82px;
       width: 100%;
       clear: both;
       text-align: left;
       background-image: url('../../../assets/homepage/onemapimages/otherback.png');
       background-color:rgb(225,225,225,0.00)!important;
      >div{
        height: 100%;
        >div:nth-child(1){
          height: 50%;
          >span{
            display:inline-block;
            height: 100%;
            text-align: center;
            line-height: 30px;
             line-height:50px;
          }
          >span:nth-child(1){
            padding: 0 20px;
            color: #00f6ff;
            font-size: 18px;
          }
          >span:nth-child(2){
            font-size: 13px;
            padding: 0 5px;
            color: #fff;
          }
           >span:nth-child(3){
            font-size: 13px;
            padding: 0 5px;
            color: #fff;
          }
        }
        >div:nth-child(2){
          height: 50%;
          >span{
            display:inline-block;
            text-align: center;
            line-height: 30px;
          }
          >span:nth-child(1){
            padding: 0 20px;
            color: #fff;
            font-size: 14px;
          }
          >span:nth-child(2){
            font-size: 16px;
            padding: 0 5px;
            color: #00f6ff;
          }
           >span:nth-child(3){
            font-size: 14px;
            padding: 0 10px;
            color: #fff;
          }
            >span:nth-child(4){
            font-size: 16px;
            padding: 0 5px;
            color: #00f6ff;
          }
        }
      }
    }
    .info-bottom{
      img {
        position: absolute;
        z-index: 104;
        top: 0px;
        left: 200px;
      }
    }
  }
   .waterlevelandquality {
    position: relative;
    box-shadow: none;
    bottom: 0;
    left: 0;
    width: auto;
    padding: 0;
    .info-topwarn{
      height: 0px;
      .closeX{
       display: inline-block;
       position: absolute;
       right: 20px;
       top: 10px;
       cursor: pointer;
      }
    }
    .info-middle{
       height: 82px;
       width: 100%;
       clear: both;
       text-align: left;
       background-image: url('../../../assets/homepage/onemapimages/otherback.png');
       background-color:rgb(225,225,225,0.00)!important;
      >div{
        height: 100%;
        >div:nth-child(1){
          height: 50%;
          >span{
            display:inline-block;
            height: 100%;
            text-align: center;
            line-height: 30px;
             line-height:50px;
          }
          >span:nth-child(1){
            padding: 0 20px;
            color: #00f6ff;
            font-size: 18px;
          }
          >span:nth-child(2){
            font-size: 13px;
            padding: 0 5px;
            color: #fff;
          }
           >span:nth-child(3){
            font-size: 13px;
            padding: 0 5px;
            color: #fff;
          }
        }
        >div:nth-child(2){
          height: 50%;
          >span{
            display:inline-block;
            text-align: center;
            line-height: 30px;
          }
          >span:nth-child(1){
            padding: 0 20px;
            color: #fff;
            font-size: 14px;
          }
          >span:nth-child(2){
            font-size: 16px;
            padding: 0 5px;
            color: #00f6ff;
          }
           >span:nth-child(3){
            font-size: 14px;
            padding: 0 10px;
            color: #fff;
          }
            >span:nth-child(4){
            font-size: 16px;
            padding: 0 5px;
            color: #00f6ff;
          }
        }
      }
    }
    .info-bottom{
      img {
        position: absolute;
        z-index: 104;
        top: 0px;
        left: 200px;
      }
    }
  }
}
</style>
