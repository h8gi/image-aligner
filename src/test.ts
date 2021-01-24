import { ref, onMounted, defineComponent, toRefs } from 'vue'

export default defineComponent({
    props: {
	file: {
	    type: File,
	    required: true
	}
    },

    setup(props) {
	const { file } = toRefs(props)
	file.value.name
    }
})
