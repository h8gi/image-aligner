<template>
  <div>
    <h1>{{ msg }}</h1>
    <input name="" type="file" value=""
           accept="image/png, image/jpeg"
           @change="updateImage"
           multiple />

    <div v-if="isImageUploading">
      uploading images...
    </div>


    <canvas id="leftCanvas"></canvas>
    <canvas id="rightCanvas"></canvas>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      fileList: [],
      imageSrcList: [],
      isImageUploading: false,
      leftCanvas: null,
      rightCanvas: null
    }
  },
  mounted() {
    this.leftCanvas = document.getElementById('leftCanvas').getContext('2d')
    this.rightCanvas = document.getElementById('rightCanvas').getContext('2d')
  },
  methods: {
    async updateImage(event) {
      this.isImageUploading = true
      this.fileList = [...event.target.files]
      this.imageSrcList = await Promise.all(this.fileList.map(this.readAsDataURL))
      if (this.imageSrcList[0]) {
        let imageObj = new Image()
        imageObj.src = this.imageSrcList[0]
        this.leftCanvas.canvas.width = imageObj.width
        this.leftCanvas.canvas.height = imageObj.height
        this.leftCanvas.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height)
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
