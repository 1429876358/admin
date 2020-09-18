<template>
  <div class="onemappage">
    <onemapinit />
    <div class="leftbox">
      <div class="toptab">
        <span :class="{toptabactive:toptabactiveindex==1}" @click="changetoptab(1)">基础信息</span>
        <span :class="{toptabactive:toptabactiveindex==2}" @click="changetoptab(2)">项目管理</span>
      </div>
      <div v-if="toptabactiveindex==1">
        <div class="waterbodytype">
          <div :class="{waterbodytypeactive:waterbodytype==1}" @click="changewatertab(1)">水库</div>
          <div :class="{waterbodytypeactive:waterbodytype==2}" @click="changewatertab(2)">山塘</div>
          <div :class="{waterbodytypeactive:waterbodytype==3}" @click="changewatertab(3)">小水电</div>
        </div>
        <div class="selectsearch">
          <el-select v-model="regionvalue" size="small" placeholder="请选择区划">
            <el-option
              v-for="item in regionoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-select v-model="watergradevalue" class="select_fl" size="small" placeholder="选择水库等级">
            <el-option
              v-for="item in watergradeoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input v-model="serchinputvalue" class="serchinputvalue" size="small" suffix-icon="el-icon-search" placeholder="搜索" />
        </div>
        <div class="selectlist">
          <el-select v-model="regionvalue" size="small" placeholder="请选择区划">
            <el-option
              v-for="item in regionoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <div class="hr-line-div" />
          <el-select v-model="regionvalue" size="small" placeholder="请选择区划">
            <el-option
              v-for="item in regionoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <div class="hr-line-div" />
          <el-select v-model="regionvalue" size="small" placeholder="请选择区划">
            <el-option
              v-for="item in regionoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <div class="hr-line-div" />
          <el-select v-model="regionvalue" size="small" placeholder="请选择区划">
            <el-option
              v-for="item in regionoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="contentlist">
          <div v-for="(item,index) in waterlist" :key="index">
            <div>
              <div><img src="../assets/homepage/onemapimages/river.jpg"></div>
              <div>
                <div><span>闲林水库</span><span>大型水坝</span><span>二类坝</span></div>
                <div><span><i class="el-icon-s-custom" /></span><span>张三、李四、王五</span></div>
                <div><span><i class="el-icon-location-information" /></span><span>余杭区闲林街道袁峰街218号</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="toptabactiveindex==2">
        <div class="waterbodytype">
          <div :class="{waterbodytypeactive:waterbodytype==1}" @click="changewatertab(1)">水库</div>
          <div :class="{waterbodytypeactive:waterbodytype==2}" @click="changewatertab(2)">山塘</div>
          <div :class="{waterbodytypeactive:waterbodytype==3}" @click="changewatertab(3)">小水电</div>
        </div>
        <div class="selectsearch">
          <el-select v-model="regionvalue" size="small" placeholder="请选择区划">
            <el-option
              v-for="item in regionoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-select v-model="watergradevalue" class="select_fl" size="small" placeholder="选择水库等级">
            <el-option
              v-for="item in watergradeoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input v-model="serchinputvalue" class="serchinputvalue" size="small" suffix-icon="el-icon-search" placeholder="搜索" />
        </div>
        <div class="selectlist">
          <el-select v-model="regionvalue" size="small" placeholder="请选择区划">
            <el-option
              v-for="item in regionoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <div class="hr-line-div" />
          <el-select v-model="regionvalue" size="small" placeholder="请选择区划">
            <el-option
              v-for="item in regionoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <div class="hr-line-div" />
          <el-select v-model="regionvalue" size="small" placeholder="请选择区划">
            <el-option
              v-for="item in regionoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <div class="hr-line-div" />
          <el-select v-model="regionvalue" size="small" placeholder="请选择区划">
            <el-option
              v-for="item in regionoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="contentlist">
          <div v-for="(item,index) in waterlist" :key="index">
            <div>
              <div><img src="../assets/homepage/onemapimages/river.jpg"></div>
              <div>
                <div><span>闲林水库</span><span>大型水坝</span><span>二类坝</span></div>
                <div><span><i class="el-icon-s-custom" /></span><span>张三、李四、王五</span></div>
                <div><span><i class="el-icon-location-information" /></span><span>余杭区闲林街道袁峰街218号</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import onemapinit from '@/components/OneMapInit.vue'
