import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: './', // 輸出檔案的路徑
  plugins: [vue()],
});
