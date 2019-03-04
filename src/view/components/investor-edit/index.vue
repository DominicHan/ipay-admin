<template>
  <div>
    <Card>
      <div class="sys_config">
        <div>用户名</div>
        <div>{{accountData.userName}}</div>
        <br>
        <div>手机号</div>
        <div>{{accountData.tel}}</div>
        <br>
        <div>邮箱地址</div>
        <div>{{accountData.email}}</div>
        <br>
        <div>创建时间</div>
        <div>{{accountData.createdAt}}</div>
        <br>
        <div>邀请码</div>
        <div>{{accountData.inviteCode}}</div>
        <br>
        <div>余额</div>
        <div>
          <Input v-model="accountData.balance"  style="width: 150px;" :disabled="balanceEditable"
                 placeholder="请输入余额" maxlength="255">
          </Input>
          <Button type="text" @click="setBalanceEditable">编辑</Button>
        </div>
        <br>
        <div>信用额</div>
        <div>
          <Input v-model="accountData.creditBalance"  style="width: 150px;" :disabled="creditBalanceEditable"
                 placeholder="请输入信用额" maxlength="255">
          </Input>
          <Button type="text" @click="setCreditBalanceEditable">编辑</Button>
        </div>
        <br>
        <div>
          <Button type="primary" style="margin-left: 15px" @click="setAccountInfo">保存</Button>
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
          this.$Message.success('设置成功')
          this.$router.push({ path: '/components/investor-manage' })
        } else {
          this.$Message.error('设置失败')
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
