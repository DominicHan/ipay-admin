<template>
  <div>
    <Card>
      <!--<div class="searchLine">-->
        <!--<Input v-model="searchName" style="width: 250px;">-->
        <!--<span slot="prepend">&nbsp;&nbsp;&nbsp;投资人姓名 : &nbsp;&nbsp;&nbsp;</span>-->
        <!--</Input>-->
        <!--<br><br>-->
        <!--<span slot="prepend">&nbsp;&nbsp;&nbsp;交易类型 : &nbsp;&nbsp;&nbsp;</span>-->
        <!--<Select v-model="searchType" slot="append" style="width: 150px">-->
          <!--<Option value=-1>全部</Option>-->
          <!--<Option value=0>转账</Option>-->
          <!--<Option value=1>信用账户转换</Option>-->
          <!--<Option value=2>邀请红利</Option>-->
        <!--</Select>-->
        <!--<Button type="primary" style="margin-left: 15px" @click="searchRecord">搜索</Button>-->
        <!--<Button type="primary" style="margin-left: 15px" @click="clearSearchBox">清空</Button>-->
      <!--</div>-->
      <tables ref="tables" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <div style="margin: 10px; display: flex; align-items: center">
        <template>
          <Page :total="pageTotal" show-elevator :page-size="pageSize" @on-change="change"/>
        </template>
        <div style="margin-left: 20px">{{$t('total')}} {{this.pageTotal}} {{$t('article')}}</div>
      </div>
    </Card>
  </div>
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
      searchName: '',
      searchType: -1,
      pageTotal: 0,
      pageSize: 0,
      columns: [
        { title: this.$t('investor_account'), key: 'userId', sortable: false },
        {
          title: this.$t('user_choice'),
          key: 'userChoice',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                params.row.userChoice === 0 ? this.$t('no') : this.$t('yes')
              )
            ])
          }
        },
        { title: this.$t('part_in_amount'), key: 'partInAmount' },
        { title: this.$t('reward_amount'), key: 'rewardAmount' },
        { title: this.$t('part_in_result'),
          key: 'results',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                params.row.results === 0 ? this.$t('un_winning') : this.$t('winning')
              )
            ])
          }
        }
      ],
      tableData: []
    }
  },
  watch: {
    local: function (val) { // 侦听单选按钮的变化，从而进行切换语言
      this.columns = [
        { title: this.$t('investor_account'), key: 'userId', sortable: false },
        {
          title: this.$t('user_choice'),
          key: 'userChoice',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                params.row.userChoice === 0 ? this.$t('no') : this.$t('yes')
              )
            ])
          }
        },
        { title: this.$t('part_in_amount'), key: 'partInAmount' },
        { title: this.$t('reward_amount'), key: 'rewardAmount' },
        { title: this.$t('part_in_result'),
          key: 'results',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                params.row.results === 0 ? this.$t('un_winning') : this.$t('winning')
              )
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['local'])
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    change (page) {
      request.getTranRecordList({
        gameId: this.$route.query.gameId,
        limit: 20,
        offset: page - 1
      }).then(res => {
        this.tableData = res.body.data.content
        this.pageTotal = res.body.data.total
        this.pageSize = res.body.data.limit
      })
    },
    clearSearchBox () {
      this.searchName = ''
      this.searchType = -1
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    searchRecord () {
      request.gamePartInList({
        gameId: this.$route.query.gameId,
        limit: 20,
        offset: 0
      }).then(res => {
        this.tableData = res.body.data.content
        this.pageTotal = res.body.data.total
        this.pageSize = res.body.data.limit
      })
    }
  },
  mounted () {
    request.gamePartInList({
      gameId: this.$route.query.gameId,
      limit: 20,
      offset: 0
    }).then(res => {
      this.tableData = res.body.data.content
      this.pageTotal = res.body.data.total
      this.pageSize = res.body.data.limit
    })
  }
}
</script>

<style>
  .searchLine {
    margin: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
</style>
