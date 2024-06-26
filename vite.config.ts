import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import { resolve } from "path";

export default defineConfig({
  root: resolve(__dirname, "src"),
  server: {
    port: 3001,
  },
  publicDir: resolve(__dirname, "public"),
  base: "/Shader-Time-ThreeJS/",
  build: {
    outDir: "../docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        Week4: resolve(__dirname, "src/Week4/index.html"),
        Week5: resolve(__dirname, "src/Week5/index.html")
      },
    },
  },
  plugins: [glsl()],

});
