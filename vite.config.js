import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import { defineConfig } from 'vite';
const manualChunksList = ['@better-scroll', '@material-ui', 'video-react', 'react-dom', 'mobx'];
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src'),
    }
  },
  build:{
    rollupOptions:{
      output:{
        manualChunks(id) {
          // const res = manualChunksList.some(item => id.includes(item));
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
         
        }
      }
    }
  }
})
