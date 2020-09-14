<template>
  <div v-cloak class="homepage">
    <div class="header">
      <div :class="{tabactive:tabActive==1}" class="tabone" @click="tabchangeindex(1)"><span :class="{iconactive:tabActive==1}" /><span>首页</span></div>
      <div :class="{tabactive:tabActive==2}" class="tabtwo" @click="tabchangeindex(2)"><span :class="{iconactive:tabActive==2}" /><span>一张图</span></div>
      <div class="timepeal">2020-03-19 14:46</div>
      <div class="titlepre"><img src="../assets/header/header_10.png"></div>
      <div class="weather">
        <div><img src="../assets/header/header_06.png"><span>小雨</span></div>
        <div><span>29C</span><span>(杭州当地)</span></div>
        <div><span>500mm</span><span>(降雨量)</span></div>
      </div>
      <div class="lastbutton">业务平台</div>
    </div>
    <div class="maincontent">
      <div>123</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { mapGetters } from 'vuex'
export default {
  name: 'HomePage',
  // components: {
  // },
  data() {
    return {
      // 头部数据
      tabActive: '1'
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    // 头部切换
    tabchangeindex(v) {
      this.tabActive = v
    }
  }
}
</script>
<style scoped lang="scss">
   [v-cloak]{
      display: none
   }
  .homepage{
    width:1894px;
    height: 1080px;
    background-color: #0d2038;
    .header{
      height: 80px;
      width: 100%;
      background:url('../assets/header/header_07.png') no-repeat 0px 0px;
    }
    .maincontent{
      height: 1005px;
      width: 100%;
      position: relative;
    }
    .tabone{
      width: 152px;
      height: 32px;
      position: absolute;
      top: 18px;
      left: 20px;
      background:url('../assets/header/header_08.png') no-repeat 0px 0px;
      cursor: pointer;
      text-align: center;
      >span:nth-child(1){
        display: inline-block;
        width:19px;
        height: 19px;
        background:url('../assets/header/header_03.png') no-repeat 0px 0px;
         position: absolute;
        top: 8px;
      }
      >span:nth-child(2){
        line-height: 32px;
        margin-left: 24px;
      }
       .iconactive{
        background:url('../assets/header/header_04.png') no-repeat 0px 0px!important;
      }
    }
    .tabtwo{
      width: 152px;
      height: 32px;
      position: absolute;
      top: 18px;
      left: 168px;
      background:url('../assets/header/header_08.png') no-repeat 0px 0px;
      cursor: pointer;
      text-align: center;
       >span:nth-child(1){
        display: inline-block;
        width:19px;
        height: 19px;
        background:url('../assets/header/header_14.png') no-repeat 0px 0px;
        position: absolute;
        top: 9px;
      }
      >span:nth-child(2){
        line-height: 32px;
        margin-left: 24px;
      }
      .iconactive{
        background:url('../assets/header/header_15.png') no-repeat 0px 0px!important;
      }
    }
    .tabactive{
      background:url('../assets/header/header_09.png') no-repeat 0px 0px;
    }
    .timepeal{
      position: absolute;
      width: 262px;
      height: 35px;
      background:url('../assets/header/header_02.png') no-repeat 0px 0px;
      left: 405px;
      top: 14px;
      text-align: center;
      line-height: 35px;
    }
    .titlepre{
      margin: 0 auto;
      height: 100%;
      width: 524px;
      text-align: center;
    }
    .weather{
      position: absolute;
      right: 210px;
      width: 435px;
      top: 14px;
      height: 35px;
      background:url('../assets/header/header_05.png') no-repeat 0px 0px;
      display: flex;
      flex-direction: row;
      justify-content:space-around;
      >div{
        line-height: 35px;
        display: flex;
        flex-direction: row;
        justify-content:space-around;
        span{
          display: inline-block;
          padding: 0 3px;
           font-family: 'fontawesome-webfont';
        }
      }
      >div:nth-child(1){
        img{
          height: 22px;
          margin-top: 8px;
        }
      }
    }
    .lastbutton{
      position: absolute;
      right: 20px;
      width: 125px;
      top: 17px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      background:url('../assets/header/header_13.png') no-repeat 0px 0px;
      font-size:17px;
      font-weight: bold;
      cursor: pointer;
      font-family: 'fontawesome-webfont';
    }
  }
</style>

