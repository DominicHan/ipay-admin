<template>
  <div>
    <Card>
      <div class="searchLine">
        <Input v-model="searchName" style="width: 250px;">
        <span slot="prepend">&nbsp;&nbsp;&nbsp;投资人姓名 : &nbsp;&nbsp;&nbsp;</span>
        </Input>
        <br><br>
        <span slot="prepend">&nbsp;&nbsp;&nbsp;交易类型 : &nbsp;&nbsp;&nbsp;</span>
        <Select v-model="searchType" slot="append" style="width: 150px">
          <Option value=-1>全部</Option>
          <Option value=0>转账</Option>
          <Option value=1>信用账户转换</Option>
          <Option value=2>邀请红利</Option>
        </Select>
        <Button type="primary" style="margin-left: 15px" @click="searchRecord">搜索</Button>
        <Button type="primary" style="margin-left: 15px" @click="clearSearchBox">清空</Button>
      </div>
      <tables ref="tables" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <div style="margin: 10px; display: flex; align-items: center">
        <template>
          <Page :total="pageTotal" show-elevator :page-size="pageSize" @on-change="change"/>
        </template>
        <div style="margin-left: 20px">共 {{this.pageTotal}} 条</div>
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
      searchName: '',
      searchType: -1,
      pageTotal: 0,
      pageSize: 0,
      columns: [
        { title: '投资人姓名', key: 'userName', sortable: false },
        {
          title: '交易类型',
          key: 'transactionType',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                params.row.transactionType === 0 ? '转账' : '信用账户转换'
              )
            ])
          }
        },
        { title: '交易金额', key: 'transactionAmount' },
        {
          title: '交易方向',
          key: 'tradeDirection',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                params.row.tradeDirection === 0 ? '入账' : '出账'
              )
            ])
          }
        },
        { title: '修改之前金额', key: 'preTransactionAmount' },
        { title: '修改之后金额', key: 'postTransactionAmount' },
        {
          title: '创建时间',
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
          title: '更新时间',
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
