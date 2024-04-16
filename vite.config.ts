import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import { resolve } from "path";

export default defineConfig({
  root: resolve(__dirname, "src"),
  server: {
    port: 3001,
  },
  publicDir: resolve(__dirname, "public"),
  base: "/ThreeJS-Blog/",
  build: {
    outDir: "../docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
      },
    },
  },
  plugins: [glsl()],

});
