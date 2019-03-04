import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
//const url_root = 'http://47.74.24.151:8080/'
const url_root = 'http://localhost:8080/'
export default ({
  // 获取用户登录信息
  getAccountListData (data) {
    return Vue.http.post(url_root + 'bg/account_list', data)
  },
  getTranRecordList (data) {
    return Vue.http.post(url_root + 'bg/transaction_list', data)
  },
  getAdminUserList () {
    return Vue.http.post(url_root + 'bg/admin_user_list')
  },
  getSystemConfig () {
    return Vue.http.post(url_root + 'bg/system_config')
  },
  updateSystemConfig (data) {
    return Vue.http.post(url_root + 'bg/update_system_config', data)
  },
  frozenAccount (data) {
    return Vue.http.post(url_root + 'bg/frozen_account', data)
  },
  accountThaw (data) {
    return Vue.http.post(url_root + 'bg/account_thaw', data)
  },
  gameInstanceList (data) {
    return Vue.http.post(url_root + 'game_instance_list', data)
  },
  addGameInstance (data) {
    return Vue.http.post(url_root + 'bg/add_game_instance', data)
  },
  adminUserLogin (data) {
    return Vue.http.post(url_root + 'bg/admin_login', data)
  },
  adminUserDelete (data) {
    return Vue.http.post(url_root + 'bg/admin_delete', data)
  },
  adminUserAdd (data) {
    return Vue.http.post(url_root + 'bg/admin_add', data)
  },
  adminUserUpdate (data) {
    return Vue.http.post(url_root + 'bg/admin_update', data)
  },
  getAdminUser (data) {
    return Vue.http.post(url_root + 'bg/get_admin', data)
  },
  accountTotal () {
    return Vue.http.post(url_root + 'bg/account_total')
  },
  gamePartInList (data) {
    return Vue.http.post(url_root + 'bg/game_part_in_list', data)
  },
  getGameInstance (data) {
    return Vue.http.post(url_root + 'get_game_instance', data)
  },
  setGameInstanceInfo (data) {
    return Vue.http.post(url_root + 'bg/set_game_instance_info', data)
  },
  accountRelationship (data) {
    return Vue.http.post(url_root + 'bg/account_relationship', data)
  },
  delGameInstance (data) {
    return Vue.http.post(url_root + 'bg/del_game', data)
  },
  accountInfo (data) {
    return Vue.http.post(url_root + 'account_info', data)
  },
  setAccountInfo (data) {
    return Vue.http.post(url_root + 'bg/set_account_info', data)
  },
  validatePic () {
    return Vue.http.get(url_root + 'bg/validate_pic')
  },
  validatePic1 (data) {
    return Vue.http.get(url_root + 'bg/validate_pic?timestamp='+data)
  }
})
