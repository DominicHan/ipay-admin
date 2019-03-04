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
        { title: '参与人账号', key: 'userId', sortable: false },
        {
          title: '参与选择',
          key: 'userChoice',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                params.row.userChoice === 0 ? '否' : '是'
              )
            ])
          }
        },
        { title: '参与金额', key: 'partInAmount' },
        { title: '奖励金额', key: 'rewardAmount' },
        { title: '参与结果',
          key: 'results',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {},
                params.row.results === 0 ? '未中奖' : '中奖'
              )
            ])
          }
        }
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
