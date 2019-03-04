<template>
  <div>
    <Card>
      <div class="searchLine">
        <Input v-model="searchName" style="width: 250px;">
          <span slot="prepend">&nbsp;&nbsp;&nbsp;姓名 : &nbsp;&nbsp;&nbsp;</span>
        </Input>
        <br><br>
        <Input v-model="searchTel" style="width: 250px; margin-left: 15px">
          <span slot="prepend">&nbsp;&nbsp;&nbsp;电话 : &nbsp;&nbsp;&nbsp;</span>
        </Input>
        <Button type="primary" style="margin-left: 15px" @click="searchAccount">搜索</Button>
        <Button type="primary" style="margin-left: 15px" @click="clearSearchBox">清空</Button>
        <Button type="primary" style="margin-left: 15px" @click="exportExcel">导出投资人</Button>
        <div style="margin-left: 15px">总余额: {{balance}}</div>
        <div style="margin-left: 15px">总信用额: {{creditBalance}}</div>
      </div>
      <tables ref="tables" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <!--<tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>-->
      <div style="margin: 10px; display: flex; align-items: center">
        <!--<div style="float: right; margin-right: 60px">-->
        <!--<Page :total="100" :current="1" @on-change="changePage"></Page>-->
        <!--</div>-->
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
      balance: 0,
      creditBalance: 0,
      searchName: '',
      searchTel: '',
      pageTotal: 0,
      pageSize: 0,
      columns: [
        { title: '姓名', key: 'userName', searchable: false },
        { title: '电话', key: 'tel' },
        { title: '余额', key: 'balance' },
        { title: '信用', key: 'creditBalance' },
        { title: '邀请码', key: 'inviteCode' },
        {
          title: '黑名单',
          key: 'blacklist',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {
                  // props: {
                  //   color:  params.row.blacklist === "0" ? "green" : "red"
                  // }
                },
                params.row.blacklist === 0 ? '否' : '是'
              )
            ])
          }
        },
        { title: '操作',
          key: 'handle',
          width: 260,
          align: 'center',
          button: [
            (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: 'investor_edit', query: { userId: params.row.id } })
                  }
                }
              }, '查看')
            },
            (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: 'investor_relationship', query: { userId: params.row.id } })
                  }
                }
              }, '三级关系表')
            },
            (h, params) => {
              return params.row.activateStatus === 2
                ? h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.accountThaw(params.row.id)
                      params.row.activateStatus = 0
                      this.$Message.success('解冻成功')
                    }
                  }
                }, '解冻')

                : h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.frozenAccount(params.row.id)
                      params.row.activateStatus = 2
                      this.$Message.success('冻结成功')
                    }
                  }
                }, '冻结')
            }
          ]
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
      request.getAccountListData({
        userName: this.searchName,
        tel: this.searchTel,
        limit: 20,
        offset: page - 1
      }).then(res => {
        this.tableData = res.body.data.content
        this.pageTotal = res.body.data.total
        this.pageSize = res.body.data.limit
      })
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `投资人-${(new Date()).valueOf()}.csv`
      })
    },
    clearSearchBox () {
      this.searchName = ''
      this.searchTel = ''
    },
    frozenAccount (id) {
      request.frozenAccount({
        userId: id
      }).then(res => {
      })
    },
    accountThaw (id) {
      request.accountThaw({
        userId: id
      }).then(res => {
      })
    },
    searchAccount () {
      request.getAccountListData({
        userName: this.searchName,
        tel: this.searchTel,
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
    request.getAccountListData({
      userName: this.searchName,
      tel: this.searchTel,
      limit: 20,
      offset: 0
    }).then(res => {
      this.tableData = res.body.data.content
      this.pageTotal = res.body.data.total
      this.pageSize = res.body.data.limit
    })
    request.accountTotal().then(res => {
      this.balance = res.body.data.balance
      this.creditBalance = res.body.data.creditBalance
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
