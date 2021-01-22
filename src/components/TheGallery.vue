<template>
  <div>
    <h1>Image Aligner</h1>
    <input name="" type="file" value=""
           accept="image/png, image/jpeg"
           @change="updateImage"
           multiple />

    <div v-if="isImageUploading">
      uploading images...
    </div>

    <ImageEditor v-if="imageObj" :image="imageObj"></ImageEditor>

  </div>
</template>

<script>
import ImageEditor from './ImageEditor.vue'

export default {
  components: {
    ImageEditor
  },
  data() {
    return {
      fileList: [],
      imageSrcList: [],
      isImageUploading: false,
      imageObj: null
    }
  },
  mounted() {
  },
  methods: {
    async updateImage(event) {
      this.isImageUploading = true
      this.fileList = [...event.target.files]
      this.imageSrcList = await Promise.all(this.fileList.map(this.readAsDataURL))
      if (this.imageSrcList[0]) {
        this.imageObj = new Image()
        this.imageObj.src = this.imageSrcList[0]
      }
      this.isImageUploading = false
    },
    async readAsDataURL(image) {
      return new Promise((resolve, reject) => {
        let content = ''
        let reader = new FileReader()
        reader.onloadend = (e) => {
          content = e.target.result
          resolve(content)
        }
        reader.onerror = (e) => {
          reject(e)
        }
        reader.readAsDataURL(image)
      })
    }
  }
}
</script>
