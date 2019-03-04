<template>
  <div>
    <Card>
      <Button style="margin: 10px;overflow: hidden;position: absolute; top: 16px; right: 51%"
        type="primary" to="/add_admin_user" replace>添加</Button>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <div style="margin: 10px;overflow: hidden">
        <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
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
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '账号', key: 'id', sortable: false },
        { title: '姓名', key: 'adminName' },
        { title: '手机号', key: 'adminTel' },
        { title: '操作',
          key: 'handle',
          width: 150,
          // align: 'center',
          // options: ['delete'],
          button: [
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
                  props: {
                    type: 'error',
                    size: 'small'
                  }
                }, '删除')
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
              }, '查看')
            }
          ]
        }
      ],
      tableData: []
    }
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
