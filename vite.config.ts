import {defineConfig} from "vitest/config"
import tsconfigsPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsconfigsPaths()],
  test: {
    testTimeout: 10000,
  }
})