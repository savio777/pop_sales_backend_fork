import { defineConfig } from "vitest/config";
import tsconfigsPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigsPaths()],
  test: {
    testTimeout: 10000,
    cache: false, // Desativa o cache
    sequence: {
      shuffle: false, // Mantém a ordem dos testes
      concurrent: false, // Executa os testes um por vez
    },
  },
});
