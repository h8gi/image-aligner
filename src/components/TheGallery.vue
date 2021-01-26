<template>
<div class="container">

  <FileUploader @change="onFileChange" :isUploading="isUploading">
    画像をアップロード
  </FileUploader>
  <ImageEditor v-if="image" :imageElement="image"></ImageEditor>

</div>
</template>

<script lang="ts">
import ImageEditor from './ImageEditor.vue'
import FileUploader from './FileUploader.vue'
import { ref, defineComponent } from 'vue'
import utils from '../utils'

export default defineComponent({
    components: {
        ImageEditor,
	FileUploader
    },
    setup() {
        const file = ref(new File([], ""))
	const image = ref<HTMLImageElement>()
	const isUploading = ref(false)
        const onFileChange = async (event: any) => {
	    isUploading.value = true
	    if (event.target.files[0]) {
		file.value = event.target.files[0]
		try {
		    image.value = await utils.readFileAsImage(event.target.files[0])
		} catch (e) {
		    console.log(e)
		}
	    }
	    isUploading.value = false
        }

        return {
            file,
	    image,
            onFileChange,
	    isUploading
        }
    }

})
</script>
