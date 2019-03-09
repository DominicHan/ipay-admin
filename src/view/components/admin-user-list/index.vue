<template>
  <div>
    <Card>
      <Button style="margin: 10px;overflow: hidden;position: absolute; top: 16px; right: 51%"
        type="primary" to="/add_admin_user" replace>{{$t('add')}}</Button>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <div style="margin: 10px;overflow: hidden">
        <Button style="margin: 10px 0;" type="primary" @click="exportExcel">{{$t('export_excel')}}</Button>
        <!--<div style="float: right; margin-right: 60px">-->
        <!--<Page :total="100" :current="1" @on-change="changePage"></Page>-->
        <!--</div>-->
      </div>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
// import { getTableData } from '@/api/data'
// import request from '@/assets/js/request.js';
import request from '../../../assets/js/request.js'
import { mapGetters } from 'vuex'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: this.$t('account_no'), key: 'id', sortable: false },
        { title: this.$t('name'), key: 'adminName' },
        { title: this.$t('admin_tel'), key: 'adminTel' },
        { title: this.$t('operation'),
          key: 'handle',
          width: 150,
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
                  props: {
                    type: 'error',
                    size: 'small'
                  }
                }, this.$t('delete'))
              ])
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
                    // console.log(params);
                    this.$router.push({ path: '/update_admin_user', query: { id: params.row.id } })
                  }
                }
              }, this.$t('look_over'))
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
        { title: this.$t('account_no'), key: 'id', sortable: false },
        { title: this.$t('name'), key: 'adminName' },
        { title: this.$t('admin_tel'), key: 'adminTel' },
        { title: this.$t('operation'),
          key: 'handle',
          width: 150,
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
                  props: {
                    type: 'error',
                    size: 'small'
                  }
                }, this.$t('delete'))
              ])
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
                    // console.log(params);
                    this.$router.push({ path: '/update_admin_user', query: { id: params.row.id } })
                  }
                }
              }, this.$t('look_over'))
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
      // console.log(params.row.id)
      request.adminUserDelete({
        id: params.row.id
      }).then(res => {
      })
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    // getTableData().then(res => {
    //   console.log('res.data-==-=', JSON.stringify(res.data));
    //   this.tableData = res.data
    // })
    request.getAdminUserList().then(res => {
      // console.log('getAccountListData---===', JSON.stringify(res.body.data))
      this.tableData = res.body.data
    })
  }
}
</script>

<style>

</style>
