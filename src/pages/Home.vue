<template>
<div class="container">
  <FileUploader @change="onFileChange" :isUploading="isUploading" class="pb-5">
    画像をアップロード
  </FileUploader>
  <ImageEditor v-if="image" :imageElement="image"></ImageEditor>

  <FileUploader @change="onFileChange2" :isUploading="isUploading2" class="pb-5">
    画像をアップロード
  </FileUploader>
  <ImageEditor v-if="image2" :imageElement="image2"></ImageEditor>
</div>
</template>

<script lang="ts">
import ImageEditor from '/@/components/ImageEditor.vue'
import FileUploader from '/@/components/FileUploader.vue'
import { ref, defineComponent, Ref } from 'vue'
import utils from '../utils'

const UseFileChange = (file: Ref<File>, image: Ref<HTMLImageElement>, isUploading: Ref<Boolean>) => {
    return async (event: any) => {
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
}

export default defineComponent({
    components: {
        ImageEditor,
	FileUploader
    },
    setup() {
        const file = ref(new File([], ''))
	const image = ref(document.createElement('img'))
	const isUploading = ref(false)
        const onFileChange = UseFileChange(file, image, isUploading)

	const file2 = ref(new File([], ''))
	const image2 = ref(document.createElement('img'))
	const isUploading2 = ref(false)
        const onFileChange2 = UseFileChange(file2, image2, isUploading2)



        return {
            file,
	    image,
            onFileChange,
	    isUploading,
	    file2,
	    image2,
	    isUploading2,
	    onFileChange2,
        }
    }

})
</script>
