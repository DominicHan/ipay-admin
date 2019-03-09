<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" :title="$t('welcome_login')" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip"></p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import request from '../../assets/js/request'
import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmitOld ({ userName, password, validate }) {
      this.handleLogin({ userName, password, validate }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    },
    handleSubmit ({ userName, password, validate }) {
      request.adminUserLogin({
        adminName: userName,
        password: password,
        validate: validate
      }).then(res => {
        if (res.body.rspCode == '000000') {
          // this.handleSubmitOld({ userName, password });
          sessionStorage.setItem('token', '11')
          this.$router.push({ path: '/' })
        } else {
          this.$Message.error(res.body.rspMsg)
        }
      }).catch(err => {
        this.$Message.error('登录失败')
      })
    }
  }
}
</script>

<style>

</style>
