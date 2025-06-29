declare module 'vite-tsconfig-paths' {
  import { Plugin } from 'vite';
  const tsconfigPaths: () => Plugin;
  export default tsconfigPaths;
}
