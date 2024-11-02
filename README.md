# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```



Certainly! Below, I’ve provided descriptions and explanations to complement the code you’ve shared, organized into clear sections and bullet points.

Building a Smart TV Application with React, Vite, and Spatial Navigation

Smart TV applications are a growing area, enabling users to enjoy web applications on television screens. In this guide, we’ll walk through creating a Smart TV application with React and Vite for optimized builds. We’ll also use @noriginmedia/norigin-spatial-navigation to provide smooth directional navigation on TV remote controls.

Our focus will be on configuring builds specifically for Tizen and WebOS platforms, while highlighting the unique aspects of each environment.

Project Setup

Step 1: Create the Vite Project

	1.	Initialize a Vite Project:
	•	Run the command below to create a new Vite project with React support.

npm create vite@latest my-smart-tv-app --template react
cd my-smart-tv-app


	2.	Install Dependencies:
	•	Install necessary packages, including react-router-dom for routing, @noriginmedia/norigin-spatial-navigation for remote navigation, and tailwindcss for responsive design.

npm install react-router-dom @noriginmedia/norigin-spatial-navigation tailwindcss



Step 2: Configuring Vite for Smart TV Platforms

This configuration step is essential for adapting the Vite build to meet the unique requirements of Smart TVs. Vite will be set up to output separate builds for Tizen and WebOS platforms, alongside a production build. We’ll also auto-configure platform-specific files, such as config.xml for Tizen and appinfo.json for WebOS.

Folder Structure

Here’s an organized project structure for managing configuration files and build outputs for multiple platforms:

.
├── build
│   ├── tizen
│   ├── webos
│   │   ├── uhd
│   │   └── fhd
│   └── production
├── config
│   ├── index.cjs
│   ├── webos-script.cjs
│   ├── tizen-script.cjs
│   ├── fhs-script.cjs
│   ├── tizen
│   │   └── All Tizen default configurations, .project, config.xml etc
│   ├── webos
│   │   └── Default configurations, assets, icons, appinfo.json etc
│   └── fhd
│       └── appinfo.json
├── public
├── src
├── .env
├── package.json
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts

Explanation of Key Scripts in package.json

To simplify the build process, we define several custom scripts in package.json:

	•	Copy Scripts (copy:tizen and copy:webos):
	•	These scripts copy the configuration files for each platform to their respective directories.
	•	They run after the build is generated for the platform.
	•	Platform Build Scripts (platform:tizen and platform:webos):
	•	These scripts set the appropriate WEBPACK_MODE and execute the build for the specified platform.
	•	On Windows, use set instead of export for setting the environment variable, as export is Unix-based.
	•	Build Command:
	•	Runs the platform build scripts in sequence to produce builds for both Tizen and WebOS.

Vite Configuration (vite.config.ts)

This configuration handles platform-specific build optimizations for Smart TVs:

	1.	Output Directory:
	•	The outDir is set based on the WEBPACK_MODE environment variable, ensuring that each platform’s build is outputted to the correct folder.
	2.	TailwindCSS Integration:
	•	Integrated with Vite for responsive and customizable styling, particularly useful for TV interfaces.
	3.	Browser Compatibility:
	•	Uses browserslist for compatibility with Smart TV browsers, specifying ES6 modules and omitting older versions of iOS and Opera.
	4.	Build Optimizations:
	•	Removes console logs and minifies code for efficient performance on TV hardware.

Platform Configuration Files

To streamline the configuration process, create the following configuration files to handle platform-specific tweaks:

config/index.cjs

This script copies the configuration files (such as Tizen’s config.xml and WebOS’s appinfo.json) to the appropriate build directories based on the platform.

config/tizen-script.cjs and config/webos-script.cjs

Each script performs the following:

	1.	HTML Modification:
	•	Ensures that the built index.html file is compatible with the platform’s requirements.
	•	For instance, on Tizen, it replaces type="module" and crossorigin attributes with defer="defer", while on WebOS, it injects a webOSTV.js script.

Adding Navigation with @noriginmedia/norigin-spatial-navigation

For Smart TV applications, remote navigation should be intuitive. @noriginmedia/norigin-spatial-navigation simplifies directional navigation handling (up, down, left, right) to enhance usability.

Step 1: Set Up Routing and Navigation Provider

In App.js, we wrap the app with a Spatial Navigation Provider:

	•	Router Configuration:
	•	Uses react-router-dom to set up a memory router for defining routes.
	•	Routes for Home, Movies, Series, and Sports are defined.
	•	Spatial Navigation:
	•	The init() function sets up the navigation library with specific options, such as disabling debug mode.

Step 2: Define Focusable Components

Focusable components are essential for TV navigation, allowing users to move through items using their remote control.

	1.	Home Page Component (home.tsx):
	•	Contains multiple content rows that are vertically scrollable.
	•	Uses the useFocusable hook to register each row as a focusable element.
	2.	ContentRow Component (ContentRow.tsx):
	•	Horizontally scrollable row with assets, such as movies or shows.
	•	Each item triggers onAssetPress when selected, and uses onAssetFocus to manage scrolling when an item gains focus.
	3.	Asset Component (Asset.tsx):
	•	Represents an individual content item in a row.
	•	Uses the useFocusable hook to manage focus state and calls onEnterPress when selected.

Component Breakdown and Interaction

Each component plays a role in managing navigation and interaction on the TV screen:

	•	SelectedRow Component:
	•	Displays details of the currently selected asset. Updated whenever a new item is selected.
	•	ContentRow Component:
	•	Registers each content row as a focusable area.
	•	Handles horizontal scrolling within the row when focus moves between items.
	•	Asset Component:
	•	Sets focus on individual items (movies, series, etc.) and applies a border style when focused.

Testing Your Smart TV App

Testing the application on Smart TV emulators or directly on the device is crucial to ensure seamless navigation.

	1.	Development Server:
	•	Run the app locally using:

npm run dev

	•	Test navigation to ensure each focusable element is accessible with remote controls.

	2.	Production Build:
	•	Create platform-specific builds for Tizen and WebOS using:

WEBPACK_MODE=tizen npm run build
WEBPACK_MODE=webos npm run build



Conclusion

Developing Smart TV applications with React and Vite offers a streamlined approach to building, optimizing, and deploying for platforms like Tizen and WebOS. With @noriginmedia/norigin-spatial-navigation, managing navigation becomes straightforward, ensuring a user-friendly experience on TV screens. This setup equips you to create a fully functional Smart TV application, ready for deployment.

This completes the setup and explanations for your Smart TV application guide. Let me know if you’d like further clarification on any specific section!