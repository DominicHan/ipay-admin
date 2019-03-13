<template>
  <div>
    <Card>
      <div class="sys_config">
        <div>{{$t('game_title')}}</div>
        <Input v-model="gameTitle" style="width: 300px;"
               :placeholder="$t('plz_input_game_title')" maxlength="255">
        </Input>
        <br>
        <div>{{$t('game_content')}}</div>
        <Input v-model="gameContent" type="textarea" style="width: 300px;"
               :placeholder="$t('plz_input_game_content')" maxlength="255">
          <span slot="prepend">&nbsp;&nbsp;&nbsp;{{$t('game_content')}} : &nbsp;&nbsp;&nbsp;</span>
        </Input>
        <br>
        <div>{{$t('lottery_time')}}</div>
        <div>
          <Col span="12">
            <DatePicker type="date" :placeholder="$t('select_win_date')" style="width: 168px;" :value="lotteryTime"
                        @on-change="handleChangeDate"></DatePicker>
          </Col>
          <Col span="12">
            <TimePicker type="time" :placeholder="$t('select_win_time')" style="width: 168px; margin-left: 10px" :value="lotteryTime"
                        @on-change="handleChangeTime"></TimePicker>
          </Col>
        </div>
        <br>
        <div>规则视频/图片</div>
        <cropper
          v-bind:dirtype="dirType"
          v-bind:url="rulesPic"
          @on-crop="handleCroped"
          @on-submit="updatePic"
        ></cropper>
        <br>
        <div>游戏列表图</div>
        <cropper
          v-bind:dirtype="dirType1"
          v-bind:url="titlePic"
          @on-crop="handleCroped"
          @on-submit="updateTitlePic"
        ></cropper>
        <br>
        <div>
          <Button type="primary" style="margin-left: 15px" @click="setGameInstanceInfo">{{$t('save')}}</Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import request from '../../../assets/js/request.js'
import Cropper from '@/components/cropper'
export default {
  name: 'tables_page',
  components: {
    Tables,
    Cropper
  },
  data () {
    return {
      gameNum: -1,
      gameTitle: '',
      gameContent: '',
      lotteryTime: '',
      rulesPic: '',
      titlePic: '',
      dirType: {dirType: 'game-describe'},
      dirType1: {dirType: 'game-list'}
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    handleCroped (blob) {
      const formData = new FormData()
      formData.append('croppedImg', blob)
      request.setGameResultPic({
        file: blob
      }).then(() => {
        this.$Message.success('Upload success~')
      })
    },
    changingStatus (status) {
      if (status === this.$t('yes')) {
        return 1
      } else {
        return 0
      }
    },
    changingUnStatus (status) {
      if (status === 1) {
        return this.$t('yes')
      } else if (status === 0) {
        return this.$t('no')
      } else {
        return this.$t('unknown')
      }
    },
    setGameInstanceInfo () {
      request.setGameInstanceInfo({
        id: this.$route.query.gameId,
        gameTitle: this.gameTitle,
        gameContent: this.gameContent,
        lotteryTime: new Date(this.lotteryTime),
        describe: this.rulesPic,
        titlePicture: this.titlePic
      }).then(res => {
        if (res.body.rspCode === '000000') {
          this.$Message.success(this.$t('set_success'))
          this.$router.push({ path: '/components/game-manage' })
        } else {
          this.$Message.error(this.$t('set_error'))
        }
      })
    },
    updatePic (pic) {
      this.rulesPic = pic;
    },
    updateTitlePic (pic) {
      this.titlePic = pic;
    }
  },
  mounted () {
    request.getGameInstance({
      id: this.$route.query.gameId
    }).then(res => {
      this.gameNum = res.body.data.instance.id
      this.gameTitle = res.body.data.instance.gameTitle
      this.gameContent = res.body.data.instance.gameContent
      this.lotteryTime = res.body.data.instance.lotteryTime
      this.rulesPic = res.body.data.instance.describe
      this.titlePic = res.body.data.instance.titlePicture
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
