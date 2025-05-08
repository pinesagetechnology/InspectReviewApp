import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // UserManager API
      "/api/user": {
        target:
          "https://ps-usermanagement-api-gufbchhve3gjawbe.centralus-01.azurewebsites.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/user/, ""),
      },

      // InspectFlow API
      "/api/inspect": {
        target:
          "https://ps-inspectionflow-api-fqete9bpf9b8fkc6.centralus-01.azurewebsites.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/inspect/, ""),
      },

      // AssetManager API
      "/api/asset": {
        target:
          "http://ps-asset-api-cthchzfzb6dwecey.centralus-01.azurewebsites.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/asset/, ""),
      },
    },
  },
});
