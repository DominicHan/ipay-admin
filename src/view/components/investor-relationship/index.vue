<template>
  <Tabs type="card">
    <TabPane label="一级上级">
      <Card>
        <tables ref="tables" v-model="up_lv1" :columns="columns" @on-delete="handleDelete"/>
      </Card>
    </TabPane>
    <TabPane label="二级上级">
      <Card>
        <tables ref="tables" v-model="up_lv2" :columns="columns" @on-delete="handleDelete"/>
      </Card>
    </TabPane>
    <TabPane label="一级下级">
      <Card>
        <tables ref="tables" v-model="down_lv1" :columns="columns" @on-delete="handleDelete"/>
      </Card>
    </TabPane>
    <TabPane label="二级下级">
      <Card>
        <tables ref="tables" v-model="down_lv2" :columns="columns" @on-delete="handleDelete"/>
      </Card>
    </TabPane>
  </Tabs>
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
      up_lv1: null,
      up_lv2: null,
      down_lv1: null,
      down_lv2: null,
      columns: [
        { title: '姓名', key: 'userName', searchable: false },
        { title: '电话', key: 'tel' },
        { title: '余额', key: 'balance' },
        { title: '信用', key: 'creditBalance' },
        { title: '邀请码', key: 'inviteCode' }
      ]
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    }
  },
  mounted () {
    request.accountRelationship({
      userId: this.$route.query.userId
    }).then(res => {
      this.up_lv1 = res.body.data.up_lv1
      this.up_lv2 = res.body.data.up_lv2
      this.down_lv1 = res.body.data.down_lv1
      this.down_lv2 = res.body.data.down_lv2
    })
  }
}
</script>

<style>
  .searchLine {
    /*margin: 10px;*/
    overflow: hidden;
    display: flex;
    align-items: center;
  }
</style>
