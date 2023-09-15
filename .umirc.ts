import { defineConfig } from "umi";

export default defineConfig({
  scripts: [
    '/Cesium/Cesium.js'
  ],
  links: [
    { href: '/Cesium/Widgets/widgets.css', rel: 'stylesheet' }
  ],
  npmClient: 'pnpm',
});
