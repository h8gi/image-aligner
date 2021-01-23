<template>
  <div>
    <h4>{{ file.name }}</h4>
    <canvas id="c"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

import { fabric } from 'fabric'

export default {
  props: {
    file: {
      type: File,
      required: true
    }
  },
  setup({ file }) {
    let canvas = null
    let image = null

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

    onMounted(async () => {
      canvas = new fabric.Canvas('c')
      image = await readFileAsImage(file)
      image = new fabric.Image(image)
      canvas.add(image)
      canvas.setDimensions({width: image.width, height: image.height})
    })

    return {
    }
  }
}
</script>
