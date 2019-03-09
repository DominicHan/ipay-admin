<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" :placeholder="$t('plz_input_user_name')">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" :placeholder="$t('plz_input_password')">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="validate">
      <Input v-model="form.validate" style="">
        <span slot="prepend">&nbsp;&nbsp;&nbsp;{{$t('verification_code')}} : &nbsp;&nbsp;&nbsp;</span>
      </Input>
    </FormItem>
    <!--<img alt="验证码" src="http://localhost:8080/validate_pic1" style="margin-left: 140px"/>-->
    <img :alt="$t('verification_code')" :src="validate_pic" v-on:click="validatePic()"/>
    <!--<a href="#" v-on:click="changeImg()">换一张</a>-->
    <FormItem>
      <Button style="margin-top: 10px" @click="handleSubmit" type="primary" long>{{$t('login')}}</Button>
    </FormItem>
  </Form>
</template>
<script>
import request from '../../assets/js/request'
import { AxiosInstance as axios } from 'axios'

export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: ('account_cannon_be_empty'), trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: ('pwd_cannon_empty'), trigger: 'blur' }
        ]
      }
    },
    validateRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: ('ver_code_cannon_empty'), trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: 'admin',
        password: 'admin',
        validate: ''
      },
      validate_pic: ''
    }
  },
  computed: {
    rules () {
      return {
        // userName: this.userNameRules,
        // password: this.passwordRules,
        // validate: this.validateRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            validate: this.form.validate
          })
        }
      })
    },
    validatePic () {
      let timestamp = (new Date()).valueOf()
      request.validatePic1(timestamp).then(response => {
        console.log(response)
        this.validate_pic = response.url
        // console.log(this.getBase64Image(response.data))
      })
    },
    changeUrl (url) {
      let timestamp = (new Date()).valueOf()
      let index = url.indexOf('?', url)
      if (index > 0) {
        url = url.substring(index, url.indexOf(url, '?'))
      }
      if ((url.indexOf('&') >= 0)) {
        url = url + '×tamp=' + timestamp
      } else {
        url = url + '?timestamp=' + timestamp
      }
      return url
    }
  },
  mounted () {
    request.validatePic({}).then(response => {
      console.log(response)
      this.validate_pic = response.url
      // console.log(this.getBase64Image(response.data))
    })
  }
}
</script>
