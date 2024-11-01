/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const tizenBuildDir = path.resolve("build/tizen");
const htmlFilePath = path.resolve(tizenBuildDir, "index.html");

if (fs.existsSync(htmlFilePath)) {
  const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");

  // Replace type="module" and crossorigin with defer="defer"
  const updatedHtmlContent = htmlContent.replace(
    /type="module" crossorigin/,
    'defer="defer"'
  );

  // Replace the first occurrence of <script with your injected script tag
  const finalHtmlContent = updatedHtmlContent.replace("</title>", "</title>\n");

  fs.writeFileSync(htmlFilePath, finalHtmlContent, "utf-8");

  console.log("Tizen script injected successfully.");
} else {
  console.error("Tizen index.html not found.");
}
