<template>
  <div>
    <Card>
      <div class="sys_config">
        <div>{{$t('msg_title')}}</div>
        <Input v-model="title"  style="width: 300px;"
               :placeholder="$t('plz_input_msg_title')" maxlength="255">
        </Input>
        <br>
        <div>{{$t('msg_content')}}</div>
        <Input v-model="content" type="textarea" style="width: 300px;"
               :placeholder="$t('plz_input_msg_content')" maxlength="255">
        </Input>
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
export default {
  name: 'tables_page',
  components: {
    Tables,
  },
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    sendMsg () {
      request.sendPush({
        alert: this.content,
        title: this.title
      }).then(res => {
        if (res.body.rspCode === '000000') {
          this.$Message.success(this.$t("add_success"))
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
</style>
