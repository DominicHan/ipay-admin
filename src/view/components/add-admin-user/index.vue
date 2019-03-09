<template>
  <div>
    <Card>
      <div class="sys_config">
        <Input v-model="admin_name" style="width: 300px; margin-left: 15px">
        <span slot="prepend">&nbsp;&nbsp;&nbsp;{{ $t('admin_name') }} : &nbsp;&nbsp;&nbsp;</span>
        </Input>
        <br>
        <Input v-model="admin_tel" style="width: 300px; margin-left: 15px">
        <span slot="prepend">&nbsp;&nbsp;&nbsp;{{ $t('admin_tel') }} : &nbsp;&nbsp;&nbsp;</span>
        </Input>
        <br>
        <Input v-model="password" style="width: 300px; margin-left: 15px" type="password">
        <span slot="prepend">&nbsp;&nbsp;&nbsp;{{ $t('password') }} : &nbsp;&nbsp;&nbsp;</span>
        </Input>
        <br>
        <div>
          <Button type="primary" style="margin-left: 15px" @click="adminUserAdd">{{ $t('save') }}</Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import request from '../../../assets/js/request.js'

export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      admin_name: '',
      admin_tel: '',
      password: ''
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    adminUserAdd () {
      if (this.admin_name === '') {
        this.$Message.info(this.$t('plz_input_account'))
        return
      } else if (this.password === '') {
        this.$Message.info(this.$t('plz_input_password'))
        return
      }
      request.adminUserAdd({
        adminName: this.admin_name,
        adminTel: this.admin_tel,
        password: this.password
      }).then(res => {
        // console.log('rspCode===', res)
        if (res.body.rspCode === '000000') {
          this.$Message.success(this.$t('add_success'))
          this.$router.push({ path: '/components/tree_table_page1' })
        } else {
          this.$Message.error(this.$t('add_error'))
        }
      })
    }
  },
  mounted () {
  }
}
</script>

<style>
  .sys_config {
    margin: 10px;
    /*overflow: hidden;*/
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
