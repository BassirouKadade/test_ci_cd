import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts', // Optionnel, pour config supplémentaire
    include: ['**/*.test.{ts,tsx}'], // Exemple : inclut seulement les .test.ts et .test.tsx
  },
});