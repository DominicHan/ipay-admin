<template>
  <div>
    <Card>
      <div class="searchLine">
        <Button type="primary" style="margin-left: 15px" to="/add_game" replace>添加</Button>
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
        { title: '游戏标题', key: 'gameTitle', sortable: false },
        { title: '发布时间', key: 'createdAt', sortable: false },
        { title: '游戏内容', key: 'gameContent', sortable: false },
        { title: '投注档位', key: 'betGear', sortable: false },
        { title: '开奖时间', key: 'lotteryTime', sortable: false },
        { title: '操作',
          key: 'handle',
          width: 230,
          // align: 'center',
          // options: ['delete'],
          button: [
            (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/game_result_set', query: { gameId: params.row.id } })
                  }
                }
              }, '编辑')
            },
            (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginLeft: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/game_profit', query: { gameId: params.row.id } })
                  }
                }
              }, '盈亏表')
            },
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', {
                  style: {
                    marginLeft: '5px'
                  },
                  props: {
                    type: 'error',
                    size: 'small'
                  }
                }, '删除')
              ])
            },
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      //console.log(params)
      request.delGameInstance({
        id: params.row.id
      }).then(res => {
      })
    },
    change (page) {
      request.gameInstanceList({
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
      request.gameInstanceList({
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
    request.gameInstanceList({
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
