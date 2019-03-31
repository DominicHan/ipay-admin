<template>
  <div>
    <Card>
      <div class="sys_config">
        <div>{{$t('msg_title')}}</div>
        <Input v-model="title"  style="width: 300px;"
               :placeholder="$t('plz_input_msg_title')" maxlength="255">
        </Input>
        <br>
        <div>
          <div>{{$t('msg_send_time')}}</div>
          <Col span="12">
            <DatePicker :disabled="!single" type="date" :placeholder="$t('plz_send_date')" style="width: 168px;" :value="date"
                        @on-change="handleChangeDate"></DatePicker>
          </Col>
          <Col span="12">
            <TimePicker :disabled="!single" type="time" :placeholder="$t('plz_send_time')" style="width: 168px;" :value="time"
                        @on-change="handleChangeTime"></TimePicker>
          </Col>
          <Checkbox style="margin-top: 10px;" v-model="single">{{$t('regularly_send')}}</Checkbox>
        </div>
        <br>
        <div>{{$t('msg_content')}}</div>
        <!--<Input v-model="content" type="textarea" style="width: 300px;"-->
               <!--:placeholder="$t('plz_input_msg_content')" maxlength="255">-->
        <!--</Input>-->
        <editor style="width: 1000px" ref="editor" :value="content" @on-change="handleChange"/>
        <br>
        <div>
          <Button type="primary" style="margin-left: 15px" @click="sendMsg">{{$t('send')}}</Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import request from '../../../assets/js/request.js'
import Editor from '_c/editor'
export default {
  name: 'tables_page',
  components: {
    Tables,
    Editor
  },
  data () {
    return {
      title: '',
      content: '',
      date: '',
      time: '',
      single: false
    }
  },
  methods: {
    handleChange (html, text) {
      //console.log(html, text)
      this.content = html;
      //console.log('content==', this.content)
    },
    handleDelete (params) {
      console.log(params)
    },
    handleChangeDate (data) {
      this.date = data
    },
    handleChangeTime (data) {
      this.time = data
    },
    sendMsg () {
      let scheduleTime = null
      if (this.single) {
        if (this.date === '') {
          this.$Message.error(this.$t('plz_send_date'))
          return;
        }
        if (this.time === '') {
          this.$Message.error(this.$t('plz_send_time'))
          return;
        }
        scheduleTime = this.date + ' ' + this.time
        scheduleTime = scheduleTime.replace(/-/g, '/')
      }
      request.sendPush({
        alert: this.content,
        title: this.title,
        scheduleTime: scheduleTime
      }).then(res => {
        if (res.body.rspCode === '000000') {
          this.$Message.success(this.$t("add_success"))
          this.title = '';
          this.content = '';
          this.$refs.editor.setHtml(this.content)
          this.$router.push({ path: '/components/push_message_list' })
        } else {
          this.$Message.error(this.$t("add_error"))
        }
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .w-e-menu{
    z-index: 2 !important;
  }
  .w-e-text-container{
    z-index: 1 !important;
  }
</style>
