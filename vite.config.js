import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path-browserify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      path: "path-browserify",
    },
  },
  build: {
    sourcemap: true, // This enables source maps in the build process
  },
});
