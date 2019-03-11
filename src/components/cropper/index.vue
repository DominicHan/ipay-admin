<template>
  <div class="cropper-wrapper">
    <div class="img-box">
      <img class="cropper-image" :id="imgId" alt="">
    </div>
    <div class="right-con">
      <div class="preview-box" :id="previewId"></div>
      <a :href="videoPath" target="_blank">{{videoPath}}</a>
      <div class="button-box">
        <slot>
          <Upload
            action="http://47.74.24.151:8080/set_game_result_pic"
            name="file"
            :on-format-error="formatError"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload">
            <Button style="width: 150px;" type="primary">{{$t('update_pic')}}</Button>
          </Upload>
        </slot>
        <!--<div v-show="insideSrc">-->
          <!--<Button style="width: 150px;margin-top: 10px;" type="primary" @click="crop">{{ cropButtonText }}</Button>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import './index.less'
import 'cropperjs/dist/cropper.min.css'
import rootUrl from '../../assets/js/request'
export default {
  name: 'Cropper',
  props: {
    src: {
      type: String,
      default: ''
    },
    preview: {
      type: Boolean,
      default: false
    },
    moveStep: {
      type: Number,
      default: 4
    },
    cropButtonText: {
      type: String,
      default: '裁剪'
    },
    url: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      cropper: null,
      insideSrc: '',
      videoPath: ''
    }
  },
  computed: {
    imgId () {
      return `cropper${this._uid}`
    },
    previewId () {
      return `cropper_preview${this._uid}`
    }
  },
  watch: {
    src (src) {
      this.replace(src)
    },
    insideSrc (src) {
      this.replace(src)
    },
    url (src) {
      this.replace(src)
      this.videoPath = 'http://47.74.24.151:8080' + src
    },
  },
  methods: {
    beforeUpload (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        this.insideSrc = event.srcElement.result
      }
      //return false
    },
    uploadSuccess (response, file, fileList) {
      // console.log('res-Success',response)
      this.videoPath = 'http://47.74.24.151:8080' + response.data.path;
      this.$emit("on-submit", response.data.path)
    },
    uploadError (error, file, fileList) {
      console.log('res-Error',error)
    },
    formatError (file, fileList) {
      console.log('format-Error',file)
    },
    replace (src) {
      this.cropper.replace(src)
      this.insideSrc = src
    },
    rotate () {
      this.cropper.rotate(90)
    },
    shrink () {
      this.cropper.zoom(-0.1)
    },
    magnify () {
      this.cropper.zoom(0.1)
    },
    scale (d) {
      this.cropper[`scale${d}`](-this.cropper.getData()[`scale${d}`])
    },
    move (...argu) {
      this.cropper.move(...argu)
    },
    crop () {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.$emit('on-crop', blob)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      let dom = document.getElementById(this.imgId)
      this.cropper = new Cropper(dom, {
        preview: `#${this.previewId}`,
        checkCrossOrigin: true
      })
    })
  }
}
</script>
