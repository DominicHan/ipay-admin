<template>
  <div>
    <Card>
      <div class="sys_config">
        <Input v-model="benefit_ratio" style="width: 300px; margin-left: 15px">
          <span slot="prepend">&nbsp;&nbsp;&nbsp;{{$t('benefit_ratio')}} : &nbsp;&nbsp;&nbsp;</span>
          <span slot="append">%</span>
        </Input>
        <br>
        <Input v-model="in_proportion" style="width: 300px; margin-left: 15px">
          <span slot="prepend">&nbsp;&nbsp;&nbsp;{{$t('in_proportion')}} : &nbsp;&nbsp;&nbsp;</span>
          <span slot="append">%</span>
        </Input>
        <br>
        <Input v-model="out_proportion" style="width: 300px; margin-left: 15px">
          <span slot="prepend">&nbsp;&nbsp;&nbsp;{{$t('out_proportion')}} : &nbsp;&nbsp;&nbsp;</span>
          <span slot="append">%</span>
        </Input>
        <br>
        <Input v-model="game_return_pro" style="width: 300px; margin-left: 15px">
        <span slot="prepend">&nbsp;&nbsp;&nbsp;{{$t('game_return_pro')}} : &nbsp;&nbsp;&nbsp;</span>
        <span slot="append">%</span>
        </Input>
        <br>
        <div>
          <Button type="primary" style="margin-left: 15px" @click="updateSysConfig">{{$t('save')}}</Button>
        </div>
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
      benefit_ratio: '',
      in_proportion: '',
      out_proportion: '',
      game_return_pro: ''
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    updateSysConfig () {
      request.updateSystemConfig({
        id: 1,
        benefitRatio: this.benefit_ratio,
        inProportion: this.in_proportion,
        outProportion: this.out_proportion,
        gameReturnPro: this.game_return_pro
      }).then(res => {
        if (res.body.rspCode === '000000') {
          this.$Message.success(this.$t('update_success'))
        } else {
          this.$Message.error(this.$t('update_error'))
        }
      })
    }
  },
  mounted () {
    request.getSystemConfig({

    }).then(res => {
      this.benefit_ratio = res.body.data.benefitRatio
      this.in_proportion = res.body.data.inProportion
      this.out_proportion = res.body.data.outProportion
      this.game_return_pro = res.body.data.gameReturnPro
    })
  }
}
</script>

<style>
  .sys_config {
    margin: 10px;
    /*overflow: hidden;*/
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
