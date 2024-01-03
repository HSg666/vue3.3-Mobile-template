import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer"; // css自动添加兼容性前缀
import WindiCss from "vite-plugin-windicss"; // css便捷样式库
import path from "path";

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ["Chrome > 40", "ff> 31", "ie 11"],
        }),
      ],
    },
  },
  plugins: [vue(), WindiCss()],
  //新增
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), //把 src 的别名设置为 @
    },
  },
});
