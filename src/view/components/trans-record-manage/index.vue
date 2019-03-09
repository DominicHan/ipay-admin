<template>
  <div>
    <Card>
      <div class="searchLine">
        <Input v-model="searchName" style="width: 250px;">
        <span slot="prepend">&nbsp;&nbsp;&nbsp;{{$t('investor_name')}} : &nbsp;&nbsp;&nbsp;</span>
        </Input>
        <br><br>
        <span slot="prepend">&nbsp;&nbsp;&nbsp;{{$t('trading_type')}} : &nbsp;&nbsp;&nbsp;</span>
        <Select v-model="searchType" slot="append" style="width: 150px">
          <Option value=-1>{{$t('all')}}</Option>
          <Option value=0>{{$t('transfer')}}</Option>
          <Option value=1>{{$t('credit_conversion')}}</Option>
          <Option value=2>{{$t('invite_bonus')}}</Option>
        </Select>
        <Button type="primary" style="margin-left: 15px" @click="searchRecord">{{$t('search')}}</Button>
        <Button type="primary" style="margin-left: 15px" @click="clearSearchBox">{{$t('clear')}}</Button>
      </div>
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
        { title: this.$t('investor_name'), key: 'userName', sortable: false },
        {
          title: this.$t('trading_type'),
          key: 'transactionType',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                params.row.transactionType === 0 ? this.$t('transfer') : this.$t('credit_conversion')
              )
            ])
          }
        },
        { title: this.$t('transaction_amount'), key: 'transactionAmount' },
        {
          title: this.$t('trade_direction'),
          key: 'tradeDirection',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                params.row.tradeDirection === 0 ? this.$t('in_account') : this.$t('out_account')
              )
            ])
          }
        },
        { title: this.$t('pre_trans_amount'), key: 'preTransactionAmount' },
        { title: this.$t('post_trans_amount'), key: 'postTransactionAmount' },
        {
          title: this.$t('create_date'),
          key: 'createdAt',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                new Date(params.row.createdAt).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
              )
            ])
          }
        },
        {
          title: this.$t('update_date'),
          key: 'updateAt',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                new Date(params.row.updateAt).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
              )
            ])
          }
        }
        // {
        //   title: '冻结',
        //   key: 'frozenStatus',
        //   render: (h, params) => {
        //     return h('div', [
        //       h(
        //         'div',
        //         {},
        //         params.row.frozenStatus === 0 ? '可冻结'
        //           : params.row.frozenStatus === 1 ? '冻结中' : '已冻结'
        //       )
        //     ])
        //   }
        // }
      ],
      tableData: []
    }
  },
  watch: {
    local: function (val) { // 侦听单选按钮的变化，从而进行切换语言
      this.columns = [
        { title: this.$t('investor_name'), key: 'userName', sortable: false },
        {
          title: this.$t('trading_type'),
          key: 'transactionType',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                params.row.transactionType === 0 ? this.$t('transfer') : this.$t('credit_conversion')
              )
            ])
          }
        },
        { title: this.$t('transaction_amount'), key: 'transactionAmount' },
        {
          title: this.$t('trade_direction'),
          key: 'tradeDirection',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                params.row.tradeDirection === 0 ? this.$t('in_account') : this.$t('out_account')
              )
            ])
          }
        },
        { title: this.$t('pre_trans_amount'), key: 'preTransactionAmount' },
        { title: this.$t('post_trans_amount'), key: 'postTransactionAmount' },
        {
          title: this.$t('create_date'),
          key: 'createdAt',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                new Date(params.row.createdAt).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
              )
            ])
          }
        },
        {
          title: this.$t('update_date'),
          key: 'updateAt',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                new Date(params.row.updateAt).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
              )
            ])
          }
        }
        // {
        //   title: '冻结',
        //   key: 'frozenStatus',
        //   render: (h, params) => {
        //     return h('div', [
        //       h(
        //         'div',
        //         {},
        //         params.row.frozenStatus === 0 ? '可冻结'
        //           : params.row.frozenStatus === 1 ? '冻结中' : '已冻结'
        //       )
        //     ])
        //   }
        // }
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
        userName: this.searchName,
        transactionType: this.searchType,
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
      request.getTranRecordList({
        userName: this.searchName,
        transactionType: this.searchType,
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
    request.getTranRecordList({
      userName: this.searchName,
      transactionType: this.searchType,
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