export default {
  name: 'OneMapPage',
  components: {
    onemapinit
  },
  data() {
    return {
      toptabactiveindex: '1',
      waterbodytype: '1',
      // 地图搜索
      regionvalue: '',
      regionoptions: [{ id: '', name: '杭州市' }],
      watergradevalue: '',
      watergradeoptions: [{ value: '', label: '全部等级' }],
      serchinputvalue: '',
      waterlist: []
    }
  },
  computed: {
  },
  mounted() {
    for (var i = 0; i < 16; i++) {
      this.waterlist.push({ title: '仙岭水库', title1: '大型水库', title2: '二类坝', waterheader: '张三，李四，王二', localX: '余杭闲林街道208号向西100米' })
    }
  },
  methods: {
    // tab切换
    changetoptab(v) {
      this.toptabactiveindex = v
    },
    changewatertab(v) {
      this.waterbodytype = v
    }
  }
}
</script>
<style lang='scss' scoped>
  .onemappage{
    width: 1894px;
    height: 1031px;
    position: absolute;
    .leftbox{
      position: absolute;
      top: 20px;
      left: 20px;
      width: 500px;
      height: 990px;
      overflow: hidden;
      overflow-x: hidden;
      background: url("../assets/homepage/onemapimages/picture_05.png") no-repeat 0px 0px;
      .toptab{
        width: 100%;
        height: 32px;
        >span{
          display: inline-block;
          width: 50%;
          height: 32px;
          line-height: 32px;
          text-align: center;
          cursor: pointer;
          font-size: 16px;
          color: #b8c1ca;
        }
        .toptabactive{
          background: url("../assets/homepage/onemapimages/picture_06.png") no-repeat 0px 0px;
          color: #fff;
        }
      }
      .waterbodytype{
        padding: 0px 20px;
        height: 33px;
        border-bottom: 1px solid #0173e4;
        margin-top: 24px;
        >div{
          float: left;
          width: 90px;
          height: 32px;
          border: 1px solid rgb(1,115,228,0.3);
          text-align: center;
          line-height: 32px;
          font-size: 15px;
          cursor: pointer;
          background: rgb(1,115,228,0.07);
          -webkit-box-shadow:0px 0px 10px rgba(112, 182, 253, 0.3) inset;
          -moz-box-shadow:0px 0px 10px rgb(1,115,228,0.3) inset;
          box-shadow:0px 0px 10px rgb(1,115,228,0.3) inset;
        }
        >div:nth-child(2){
          margin: 0 7px;
        }
        .waterbodytypeactive{
          border: 1px solid #0173e4;
          border-bottom: none;
           -webkit-box-shadow:0px 0px 13px #0173e4 inset;
          -moz-box-shadow:0px 0px 13px #0173e4 inset;
          box-shadow:0px 0px 13px #0173e4 inset;
        }
      }
      .selectsearch{
         padding: 0px 20px;
         height: 65px;
          .el-select{
            width: 109px;
            top: 15px;
          }
          .select_fl{
            margin:0px 16px 0px 8px!important;
          }
          .serchinputvalue{
            width: 210px;
            float: right;
            top: 15px;
          }
      }
      .selectlist{
        width: 499px;
        height: 34px;
        border-top:1px solid #026bd7 !important;
        border-bottom:1px solid #026bd7 !important;
         .el-select{
            width: 123.5px;
            float: left;
        }
        .hr-line-div{
          height: 100%;
          width: 1px;
          float: left;
          background: -webkit-linear-gradient(#0b2036,#016ad6,#0b2036);
          background: -o-linear-gradient(#0b2036,#016ad6,#0b2036);
          background: -moz-linear-gradient(#0b2036,#016ad6,#0b2036);
          background: -mos-linear-gradient(#0b2036,#016ad6,#0b2036);
          background: linear-gradient(#0b2036,#016ad6,#0b2036);
        }
      }
       .contentlist{
          height: 780px;
          width: 520px;
          overflow-x: hidden;
          >div{
            width: 500px;
            height: 130px;
            >div{
              padding:20px 27px;
              height: 90px;
              margin: 0 auto;
              >div:nth-child(1){
                float: left;
                width: 90px;
                height: 90px;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              >div:nth-child(2){
                float: left;
                width: 330px;
                height: 100%;
                margin-left: 16px;
                >div:nth-child(1){
                  height: 34px;
                  >span{
                    display: inline-block;
                    float: left;
                  }
                  >span:nth-child(1){
                    min-width: 100px;
                    text-align: left;
                    font-size: 19px;
                  }
                  >span:nth-child(2){
                    width: 70px;
                    height: 25px;
                    line-height: 25px;
                    background: url("../assets/homepage/onemapimages/picture_01.png") no-repeat 0px 0px;
                    text-align: center;
                    font-size: 14px;
                    color: #0ce5ea;
                    margin: 0 8px;
                  }
                   >span:nth-child(3){
                    width: 70px;
                    height: 25px;
                    line-height: 25px;
                    background: url("../assets/homepage/onemapimages/picture_01.png") no-repeat 0px 0px;
                    text-align: center;
                    font-size: 14px;
                    color: #0ce5ea;
                  }
                }
                >div:nth-child(2){
                  height: 28px;
                  line-height: 28px;
                  >span:nth-child(1){
                    .el-icon-s-custom{
                      color: #c5d6ed;
                    }
                  }>span:nth-child(2){
                    margin-left: 10px;
                    color: #c5d6ed;
                    font-size: 13px;
                  }
                }
                >div:nth-child(3){
                  height: 28px;
                  line-height: 28px;
                  >span:nth-child(1){
                    .el-icon-location-information{
                      color: #c5d6ed;
                    }
                  }>span:nth-child(2){
                    margin-left: 10px;
                    color: #c5d6ed;
                    font-size: 13px;
                  }
                }
              }
            }
          }
          >div:nth-child(even){
            background: #1d5e82;
            background: rgb(36,88,117,0.52);
            background: -webkit-linear-gradient(left bottom,#1d5e82,rgb(36,88,117,0.12));
            background: -o-linear-gradient(left bottom,#1d5e82,rgb(36,88,117,0.12));
            background: -mos-linear-gradient(left bottom,#1d5e82,rgb(36,88,117,0.12));
            background: -moz-linear-gradient(left bottom,#1d5e82,rgb(36,88,117,0.12));
            background: linear-gradient(left bottom,#1d5e82,rgb(36,88,117,0.12));
          }
        }
    }
  }
</style>
<style lang='scss'>
  .selectsearch{
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
  .serchinputvalue{
        .el-input__inner{
          border-radius: 0px;
          border:1px solid #047bb1;
          background-color: rgba(225,225,225,0.01)!important;
          color: #fff;
          height: 34px;
          text-align: center;
        }
        .el-icon-search{
          font-size: 16px;
        }
  }
  .selectlist{
        .el-input__inner{
          background-color: rgba(12,32,56,0.26)!important;
          border: none;
          color: #fff;
          text-align: center;
      }
  }
</style>

