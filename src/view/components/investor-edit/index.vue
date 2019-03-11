<template>
  <div>
    <Card>
      <div class="sys_config">
        <div>{{$t('user_name')}}</div>
        <div>{{accountData.userName}}</div>
        <br>
        <div>{{$t('user_tel')}}</div>
        <div>{{accountData.tel}}</div>
        <br>
        <div>{{$t('user_email')}}</div>
        <div>{{accountData.email}}</div>
        <br>
        <div>{{$t('create_date')}}</div>
        <div>{{accountData.createdAt}}</div>
        <br>
        <div>{{$t('invite_code')}}</div>
        <div>{{accountData.inviteCode}}</div>
        <br>
        <div>{{$t('balance')}}</div>
        <div>
          <Input v-model="accountData.balance"  style="width: 150px;" :disabled="balanceEditable"
                 :placeholder="$t('plz_input_balance')" maxlength="255">
          </Input>
          <Button type="text" @click="setBalanceEditable">{{$t('edit')}}</Button>
        </div>
        <br>
        <div>{{$t('credit_balance')}}</div>
        <div>
          <Input v-model="accountData.creditBalance"  style="width: 150px;" :disabled="creditBalanceEditable"
                 :placeholder="$t('plz_input_credit_balance')" maxlength="255">
          </Input>
          <Button type="text" @click="setCreditBalanceEditable">{{$t('edit')}}</Button>
        </div>
        <br>
        <div>
          <Button type="primary" style="margin-left: 15px" @click="setAccountInfo">{{$t('save')}}</Button>
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
      accountData: '',
      balanceEditable: true,
      creditBalanceEditable: true
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    setBalanceEditable () {
      this.balanceEditable = false
    },
    setCreditBalanceEditable () {
      this.creditBalanceEditable = false
    },
    setAccountInfo () {
      request.setAccountInfo({
        id: this.$route.query.userId,
        balance: this.accountData.balance,
        creditBalance: this.accountData.creditBalance
      }).then(res => {
        if (res.body.rspCode === '000000') {
          this.$Message.success(this.$t('set_success'))
          this.$router.push({ path: '/components/tree_table_page2' })
        } else {
          this.$Message.error(this.$t('set_error'))
        }
      })
    }
  },
  mounted () {
    request.accountInfo({
      id: this.$route.query.userId
    }).then(res => {
      console.log(JSON.stringify(res.body.data))
      this.accountData = res.body.data
    })
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
