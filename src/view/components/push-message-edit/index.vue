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
        <!--<Input v-model="content" type="textarea" style="width: 300px;"-->
               <!--:placeholder="$t('plz_input_msg_content')" maxlength="255">-->
        <!--</Input>-->
        <editor style="width: 1000px" ref="editor" :value="content" @on-change="handleChange"/>
        <br>
        <div>
          <Button type="primary" style="margin-left: 15px" @click="updateMsg">{{$t('save')}}</Button>
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
      content: ''
    }
  },
  methods: {
    handleChange (html, text) {
      //console.log(html, text)
      //this.content = html;
      //console.log('content==', this.content)
    },
    handleDelete (params) {
      console.log(params)
    },
    updateMsg () {
      request.updateMessage({
        id: this.$route.query.id,
        content: this.content,
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
    request.getMessage({
      id: this.$route.query.id
    }).then(res => {
      this.title = res.body.data.title
      this.content = res.body.data.content
      this.$refs.editor.setHtml(this.content)
    })
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
