<template>
  <div>
    <h1>Image Aligner</h1>    
    <input name="" type="file" value=""
           accept="image/png, image/jpeg"
           @change="onFileChange"
           />

    
    <ImageEditor v-if="file" :file="file"></ImageEditor>


  </div>
</template>

<script lang="ts">
import ImageEditor from './ImageEditor.vue'
import { ref, defineComponent } from 'vue'

export default defineComponent({
    components: {
        ImageEditor
    },
    setup() {
        const file = ref(new File(["hello"], "", {type: "image/png"}))
        const onFileChange = (event: any) => {
	    if (event.target.files[0])
		file.value = event.target.files[0]
        }

        return {
            file,
            onFileChange
        }	
    }

})
</script>
