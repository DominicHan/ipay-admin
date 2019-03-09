<template>
  <Tabs type="card">
    <TabPane :label="$t('lv1_up')">
      <Card>
        <tables ref="tables" v-model="up_lv1" :columns="columns" @on-delete="handleDelete"/>
      </Card>
    </TabPane>
    <TabPane :label="$t('lv2_up')">
      <Card>
        <tables ref="tables" v-model="up_lv2" :columns="columns" @on-delete="handleDelete"/>
      </Card>
    </TabPane>
    <TabPane :label="$t('lv1_down')">
      <Card>
        <tables ref="tables" v-model="down_lv1" :columns="columns" @on-delete="handleDelete"/>
      </Card>
    </TabPane>
    <TabPane :label="$t('lv2_down')">
      <Card>
        <tables ref="tables" v-model="down_lv2" :columns="columns" @on-delete="handleDelete"/>
      </Card>
    </TabPane>
  </Tabs>
</template>

<script>
import Tables from '_c/tables'
import request from '../../../assets/js/request.js'
import { mapGetters } from 'vuex'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      up_lv1: null,
      up_lv2: null,
      down_lv1: null,
      down_lv2: null,
      columns: [
        { title: this.$t('name'), key: 'userName', searchable: false },
        { title: this.$t('user_tel'), key: 'tel' },
        { title: this.$t('balance'), key: 'balance' },
        { title: this.$t('credit_balance'), key: 'creditBalance' },
        { title: this.$t('invite_code'), key: 'inviteCode' }
      ]
    }
  },
  watch: {
    local: function (val) { // 侦听单选按钮的变化，从而进行切换语言
      this.columns = [
        { title: this.$t('name'), key: 'userName', searchable: false },
        { title: this.$t('user_tel'), key: 'tel' },
        { title: this.$t('balance'), key: 'balance' },
        { title: this.$t('credit_balance'), key: 'creditBalance' },
        { title: this.$t('invite_code'), key: 'inviteCode' }
      ]
    }
  },
  computed: {
    ...mapGetters(['local'])
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    }
  },
  mounted () {
    request.accountRelationship({
      userId: this.$route.query.userId
    }).then(res => {
      this.up_lv1 = res.body.data.up_lv1
      this.up_lv2 = res.body.data.up_lv2
      this.down_lv1 = res.body.data.down_lv1
      this.down_lv2 = res.body.data.down_lv2
    })
  }
}
</script>

<style>
  .searchLine {
    /*margin: 10px;*/
    overflow: hidden;
    display: flex;
    align-items: center;
  }
</style>
