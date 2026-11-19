
import {
  bindings,
  defineConfig,
  defineWorker,
} from "cf/config";

import {
  createWorkersResponseStoreSelfContainedConfig,
} from "@vinext/cloudflare/cache/config";

const cache = await createWorkersResponseStoreSelfContainedConfig({
  worker: "airi-website",
  bucket: "airi-website-response-store-cache-bodies",
});

export default defineConfig({
  worker: defineWorker({
    ...cache,

    name: "airi-website",

    entrypoint: "vinext/server/fetch-handler",

    compatibilityDate: "2026-11-19",

    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: [
        "/*",
        "!/_next/static/*",
        "!/*/_next/static/*",
      ],
    },

    env: {
      ...cache.env,

      ASSETS: bindings.assets(),

      IMAGES: bindings.images(),

      // AIRI CMS API
      CMS_API_URL: bindings.text(
        "https://flex-core-cms.base44.app/api/v1/projects/airi-s-profiel"
      ),
    },
  }),
});
