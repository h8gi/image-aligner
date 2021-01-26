<template>
<div class="file">
  <label class="file-label">
    <input class="file-input" type="file" name="resume"
	   accept="image/png, image/jpeg">
    <span class="file-cta">
      <span class="file-icon">
	<i v-if="isUploading" class="fas fa-spinner fa-pulse"></i>
        <i v-else :class="icon"></i>
      </span>
      <span class="file-label">
	<slot></slot>
      </span>
    </span>
  </label>
</div>
</template>

<script lang="ts">

import { toRefs, defineComponent } from 'vue'

export default defineComponent({
    props: {
	icon: {
	    type: String,
	    default: "fas fa-upload"
	},
	isUploading: {
	    type: Boolean,
	    default: false
	}
    },
    setup (props) {
	const { icon, isUploading } = toRefs(props)
	return {
	    icon,
	    isUploading
	}
    }
})

</script>
