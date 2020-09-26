<template>

  <div id="myMap" class="container" />

</template>

<script>

import { reservoirNum, reservoirInfo } from '@/api/operation'

export default {

  name: 'AMap',

  props: {

    queryList: {

      type: Object,

      default: null

    }

  },

  data() {
    return {

      markers: [], map: '', query: {}, markersMid: [], queryNum: []

    }
  },

  created() {
    this.queryNum = this.queryList

    this.getNum()
  },

  mounted() {
    document.querySelector('.container').style.height = document.documentElement.clientHeight - 50 + 'px'

    this.map = new AMap.Map('myMap', {

      resizeEnable: true, // 是否监控地图容器尺寸变化

      zoom: 9,

      zooms: [3, 19],

      showBuildingBlock: true,

      center: [120.14923096, 30.28990325] // 初始化地图中心点

    })

    this.map.on('zoomend', this.mapZoomend)
  },

  methods: {

    mapZoomend() {
      if (this.map.getZoom() < 9) {
        this.$emit('areaInfo', { 'areaId': 2678, 'areaName': '杭州市' })

        this.$emit('infoShow', { 'isShow': true, 'pop_height': 0 })

        this.getNum()
      }
    },

    getNum() {
      reservoirNum(this.queryNum).then(res => {
        if (res === []) { this.$emit('infoShow', { 'isShow': true, 'poop_height': 0 }) }

        this.query = this.queryList

        res.forEach((marker) => {
          marker = new AMap.Marker({

            content: `<div style="color:#fff;width:34px;height:43px;background:url('http://192.168.1.128:9528/images/remarks/default.png') center no-repeat;background-size: cover;text-align: center;font-size:14px;padding-top:10px;">${marker.count}</div>`,

            areaId: marker.areaId, // 增加行政区划ID

            areaName: marker.areaName,

            position: [marker.lon, marker.lat],

            offset: new AMap.Pixel(-13, -30),

            animation: 'AMAP_ANIMATION_DROP',

            clickable: true

          })

          // 给标记点添加点击事件

          marker.on('click', (e) => {
            this.$emit('areaInfo', { 'areaId': e.target.w.areaId, 'areaName': e.target.w.areaName })

            this.removeMarkers()

            this.map.setZoomAndCenter(10, [e.lnglat.lng, e.lnglat.lat])
            this.query.areaId = e.target.w.areaId
            this.getInfo()
          })

          this.markers.push(marker)
        })

        this.addMarkers()
      })
    },

    getInfo() {
      this.query.pageNum = 9999

      this.query.pageSize = 1

      reservoirInfo(this.query).then(res => {
        if (res === []) { this.$emit('infoShow', { 'isShow': true, 'poop_height': 0 }) }

        res.forEach((marker) => {
          if (this.query.reservoirType === 99) {
            if (marker.scope === '小（2）型') {
              marker.icon = 'http://192.168.1.128:9528/images/remarks/reserior_04.png'
            } else if (marker.scope === '小（1）型') {
              marker.icon = 'http://192.168.1.128:9528/images/remarks/reserior_03.png'
            } else if (marker.scope === '中型') {
              marker.icon = 'http://192.168.1.128:9528/images/remarks/reserior_02.png'
            } else {
              marker.icon = 'http://192.168.1.128:9528/images/remarks/reserior_01.png'
            }
          }

          if (this.query.reservoirType === 3) {
            if (marker.scope === '小（2）型') {
              marker.icon = 'http://192.168.1.128:9528/images/remarks/alarm_04.png'
            } else if (marker.scope === '小（1）型') {
              marker.icon = 'http://192.168.1.128:9528/images/remarks/alarm_03.png'
            } else if (marker.scope === '中型') {
              marker.icon = 'http://192.168.1.128:9528/images/remarks/alarm_02.png'
            } else {
              marker.icon = 'http://192.168.1.128:9528/images/remarks/alarm_01.png'
            }
          }

          marker = new AMap.Marker({

            icon: marker.icon,

            position: [marker.lon, marker.lat],

            evalResult: marker.evalResult,

            evalStatus: marker.evalStatus,

            reservoirId: marker.reservoirId,

            reservoirName: marker.reservoirName,

            waterLevel: marker.waterLevel,

            realTimeLevel: marker.realTimeLevel,

            scope: marker.scope,

            offset: new AMap.Pixel(-13, -30),

            animation: 'AMAP_ANIMATION_DROP',

            clickable: true

          })

          // 给标记点添加点击事件

          marker.on('click', (e) => {
            this.$emit('infoShow', { 'isShow': true, 'pop_height': 'auto', 'info': e.target.w })
          })

          this.markers.push(marker)
        })

        this.addMarkers()
      })
    },

    addMarkers() {
      this.removeMarkers()	// 先移除

      this.map.add(this.markers)	// 再加点

      this.markers = []
    },

    removeMarkers() {
      this.map.remove(this.markersMid)

      this.markersMid = this.markers
    }

  }

}

</script>

<style lang="scss" scoped>

.container{width: 100%;height:100%;background-color: yellowgreen;}

/deep/.amap-icon{img{width:34px;height:43px;}}

.marks-icon{color:#fff;background-color: #1E7AFF;}

</style>

