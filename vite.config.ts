import react from "@vitejs/plugin-react";
import browserslist from "browserslist";
import { resolveToEsbuildTarget } from "esbuild-plugin-browserslist";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig, loadEnv, UserConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const WEBPACK_MODE = process.env.WEBPACK_MODE?.trim() || "";
  // Some file config
  const tizen = "tizen";
  const webos = "webos";

  const tizenBuild = "platform/tizen";
  const webosBuild = "platform/webos/uhd";

  // Determine the output directory based on the mode
  const isTizen = WEBPACK_MODE === tizen;
  const isWebOS = WEBPACK_MODE === webos;
  const outDir = isTizen
    ? tizenBuild
    : isWebOS
    ? webosBuild
    : "build";
  const env = loadEnv(WEBPACK_MODE, process.cwd(), "");

  function getBuildTarget(browsers) {
    return resolveToEsbuildTarget(browserslist(browsers), {
      printUnknownTargets: false,
    });
  }

  const baseConfig: UserConfig = {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env": env || {},
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      fs: {
        strict: false,
      },
    },
    base: "./",
    build: {
      minify: "terser",
      target: getBuildTarget([
        ">0.1% and supports es6-module and not ios < 12 and not opera > 0",
        "node >= 18.13.0",
      ]),
      outDir,
      rollupOptions: {
        input: {
          app: path.resolve(__dirname, "index.html"),
        },
        output: {
          manualChunks: undefined,
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,
        },
        format: {
          comments: false,
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/__tests__/setup.ts",
      css: true,
    },
  };

  if (isTizen || isWebOS) {
    baseConfig.esbuild = {
      minifyIdentifiers: false,
      legalComments: "none",
      target: "es6",
      include: /\.(ts|jsx|tsx)$/,
      define: {
        "import.meta.url": JSON.stringify("./"),
      },
    };
  }

  return baseConfig;
});
