<template>
  <div>
    <Card>
      <div class="sys_config">
        <Input v-model="game_title" style="width: 300px; margin-left: 15px" placeholder="请输入游戏标题">
        </Input>
        <br>
        <Input v-model="game_content" type="textarea" style="width: 300px; margin-left: 15px"
               placeholder="请输入游戏内容" maxlength="255">
          <span slot="prepend">&nbsp;&nbsp;&nbsp;游戏内容 : &nbsp;&nbsp;&nbsp;</span>
        </Input>
        <br>
        <div>
          <div style="margin-left: 15px">可投注档位</div>
          <Checkbox v-model="one" style="margin-left: 15px">1</Checkbox>
          <Checkbox v-model="ten" style="margin-left: 15px">10</Checkbox>
          <Checkbox v-model="hundred" style="margin-left: 15px">100</Checkbox>
          <Checkbox v-model="thousand" style="margin-left: 15px">1000</Checkbox>
        </div>
        <br>
        <div>
          <Col span="12">
            <DatePicker type="date" placeholder="选择开奖日期" style="width: 168px; margin-left: 15px" :value="date"
                        @on-change="handleChangeDate"></DatePicker>
          </Col>
          <Col span="12">
            <TimePicker type="time" placeholder="选择开奖时间" style="width: 168px; margin-left: 25px" :value="time"
                        @on-change="handleChangeTime"></TimePicker>
          </Col>
        </div>
        <br>
        <div>
          <Button type="primary" style="margin-left: 15px" @click="addGameInstance">保存</Button>
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
      one: false,
      ten: false,
      hundred: false,
      thousand: false,
      date: '',
      time: '',
      game_content: '',
      game_title: ''
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    handleChangeDate (data) {
      this.date = data
    },
    handleChangeTime (data) {
      this.time = data
    },
    dataCheck () {
      if (this.game_title === '') {
        this.$Message.error('请输入游戏标题')
        return
      }
      if (this.game_content === '') {
        this.$Message.error('请输入游戏内容')
        return
      }
      if (!(this.one || this.ten || this.hundred || this.thousand)) {
        this.$Message.error('请选择可投注档位')
        return
      }
      if (this.date === '') {
        this.$Message.error('请选择开奖日期')
        return
      }
      if (this.time === '') {
        this.$Message.error('请选择开奖时间')
      }
    },
    addGameInstance () {
      this.dataCheck();
      let betGear = '';
      let is_choose = 0;
      if (this.one) {
        betGear += ',1'
        is_choose += 1
      }
      if (this.ten) {
        betGear += ',10'
        is_choose += 1
      }
      if (this.hundred) {
        betGear += ',100'
        is_choose += 1
      }
      if (this.thousand) {
        betGear += ',1000'
        is_choose += 1
      }
      if (is_choose < 3) {
        this.$Message.error('设置参数至少是三个')
        return;
      }
      let lotteryTime = this.date + ' ' + this.time;
      lotteryTime = lotteryTime.replace(/-/g,"/");
      //lotteryTime = lotteryTime.getUTCDate();
      //let lotteryDT = new Date(lotteryTime).toUTCString();
      request.addGameInstance({
        gameTitle: this.game_title,
        lotteryTime: lotteryTime,
        gameContent: this.game_content,
        betGear: betGear
      }).then(res => {
        // console.log(JSON.stringify(res.body))
        this.$router.push({ path: '/components/game-manage' })
      })
    }
  },
  mounted () {

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
