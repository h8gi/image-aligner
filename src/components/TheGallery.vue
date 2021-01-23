<template>
  <div>
    <h1>Image Aligner</h1>
    <input name="" type="file" value=""
           accept="image/png, image/jpeg"
           @change="onFileChange"
           multiple />

    <div v-if="isImageUploading">
      uploading images...
    </div>

    <div v-for="(image, index) in imageList" :key="index">
      <ImageEditor :image="image"></ImageEditor>
    </div>

  </div>
</template>

<script>
import ImageEditor from './ImageEditor.vue'
import { ref } from 'vue'

export default {
  components: {
    ImageEditor
  },
  setup() {
    const fileList = ref([])
    const isImageUploading = ref(false)
    const imageList = ref([])

    const readFileAsImage = async (file) => {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onloadend = (e) => {
          let image = new Image()
          image.src = e.target.result
          resolve(image)
        }
        reader.onerror = (e) => {
          reject(e)
        }
        reader.readAsDataURL(file)
      })
    }

    const onFileChange = async (event) => {
      isImageUploading.value = true
      fileList.value = [...event.target.files]
      imageList.value = await Promise.all(fileList.value.map(readFileAsImage))
      isImageUploading.value = false
    }

    return {
      fileList,
      isImageUploading,
      imageList,
      onFileChange
    }
  }
}
</script>
