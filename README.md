
This guide is particularly focused on leveraging Vite’s configuration options to build for specific platforms like Tizen and WebOS and covers setting up navigation and routing within the app.

## Project Setup
Let’s start by setting up a new React project with Vite and tailoring the configuration to fit Smart TV specifications.

### Step 1: Create the Vite Project
**1. Initialize a Vite Project:**
Create a new Vite project with React support.
```
npm create vite@latest my-smart-tv-app - template react
cd my-smart-tv-app
```

**2. Install Dependencies:**
Install necessary packages
```
npm install react-router-dom @noriginmedia/norigin-spatial-navigation tailwindcss
```

### Step 2: Configuring Vite for Smart TV Platforms

This configuration step is essential for adapting the Vite build to meet the unique requirements of Smart TVs. Vite will be set up to output separate builds for Tizen and WebOS platforms, alongside a production build. We’ll also auto-configure platform-specific files, such as config.xml for Tizen and appinfo.json for WebOS.

To simplify the build process, we define several custom scripts in `package.json`
```JSON
"scripts": {    
    "copy:tizen": "node config/index.cjs tizen && node --experimental-modules config/tizen-script.cjs",
    "copy:webos": "node config/index.cjs webos && node --experimental-modules config/webos-script.cjs && node config/fhd-script.cjs",
    "platform:tizen": "export WEBPACK_MODE=tizen tsc && vite build && npm run copy:tizen",
    "platform:webos": "export WEBPACK_MODE=webos tsc && vite build && npm run copy:webos",
    "platform:build": "tsc && vite build",
    "build": "npm-run-all --sequential platform:*",
    ...
}
...
```
 - **Copy Scripts (copy:tizen and copy:webos):** These scripts copy the configuration files for each platform to their respective directories.
 - **Platform Build Scripts (platform:tizen and platform:webos):** These scripts set the appropriate WEBPACK_MODE and execute the build for the specified platform.
 - **Build Command:** Runs the platform build scripts in sequence to produce builds for both Tizen and WebOS.

> **Note:** if you use Windows then please use `set` intend of `export` becuase `export` will not working in windows

In your `vite.config.ts`, replace the content with the following configuration:
```js
import react from "@vitejs/plugin-react";
import browserslist from "browserslist";
import { resolveToEsbuildTarget } from "esbuild-plugin-browserslist";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const WEBPACK_MODE = process.env.WEBPACK_MODE?.trim() || "";
  // File config for specific platform
  const tizen = "tizen";
  const webos = "webos";

  const tizenBuild = "build/tizen";
  const webosBuild = "build/webos/uhd"; // WebOS have two app on UHD & FSD

  // Determine the output directory based on the mode
  const isTizen = WEBPACK_MODE === tizen;
  const isWebOS = WEBPACK_MODE === webos;
  const outDir = isTizen ? tizenBuild : isWebOS ? webosBuild : "build/production";
  const env = loadEnv(WEBPACK_MODE, process.cwd(), "");

  function getBuildTarget(browsers) {
    return resolveToEsbuildTarget(browserslist(browsers), {
      printUnknownTargets: false,
    });
  }

  const baseConfig: any = {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env": env || {},
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
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
        "import.meta.url": JSON.stringify(""),
      },
    };
  }
  return baseConfig;
});
```

### Platform Configuration Files

> To streamline the configuration process, create the following configuration files to handle platform-specific tweaks. All configuration file ander config folder:

In the main `App.js` wrap the app in a SpatialNavigation provider:
```js
import Layout from "@/components/layout";
import { NavigationProvider } from "@/context";
import Home from "@/pages/home";
import Movies from "@/pages/movies";
import Series from "@/pages/series";
import Sports from "@/pages/sports";
import { init } from "@noriginmedia/norigin-spatial-navigation";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

init({
  debug: false,
  visualDebug: false,
  distanceCalculationMethod: "center",
});
const Providers = () => {
  return (
    <NavigationProvider>
      <Layout />
    </NavigationProvider>
  )
}
const route = [{
  path: "/",
  Component: Providers,
  children: [
    {
      index: true,
      Component: Home,
    },
    {
      path: "movies",
      Component: Movies,
    },
    {
      path: "series",
      Component: Series,
    },
    {
      path: "sports",
      Component: Sports,
    },
  ],
}];
const router = createMemoryRouter(route);

export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<Fallback />} />
  );
}
export function Fallback() {
  return <>Loading</>;
}
```

**Define Focusable Components:**
Use the Focusable component to make elements navigable. Here’s an example:

`home.tsx`
```js
import ContentRow from "@/components/ContentRow";
import SelectedRow from "@/components/SelectedRow";
import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useCallback, useEffect, useState } from "react";

const Home = () => {
    const { ref, focusKey, focusSelf } = useFocusable({ focusKey: "CONTENT" });
    const [selectedAsset, setSelectedAsset] = useState(null);
    
    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    const onAssetPress = useCallback((asset) => {
        setSelectedAsset(asset);
    }, []);

    const onRowFocus = useCallback(
        ({ y }: { y: number }) => {
            ref.current.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        },
        [ref]
    );

    return (
        <FocusContext.Provider value={focusKey}>
            <div className="flex flex-col h-full w-full">
                <SelectedRow selectedAsset={selectedAsset} />
                <div className="overflow-y-auto flex-1" ref={ref}>
                    <div className="space-y-5">
                        {rows.map(({ title }) => (
                            <ContentRow
                                key={title}
                                title={title}
                                onAssetPress={onAssetPress}
                                onFocus={onRowFocus}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </FocusContext.Provider>
    );
};

export default Home;
```

`ContentRow.tsx` component
```js
import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useCallback, useRef } from "react";
import Asset from "./Asset";
const ContentRow = ({ title, onAssetPress, onFocus }) => {
    const { ref, focusKey } = useFocusable({
        onFocus
    });
    const scrollingRef = useRef(null);
    const onAssetFocus = useCallback(
        ({ x }: { x: number }) => {
            scrollingRef.current.scrollTo({
                left: x,
                behavior: 'smooth'
            });
        },
        [scrollingRef]
    );

    return (
        <FocusContext.Provider value={focusKey}>
            <div
                ref={ref}
            >
                <div className="text-2xl font-medium text-white pb-4 ">{title}</div>
                <div className="overflow-x-auto overflow-y-hidden" ref={scrollingRef}>
                    <div className="flex gap-2">
                        {assets.map(({ title, color }) => (
                            <Asset
                                key={title}
                                title={title}
                                color={color}
                                onEnterPress={onAssetPress}
                                onFocus={onAssetFocus}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </FocusContext.Provider>
    )
}
export default ContentRow
```
This setup provides a solid foundation for navigation in your Smart TV app. Focus states and navigation paths are handled automatically by the spatial navigation library, enhancing the user experience on TV devices.

**Start the Development Server:**
```bash
npm run dev
```
**Build for Production:**
To create platform-specific builds, set the WEBPACK_MODE environment variable and build:
```bash
npm run build
```