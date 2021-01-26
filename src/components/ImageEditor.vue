<template>
<div>
  <canvas ref="canvasElement" width="800" height="600"></canvas>
</div>
</template>

<script lang="ts">
import { fabric } from 'fabric'
import { ref, onMounted, toRefs, watch, defineComponent } from 'vue'
import utils from '../utils'

const onMouseWheel = (canvas: fabric.Canvas) => {
    return (opt: any) => {
	let delta = opt.e.deltaY
	let zoom = canvas.getZoom()
	zoom *= 0.99 ** delta
	if (zoom > 20) zoom = 20
	if (zoom < 0.01) zoom = 0.01
	canvas.setZoom(zoom)
	opt.e.preventDefault()
	opt.e.stopPropagation()
    }
}

export default defineComponent({
    props: {
	imageElement: {
	    type: HTMLImageElement,
	    required: true
	}
    },
    setup(props, { attrs }) {
        const { imageElement } = toRefs(props)
	const canvasElement = ref(null)
        let canvas: fabric.Canvas
        let image: fabric.Image

        const onChange = () => {
	    canvas.clear()
	    image = new fabric.Image(imageElement.value)
	    image.setControlsVisibility({
		bl: false,
		br: false,
		mb: false,
		ml: false,
		mr: false,
		mt: false,
		tl: false,
		tr: false,
		mtr: false
	    })
	    canvas.add(image)
        }

        onMounted(() => {
            canvas = new fabric.Canvas(canvasElement.value)
	    canvas.on('mouse:wheel', onMouseWheel(canvas))
	    onChange()
        })

        watch(imageElement, onChange)

        return {
	    canvasElement,
	    imageElement
        }
    }
})
</script>

<style lang="scss" scoped>
canvas {
  border: 2px solid #555;
}
</style>
