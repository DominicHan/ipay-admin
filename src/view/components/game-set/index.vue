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
        <div>{{$t('start_time')}}</div>
        <div>
          <Col span="12">
            <DatePicker type="date" :placeholder="$t('select_start_date')" style="width: 168px;" :value="start_date"
                        @on-change="handleChangeStartDate"></DatePicker>
          </Col>
          <Col span="12">
            <TimePicker type="time" :placeholder="$t('select_start_time')" style="width: 168px; margin-left: 10px" :value="start_time"
                        @on-change="handleChangeStartTime"></TimePicker>
          </Col>
        </div>
        <br>
        <div>{{$t('lottery_time')}}</div>
        <div>
          <Col span="12">
            <DatePicker type="date" :placeholder="$t('select_win_date')" style="width: 168px;" :value="date"
                        @on-change="handleChangeDate"></DatePicker>
          </Col>
          <Col span="12">
            <TimePicker type="time" :placeholder="$t('select_win_time')" style="width: 168px; margin-left: 10px" :value="time"
                        @on-change="handleChangeTime"></TimePicker>
          </Col>
        </div>
        <br>
        <div>{{$t('rules_pic_video')}}</div>
        <cropper
          v-bind:dirtype="dirType"
          v-bind:url="rulesPic"
          @on-crop="handleCroped"
          @on-submit="updatePic"
        ></cropper>
        <br>
        <div>{{$t('game_title_pic')}}</div>
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
      date: '',
      time: '',
      rulesPic: '',
      titlePic: '',
      dirType: {dirType: 'game-describe'},
      dirType1: {dirType: 'game-list'},
      start_date: '',
      start_time: '',
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
      let lotteryTime = this.date + ' ' + this.time
      lotteryTime = lotteryTime.replace(/-/g, '/')
      // let newTime = new Date(lotteryTime)
      // newTime = newTime.format("yyyy-MM-dd hh:mm:ss")
      let startTime = this.start_date + ' ' + this.start_time
      startTime = startTime.replace(/-/g, '/')
      // let newStartTime = new Date(startTime)
      // newStartTime = newStartTime.format("yyyy-MM-dd hh:mm:ss")
      //newTime.setHours(newTime.getHours() + 8);
      request.setGameInstanceInfo({
        id: this.$route.query.gameId,
        gameTitle: this.gameTitle,
        gameContent: this.gameContent,
        lotteryTime: lotteryTime,
        startTime: startTime,
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
      //this.lotteryTime = res.body.data.instance.lotteryTime
      this.rulesPic = res.body.data.instance.describe
      this.titlePic = res.body.data.instance.titlePicture
      this.date = res.body.data.instance.lotteryTime.split(' ')[0]
      this.time = res.body.data.instance.lotteryTime.split(' ')[1]
      this.start_date = res.body.data.instance.startTime.split(' ')[0]
      this.start_time = res.body.data.instance.startTime.split(' ')[1]
    })
  }
}
Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
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
