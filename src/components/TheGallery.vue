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

<script>
import ImageEditor from './ImageEditor.vue'
import { ref } from 'vue'

export default {
  components: {
    ImageEditor
  },
  setup() {
    const fileList = ref([])
    const onFileChange = (event) => {
      fileList.value = [...event.target.files]
    }

    return {
      fileList,
      onFileChange
    }
  }
}
</script>
