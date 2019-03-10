<template>
  <div>
    <Card>
      <div class="sys_config">
        <div>{{$t('game_title')}}</div>
        <div>{{gameTitle}}</div>
        <br>
        <div>{{$t('game_content')}}</div>
        <Input v-model="gameContent" type="textarea" style="width: 300px;"
               :placeholder="$t('plz_input_game_content')" maxlength="255">
          <span slot="prepend">&nbsp;&nbsp;&nbsp;{{$t('game_content')}} : &nbsp;&nbsp;&nbsp;</span>
        </Input>
        <br>
        <div>{{$t('lottery_time')}}</div>
        <div>{{lotteryTime}}</div>
        <br>
        <div>{{$t('set_game_result')}}</div>
        <!--<div>{{this.changingStatus(results)}}</div>-->
        <RadioGroup v-model="results" size="large">
          <Radio :label="$t('yes')" ></Radio>
          <Radio :label="$t('no')" ></Radio>
        </RadioGroup>
        <br>
        <div>{{$t('confirm_text')}}</div>
        <Input v-model="confirmText" type="textarea" style="width: 300px;"
               :placeholder="$t('plz_input_confirm_text')" maxlength="255">
        </Input>
        <br>
        <div>{{$t('confirm_url')}}</div>
        <Input v-model="confirmUrl" type="textarea" style="width: 300px;"
               :placeholder="$t('plz_input_confirm_url')" maxlength="255">
        </Input>
        <br>
          <cropper
            @on-crop="handleCroped"
            @on-submit="updatePic"
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
      results: '',
      confirmPic: '',
      confirmUrl: '',
      confirmText: ''
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
        results: this.changingStatus(this.results),
        gameContent: this.gameContent,
        confirmUrl: this.confirmUrl,
        confirmText: this.confirmText,
        confirmPic: this.confirmPic
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
      this.confirmPic = pic;
    }
  },
  mounted () {
    request.getGameInstance({
      id: this.$route.query.gameId
    }).then(res => {
      // console.log(JSON.stringify(res.body.data));
      this.gameNum = res.body.data.instance.id
      this.gameTitle = res.body.data.instance.gameTitle
      this.gameContent = res.body.data.instance.gameContent
      this.lotteryTime = res.body.data.instance.lotteryTime
      this.results = this.changingUnStatus(res.body.data.instance.results)
      this.confirmPic = res.body.data.instance.confirmPic
      this.confirmUrl = res.body.data.instance.confirmUrl
      this.confirmText = res.body.data.instance.confirmText
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
