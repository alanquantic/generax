import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.generax.mx",
  integrations: [
    sitemap({
      serialize(item) {
        if (item.url === "https://www.generax.mx/") {
          item.priority = 1.0;
          item.changefreq = "weekly";
        } else if (
          item.url.includes("/generadores/") &&
          item.url !== "https://www.generax.mx/generadores/"
        ) {
          item.priority = 0.8;
          item.changefreq = "monthly";
        } else if (
          item.url.includes("/contacto/") ||
          item.url.includes("/tienda/")
        ) {
          item.priority = 0.9;
          item.changefreq = "weekly";
        } else {
          item.priority = 0.7;
          item.changefreq = "monthly";
        }
        return item;
      },
    }),
  ],
  build: {
    format: "directory",
  },
});
