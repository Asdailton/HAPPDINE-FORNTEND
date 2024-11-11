import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Plugin para suportar React
  server: {

    // Configuração do proxy para redirecionar as requisições para o Gateway

    proxy: {
      '/oauth2/authorization/azure': {
        target: 'http://localhost:8000', // URL de destino para redirecionamento
        changeOrigin: true, // Altera a origem da requisição para o URL de destino
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''), // Reescreve o caminho removendo '/gateway'
      },

      // Proxy para a rota de informações do usuário

      '/userinfo': {
        target: 'http://localhost:8000', 
        changeOrigin: true, 
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      },

      // Proxy para a rota de recursos protegidos

      '/resource': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      },

      // Proxy para a rota de callback

      '/callback': {
        target: 'http://localhost:8000/login/oauth2/code/azure',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/callback/, ''),
      },
      '/logout': {
        target: URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
    }
  }
}})
