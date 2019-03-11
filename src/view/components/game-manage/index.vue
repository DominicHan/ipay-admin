<template>
  <div>
    <Card>
      <div class="searchLine">
        <Button type="primary" style="margin-left: 15px" to="/add_game" replace>{{$t('add')}}</Button>
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
        { title: this.$t('game_title'), key: 'gameTitle', sortable: false },
        { title: this.$t('created_at'), key: 'createdAt', sortable: false },
        { title: this.$t('game_content'), key: 'gameContent', sortable: false },
        { title: this.$t('bet_gear'), key: 'betGear', sortable: false },
        { title: this.$t('lottery_time'), key: 'lotteryTime', sortable: false },
        { title: this.$t('operation'),
          key: 'handle',
          width: 230,
          // align: 'center',
          // options: ['delete'],
          button: [
            (h, params) => {
              return h('Button', {
                style: {
                  marginTop: '5px'
                },
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/game_result_set', query: { gameId: params.row.id } })
                  }
                }
              }, '结果编辑')
            },
            (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginTop: '5px',
                  marginLeft: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/game_profit', query: { gameId: params.row.id } })
                  }
                }
              }, this.$t('profit_loss_table'))
            },
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: this.$t('confirm_del')
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
                    marginTop: '5px',
                    marginLeft: '5px'
                  },
                  props: {
                    type: 'error',
                    size: 'small'
                  }
                }, this.$t('delete'))
              ])
            },
            (h, params) => {
              return h('Button', {
                style: {
                  marginTop: '5px'
                },
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/game_set', query: { gameId: params.row.id } })
                  }
                }
              }, '内容编辑')
            },
          ]
        }
      ],
      tableData: []
    }
  },
  watch: {
    local: function (val) { // 侦听单选按钮的变化，从而进行切换语言
      this.columns = [
        { title: this.$t('game_title'), key: 'gameTitle', sortable: false },
        { title: this.$t('created_at'), key: 'createdAt', sortable: false },
        { title: this.$t('game_content'), key: 'gameContent', sortable: false },
        { title: this.$t('bet_gear'), key: 'betGear', sortable: false },
        { title: this.$t('lottery_time'), key: 'lotteryTime', sortable: false },
        { title: this.$t('operation'),
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
              }, this.$t('edit'))
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
              }, this.$t('profit_loss_table'))
            },
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: this.$t('confirm_del')
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
                }, this.$t('delete'))
              ])
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['local'])
  },
  methods: {
    handleDelete (params) {
      // console.log(params)
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
