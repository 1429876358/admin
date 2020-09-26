import request from '@/utils/request'
// 工程规模类型统计
export function fetchprojectdata(data) {
  return request({
    url: '/reservoir/scopeSearch?areaId=' + data.areaId + '&year=' + data.year,
    method: 'post'
    // data: data
  })
}
// 病险水库情况
export function fetchdangerouswaterdata_one(data) {
  return request({
    url: '/reservoir/evalResultSearch?areaId=' + data.areaId + '&year=' + data.year + '&evalResults=' + data.evalResults,
    method: 'post'
    // data: data
  })
}
export function fetchdangerouswaterdata_two(data) {
  return request({
    url: '/reservoir/forceSearch?areaId=' + data.areaId + '&year=' + data.year + '&forceStatus=' + data.forceStatus,
    method: 'post'
    // data: data
  })
}
// 水位统计
export function fetchwatercountdata(data) {
  return request({
    url: '/reservoir/waterLevel/alarmGraph',
    method: 'post',
    data: data
  })
}
// 安全鉴定
export function fetchsafetyappraisaldata(data) {
  return request({
    url: '/reservoir/evalStatusSearch?areaId=' + data.areaId + '&year=' + data.year,
    method: 'post'
    // data: data
  })
}
// 排名统计
export function fetchrankdata(data) {
  return request({
    url: '/reservoir/ranking/force',
    method: 'post',
    data: data
  })
}
// 实时信息
export function fetchrealtimeinformationdata_one(data) {
  return request({
    url: '/reservoir/waterLevel/queryList',
    method: 'post',
    data: data
  })
}
export function fetchrealtimeinformationdata_two(data) {
  return request({
    url: '/reservoir/rainfall/queryList',
    method: 'post',
    data: data
  })
}
export function fetchrealtimeinformationdata_three(data) {
  return request({
    url: '/reservoir/waterLevel/queryList',
    method: 'post',
    data: data
  })
}
// 地图功能
export function fetcharealistdata_present(data) {
  return request({
    url: '/reservoir/areaListSearch?areaId=' + data.areaId,
    method: 'post'
    // data: data
  })
}
export function fetcharealistdata_last(data) {
  return request({
    url: '/reservoir/areaListSearch?parentId=' + data.parentId,
    method: 'post'
    // data: data
  })
}
// 水库分布
export function fetchreservoirdistributiondata(data) {
  return request({
    url: '/reservoir/reservoirListSearch?areaId=' + data.areaId + '&reservoirName=' + data.reservoirName + '&reservoirType=' + data.reservoirType + '&reservoirLevel=' + data.reservoirLevel + '&pageSize=' + data.pageSize,
    method: 'post'
    // data: data
  })
}
// 水库水位
export function fetchreservoirwaterleveldata(data) {
  return request({
    url: '/reservoir/waterLevel/queryList',
    method: 'post',
    data: data
  })
}
// 水库水质
export function fetchwaterlevelandqualitydata(data) {
  return request({
    url: '/reservoir/waterQuality/queryList/',
    method: 'post',
    data: data
  })
}
// 水库数目
export function fetchwaternumberdata(data) {
  return request({
    url: '/reservoir/reservoirTypeStatistics',
    method: 'post',
    data: data
  })
}
// 水库信息
export function fetchwaterdetaildata(data) {
  return request({
    url: '/reservoir/reservoirTypeStatistics',
    method: 'post',
    data: data
  })
}
// 一张图api
// 水库信息低层级
export function fetchmaploacldata(data) {
  return request({
    url: '/reservoir/reservoirmap/reservoirPCCountList',
    method: 'post',
    data: data
  })
}
// 水库信息低层级
export function fetchmaploacldata_detail(data) {
  return request({
    url: '/reservoir/reservoirmap/reservoirPCMapLsit',
    method: 'post',
    data: data
  })
}
// 在建项目
export function fecthbuildprojectdata(data) {
  return request({
    url: '/reservoir/reservoirmap/reservoirStartForce',
    method: 'post',
    data: data
  })
}

