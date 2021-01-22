<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  props: {
    image: {
      type: Image,
      required: true
    }
  },
  setup({ image }) {
    const canvas = ref(null)

    onMounted(() => {
      const ctx = canvas.value.getContext('2d')
      ctx.canvas.width = image.width
      ctx.canvas.height = image.height
      ctx.drawImage(image, 0, 0, image.width, image.height)
    })

    return {
      canvas
    }
  }
}
</script>
