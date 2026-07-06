import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    host: true, // Tells Vite to listen on all local IP addresses (0.0.0.0)
    allowedHosts: true // Bypasses Host header checking entirely
  }
});