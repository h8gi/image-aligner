<template>
<div>
  <h4>{{ file.name }}</h4>
  <canvas ref="canvasElement" width="800" height="600"></canvas>
  <div v-if="isUploading">uploading image...</div>
</div>
</template>

<script lang="ts">
import { fabric } from 'fabric'
import { ref, onMounted, toRefs, watch, defineComponent } from 'vue'

const readFileAsImage = async (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = (e: any) => {
            let image = new Image()
	    image.src = e.target.result
	    image.onload = () => resolve(image)
	    image.onerror = reject
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

export default defineComponent({
    props: {
        file: {
            type: File,
	    required: true
        }
    },
    setup(props, { attrs }) {
        const { file } = toRefs(props)
	const canvasElement = ref(null)

        let canvas: fabric.Canvas
        let image: fabric.Image
        const isUploading = ref(false)

        const uploadImage = async () => {	    
            isUploading.value = true
	    try {
		canvas.clear()
		let originalImage = await readFileAsImage(file.value)		
		image = new fabric.Image(originalImage)	    
		canvas.add(image)
	    } catch (e) {
		console.log(e)
	    }
            isUploading.value = false
        }

        onMounted(async () => {	    
            canvas = new fabric.Canvas(canvasElement.value)
	    await uploadImage()
        })

        watch(file, uploadImage)

        return {
            isUploading,
	    canvasElement
        }
    }
})
</script>

<style lang="scss" scoped>
canvas {
  border: 2px solid #555;  
}
</style>
