<template>
  <div>
    <Card>
      <div class="sys_config">
        <div style="margin-left: 15px">{{$t('game_title')}}</div>
        <Input v-model="game_title" style="width: 300px; margin-left: 15px" :placeholder="$t('plz_input_game_title')">
        </Input>
        <br>
        <div style="margin-left: 15px">{{$t('game_content')}}</div>
        <Input v-model="game_content" type="textarea" style="width: 300px; margin-left: 15px"
               :placeholder="$t('plz_input_game_content')" maxlength="255">
          <span slot="prepend">&nbsp;&nbsp;&nbsp;{{$t('game_content')}} : &nbsp;&nbsp;&nbsp;</span>
        </Input>
        <br>
        <div>
          <div style="margin-left: 15px">{{$t('betting_gear')}}</div>
          <Checkbox v-model="one" style="margin-left: 15px">1</Checkbox>
          <Checkbox v-model="ten" style="margin-left: 15px">10</Checkbox>
          <Checkbox v-model="hundred" style="margin-left: 15px">100</Checkbox>
          <Checkbox v-model="thousand" style="margin-left: 15px">1000</Checkbox>
        </div>
        <br>
        <div>
          <div style="margin-left: 15px">{{$t('select_start_time')}}</div>
          <Col span="12">
            <DatePicker type="date" :placeholder="$t('select_start_date')" style="width: 168px; margin-left: 15px" :value="start_date"
                        @on-change="handleChangeStartDate"></DatePicker>
          </Col>
          <Col span="12">
            <TimePicker type="time" :placeholder="$t('select_start_time')" style="width: 168px; margin-left: 25px" :value="start_time"
                        @on-change="handleChangeStartTime"></TimePicker>
          </Col>
        </div>
        <br>
        <div>
          <div style="margin-left: 15px">{{$t('select_win_time')}}</div>
          <Col span="12">
            <DatePicker type="date" :placeholder="$t('select_win_date')" style="width: 168px; margin-left: 15px" :value="date"
                        @on-change="handleChangeDate"></DatePicker>
          </Col>
          <Col span="12">
            <TimePicker type="time" :placeholder="$t('select_win_time')" style="width: 168px; margin-left: 25px" :value="time"
                        @on-change="handleChangeTime"></TimePicker>
          </Col>
        </div>
        <br>
        <div style="margin-left: 15px">{{$t('describ_url')}}</div>
        <Input v-model="describ_url" style="width: 400px; margin-left: 15px" :placeholder="$t('plz_describ_url')">
        </Input>
        <br>
        <div>{{$t('rules_pic_video')}}</div>
        <cropper
          v-bind:dirtype="dirType"
          v-bind:url="rulesPic"
          @on-crop="handleCroped"
          @on-submit="updatePic"
        ></cropper>
        <br>
        <div style="margin-top: 100px">{{$t('game_title_pic')}}</div>
        <cropper
          v-bind:dirtype="dirType1"
          v-bind:url="titlePic"
          @on-crop="handleCroped"
          @on-submit="updateTitlePic"
        ></cropper>
        <br>
        <div>
          <Button type="primary" style="margin-left: 15px; margin-top: 100px;" @click="addGameInstance">{{ $t('save') }}</Button>
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
      one: false,
      ten: false,
      hundred: false,
      thousand: false,
      date: '',
      time: '',
      game_content: '',
      game_title: '',
      start_date: '',
      start_time: '',
      dirType: {dirType: 'game-describe'},
      dirType1: {dirType: 'game-list'},
      rulesPic: '',
      titlePic: '',
      describ_url: ''
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
    handleChangeStartDate (data) {
      this.start_date = data
    },
    handleChangeStartTime (data) {
      this.start_time = data
    },
    updatePic (pic) {
      this.rulesPic = pic;
    },
    updateTitlePic (pic) {
      this.titlePic = pic;
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

    dataCheck () {
      if (this.game_title === '') {
        this.$Message.error(this.$t('plz_input_game_title'))
        return
      }
      if (this.game_content === '') {
        this.$Message.error(this.$t('plz_input_game_content'))
        return
      }
      if (!(this.one || this.ten || this.hundred || this.thousand)) {
        this.$Message.error(this.$t('plz_input_betting_gear'))
        return
      }
      if (this.date === '') {
        this.$Message.error(this.$t('plz_select_win_date'))
        return
      }
      if (this.time === '') {
        this.$Message.error(this.$t('plz_select_win_time'))
        return
      }
      if (this.start_date === '') {
        this.$Message.error(this.$t('plz_select_start_date'))
        return
      }
      if (this.start_time === '') {
        this.$Message.error(this.$t('plz_select_start_time'))
        return
      }
    },
    addGameInstance () {
      this.dataCheck()
      let betGear = ''
      let is_choose = 0
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
        this.$Message.error(this.$t('setting_atleast'))
        return
      }
      let lotteryTime = this.date + ' ' + this.time
      lotteryTime = lotteryTime.replace(/-/g, '/')
      let startTime = this.start_date + ' ' + this.start_time
      startTime = startTime.replace(/-/g, '/')
      // lotteryTime = lotteryTime.getUTCDate();
      // let lotteryDT = new Date(lotteryTime).toUTCString();
      request.addGameInstance({
        gameTitle: this.game_title,
        lotteryTime: lotteryTime,
        gameContent: this.game_content,
        betGear: betGear,
        startTime: startTime,
        describe: this.rulesPic,
        titlePicture: this.titlePic,
        describUrl: this.describ_url
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
