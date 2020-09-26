const getters = {
  tabBar: state => state.global.tabBar,
  loading: state => state.global.loading,
  institution: state => state.global.institution,
  areaId: state => state.global.areaId,
  areaName: state => state.global.areaName,
  title: state => state.global.title,
  height: state => state.setting.height,
  showNav: state => state.setting.showNav,
  userId: state => state.global.userId,
  homeSearchHistory: state => state.global.homeSearchHistory,
  superIsActive: state => state.global.superIsActive,
  superCurrent: state => state.global.superCurrent,
  userInfo: state => state.user.userInfo
}
export default getters
