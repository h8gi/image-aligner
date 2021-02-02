<template>
<div class="container">
  <FileUploader @change="onFileChange" :isUploading="isUploading" class="pb-5">
    画像をアップロード
  </FileUploader>

  <img alt="" :src="imageElement.src"/>
  <button v-if="imageElement.src"
	  class="button"
	  :class="{ 'is-loading': isCalculating }"
	  @click="calc"
	  >
    計算
  </button>
  <canvas ref="canvasElement" width="400" height="400"></canvas>
</div>
</template>
<script lang="ts">
import { ref, defineComponent, computed, onMounted } from 'vue'
import FileUploader from '../components/FileUploader.vue'
import utils from '../utils'

import { Image } from 'image-js'
import Chart  from 'chart.js'

export default defineComponent({
    components: {
	FileUploader
    },
    setup() {
	const file = ref(new File([], ''))
	const imageElement = ref(document.createElement('img'))
	const canvasElement = ref<HTMLCanvasElement>()
	const isUploading = ref(false)
	const isCalculating = ref(false)
	const onFileChange = async (event: any) => {
	    isUploading.value = true
	    if (event.target.files[0]) {
		file.value = event.target.files[0]
		try {
		    imageElement.value = await utils.readFileAsImage(event.target.files[0])
		} catch (e) {
		    console.log(e)
		}
	    }
	    isUploading.value = false
	}

	const image = computed(async () => {
	    let value = await Image.load(imageElement.value.src)
	    return value
	})

	let chart = new Chart("dummy", {})
	let data = {
	    labels: Array.from(new Array(256).keys()),
	    datasets: []
	}
	onMounted(async() => {
	    if (canvasElement.value) {
		chart = new Chart(canvasElement.value, {
		    type: 'bar',
		    data
		})
	    }	    
	})
	
	const calc = async () => {
	    isCalculating.value = true
	    console.log(isCalculating.value)
	    const newData = (await image.value).getHistograms({})
	    data.datasets = [
		{
		    label: 'Red',
		    data: newData[0],
		    backgroundColor: 'red'
		},
		{
		    label: 'Green',
		    data: newData[1],
		    backgroundColor: 'green'
		},
		{
		    label: 'Blue',
		    data: newData[2],
		    backgroundColor: 'blue'
		}
	    ]
	    chart.update()
	    isCalculating.value = false
	    console.log(isCalculating.value)
	}

	return {
	    file,
	    imageElement,
	    canvasElement,
	    onFileChange,
	    isUploading,
	    isCalculating,
	    image,
	    calc
	}
    }
})

</script>
