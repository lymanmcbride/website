import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Project site is served from https://lymanmcbride.github.io/website/
  base: '/website/',
  plugins: [react()],
})
