<template>
  <div>
    <h4>{{ file.name }}</h4>
    <canvas id="c"></canvas>
    <div v-if="isUploading">
      uploading image...
    </div>
  </div>
</template>

<script>
import { ref, onMounted, toRefs, watch } from 'vue'

import { fabric } from 'fabric'

export default {
  props: {
    file: {
      type: File,
      required: true
    }
  },
  setup(props) {
    const { file } = toRefs(props)

    let canvas = null
    let image = null
    const isUploading = ref(false)

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

    const uploadImage = async () => {
      isUploading.value = true
      if (image) {
        canvas.remove(image)
      }
      image = await readFileAsImage(file.value)
      image = new fabric.Image(image)
      console.log(image)
      canvas.add(image)
      let width = image.width > 600 ? 600 : image.width
      let height = image.height > 400 ? 400 : image.height
      canvas.setDimensions({width, height})
      isUploading.value = false
    }

    onMounted(async () => {
      canvas = new fabric.Canvas('c')
      return await uploadImage()
    })

    watch(file, uploadImage)

    return {
      isUploading
    }
  }
}
</script>

<style lang="scss" scoped>

canvas {
  border: 2px solid #555;
}
</style>
