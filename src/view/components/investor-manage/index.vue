<template>
  <div>
    <Card>
      <div class="searchLine">
        <Input v-model="searchName" style="width: 250px;">
          <span slot="prepend">&nbsp;&nbsp;&nbsp;{{$t('name')}} : &nbsp;&nbsp;&nbsp;</span>
        </Input>
        <br><br>
        <Input v-model="searchTel" style="width: 250px; margin-left: 15px">
          <span slot="prepend">&nbsp;&nbsp;&nbsp;{{$t('user_tel')}} : &nbsp;&nbsp;&nbsp;</span>
        </Input>
        <Button type="primary" style="margin-left: 15px" @click="searchAccount">{{$t('search')}}</Button>
        <Button type="primary" style="margin-left: 15px" @click="clearSearchBox">{{$t('clear')}}</Button>
        <Button type="primary" style="margin-left: 15px" @click="exportExcel">{{$t('export_investor')}}</Button>
        <div style="margin-left: 15px">{{$t('total_balance')}}: {{balance}}</div>
        <div style="margin-left: 15px">{{$t('total_credit_balance')}}: {{creditBalance}}</div>
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
      balance: 0,
      creditBalance: 0,
      searchName: '',
      searchTel: '',
      pageTotal: 0,
      pageSize: 0,
      columns: [
        { title: this.$t('name'), key: 'userName', searchable: false },
        { title: this.$t('user_tel'), key: 'tel' },
        { title: this.$t('balance'), key: 'balance' },
        { title: this.$t('credit_balance'), key: 'creditBalance' },
        { title: this.$t('invite_code'), key: 'inviteCode' },
        {
          title: this.$t('black_list'),
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
                params.row.blacklist === 0 ? this.$t('no') : this.$t('yes')
              )
            ])
          }
        },
        { title: this.$t('operation'),
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
              }, this.$t('look_over'))
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
              }, this.$t('investor_relationship'))
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
                      this.$Message.success(this.$t('thaw_success'))
                    }
                  }
                }, this.$t('thaw'))

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
                      this.$Message.success(this.$t('freeze_success'))
                    }
                  }
                }, this.$t('freeze'))
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
        { title: this.$t('name'), key: 'userName', searchable: false },
        { title: this.$t('user_tel'), key: 'tel' },
        { title: this.$t('balance'), key: 'balance' },
        { title: this.$t('credit_balance'), key: 'creditBalance' },
        { title: this.$t('invite_code'), key: 'inviteCode' },
        {
          title: this.$t('black_list'),
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
                params.row.blacklist === 0 ? this.$t('no') : this.$t('yes')
              )
            ])
          }
        },
        { title: this.$t('operation'),
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
              }, this.$t('look_over'))
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
              }, this.$t('investor_relationship'))
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
                      this.$Message.success(this.$t('thaw_success'))
                    }
                  }
                }, this.$t('thaw'))

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
                      this.$Message.success(this.$t('freeze_success'))
                    }
                  }
                }, this.$t('freeze'))
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
        filename: `${this.$t('investor')}-${(new Date()).valueOf()}.csv`
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
