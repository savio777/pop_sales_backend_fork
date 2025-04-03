import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true, // Permite usar describe/it/expect sem importar
    environment: "node", // Ambiente de teste (node para backend)
    testTimeout: 30000, // Aumentei o timeout para testes de integração
    cache: false, // Desativa completamente o cache
    clearMocks: true, // Limpa mocks entre os testes
    restoreMocks: true, // Restaura implementações originais
    
    // Configuração de sequência
    sequence: {
      shuffle: false, // Mantém a ordem definida nos arquivos
      concurrent: false, // Execução sequencial
      hooks: "stack", // Organização dos hooks (beforeEach, etc)
    },
    
    // Configuração de cobertura (opcional)
    // coverage: {
    //   enabled: true,
    //   provider: "v8", // ou 'istanbul'
    //   reportsDirectory: "./coverage",
    //   exclude: ["**/node_modules/**", "**/tests/**"],
    // },
    

    
    // Setup global (opcional)
    // setupFiles: ["./tests/setup.ts"], // Arquivo de setup global
  },
});