import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const config: UserConfig = {
    plugins: [
	vue()
    ],
    alias: {
	'/@/': path.resolve(__dirname, './src')
    }
}
export default config
