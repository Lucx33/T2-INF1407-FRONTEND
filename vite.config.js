import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    host: '0.0.0.0',    // Permite acesso via Docker
    port: 5173,          // Porta padrão do SvelteKit
    strictPort: true,    // Erro se porta estiver ocupada (bom para debug)
    watch: {
      usePolling: true,  // ESSENCIAL para hot reload funcionar no Docker!
      interval: 100      // Ajusta responsividade do reload
    }
  }
});
