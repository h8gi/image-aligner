<template>
<div>
  <div class="field is-grouped">
    <div class="control">
      <button class="button is-primary">a</button>
    </div>
    <div class="control">
      <button class="button is-primary">b</button>
    </div>
    <div class="control">
      <button class="button is-primary">c</button>
    </div>
  </div>

  <canvas ref="canvasElement" width="800" height="600"></canvas>

</div>
</template>

<script lang="ts">

import { fabric } from 'fabric'
import { ref, onMounted, toRefs, watch, defineComponent } from 'vue'
import utils from '../utils'

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
	    // canvas.add(image)
	    canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas))
        }

        onMounted(() => {
            canvas = new fabric.Canvas(canvasElement.value)
	    canvas.on('mouse:wheel', onMouseWheel(canvas))
	    canvas.on('mouse:down', onMouseDbclick(canvas))
	    onChange()
        })

        watch(imageElement, onChange)
        return {
	    canvasElement,
	    imageElement
        }
    }
})


const onMouseWheel = (canvas: fabric.Canvas) => {
    return (opt: any) => {
	let delta = opt.e.deltaY
	let zoom = canvas.getZoom()
	zoom *= 0.99 ** delta
	if (zoom > 20) zoom = 20
	if (zoom < 0.01) zoom = 0.01

	canvas.zoomToPoint(new fabric.Point(opt.e.offsetX, opt.e.offsetY), zoom)

	opt.e.preventDefault()
	opt.e.stopPropagation()
    }
}

const onMouseDbclick = (canvas: fabric.Canvas) => {
    return (opt: any) => {
	var im = fabric.util.invertTransform(canvas.viewportTransform)
	var p = new fabric.Point(opt.e.offsetX, opt.e.offsetY)
	p = fabric.util.transformPoint(p, im)
	let circle = new fabric.Circle({
	    radius: 5 / canvas.getZoom(), fill: 'red',
	    top: p.y,
	    left: p.x
	})


	console.log('client: ', opt.e.clientX, opt.e.clientY)
	console.log('offset: ', opt.e.offsetX, opt.e.offsetY)

	canvas.add(circle)
	canvas.bringToFront(circle)
    }
}


</script>

<style lang="scss" scoped>
canvas {
  border: 2px solid #555;
}
</style>
