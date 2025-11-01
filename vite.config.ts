import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-extension-files",
      closeBundle() {
        // Copy manifest.json to dist
        fs.copyFileSync("manifest.json", "dist/manifest.json");

        // Copy icons folder to dist
        const iconsDir = "icons";
        const distIconsDir = "dist/icons";
        if (fs.existsSync(iconsDir)) {
          if (!fs.existsSync(distIconsDir)) {
            fs.mkdirSync(distIconsDir, { recursive: true });
          }
          const files = fs.readdirSync(iconsDir);
          files.forEach((file) => {
            fs.copyFileSync(
              path.join(iconsDir, file),
              path.join(distIconsDir, file)
            );
          });
        }
      },
    },
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: "src/popup.html",
        content: "src/content.ts",
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
  // Use relative paths to fix CORS issues in Chrome extension
  base: "./",
});
