<template>
  <div>
    <h1>Image Aligner</h1>
    <input name="" type="file" value=""
           accept="image/png, image/jpeg"
           @change="onFileChange"
           multiple />

    <div v-for="(file, index) in fileList" :key="index">
      <ImageEditor :file="file"></ImageEditor>
    </div>

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
        const fileList = ref([])
        const onFileChange = (event: any) => {
            fileList.value = [...event.target.files]
        }

        return {
            fileList,
            onFileChange
        }
    }
})
</script>
