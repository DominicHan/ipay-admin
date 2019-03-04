<template>
  <div>
    <Card>
      <div class="sys_config">
        <div>游戏标题</div>
        <div>{{gameTitle}}</div>
        <br>
        <div>游戏内容</div>
        <Input v-model="gameContent" type="textarea" style="width: 300px;"
               placeholder="请输入游戏内容" maxlength="255">
          <span slot="prepend">&nbsp;&nbsp;&nbsp;游戏内容 : &nbsp;&nbsp;&nbsp;</span>
        </Input>
        <br>
        <div>开奖时间</div>
        <div>{{lotteryTime}}</div>
        <br>
        <div>设置游戏结果</div>
        <!--<div>{{this.changingStatus(results)}}</div>-->
        <RadioGroup v-model="results" size="large">
          <Radio label="是" ></Radio>
          <Radio label="否" ></Radio>
        </RadioGroup>
        <br>
        <div>
          <Button type="primary" style="margin-left: 15px" @click="setGameInstanceInfo">保存</Button>
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
      gameTitle: '',
      gameContent: '',
      lotteryTime: '',
      results: ''
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    changingStatus (status) {
      if (status === '是') {
        return 1
      } else {
        return 0
      }
    },
    changingUnStatus (status) {
      if (status === 1) {
        return '是'
      } else if (status === 0) {
        return '否'
      } else {
        return '未知'
      }
    },
    setGameInstanceInfo () {
      request.setGameInstanceInfo({
        id: this.$route.query.gameId,
        results: this.changingStatus(this.results),
        gameContent: this.gameContent
      }).then(res => {
        if (res.body.rspCode === '000000') {
          this.$Message.success('设置成功')
          this.$router.push({ path: '/components/game-manage' })
        } else {
          this.$Message.error('设置失败')
        }
      })
    }
  },
  mounted () {
    request.getGameInstance({
      id: this.$route.query.gameId
    }).then(res => {
      // console.log(JSON.stringify(res.body.data));
      this.gameTitle = res.body.data.instance.gameTitle
      this.gameContent = res.body.data.instance.gameContent
      this.lotteryTime = res.body.data.instance.lotteryTime
      this.results = this.changingUnStatus(res.body.data.instance.results)
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
