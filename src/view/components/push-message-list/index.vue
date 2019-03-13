<template>
  <div>
    <Card>
      <div class="searchLine">
        <!--<Button type="primary" style="margin-left: 15px" to="/add_game" replace>{{$t('add')}}</Button>-->
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
      pageTotal: 0,
      pageSize: 0,
      columns: [
        { title: this.$t('msg_send_time'), key: 'createdAt', sortable: false },
        { title: this.$t('msg_title'), key: 'title', sortable: false },
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
                    this.$router.push({ path: 'push_message_edit', query: { id: params.row.id } })
                  }
                }
              }, this.$t('look_over'))
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
      ],
      tableData: []
    }
  },
  watch: {
    local: function (val) { // 侦听单选按钮的变化，从而进行切换语言
      this.columns = [
        { title: this.$t('msg_send_time'), key: 'createdAt', sortable: false },
        { title: this.$t('msg_title'), key: 'title', sortable: false },
        { title: this.$t('msg_content'), key: 'content', sortable: false },
        { title: this.$t('operation'),
          key: 'handle',
          width: 230,
          // align: 'center',
          // options: ['delete'],
          button: [
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
      request.delMessage({
        id: params.row.id
      }).then(res => {
      })
    },
    change (page) {
      request.messageList({
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
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
  },
  mounted () {
    request.messageList({
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
