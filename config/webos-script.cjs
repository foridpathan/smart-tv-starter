/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");

const webosBuildDir = path.resolve("platform/webos/uhd");
const htmlFilePath = path.resolve(webosBuildDir, "index.html");

if (fs.existsSync(htmlFilePath)) {
  const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");

  // Replace type="module" and crossorigin with defer="defer"
  const updatedHtmlContent = htmlContent.replace(
    /type="module" crossorigin/,
    'defer="defer"'
  );

  // Replace the first occurrence of <script with your injected script tag
  const finalHtmlContent = updatedHtmlContent.replace(
    "</title>",
    '</title>\n<script src="./assets/webOSTV.js"></script>'
  );

  fs.writeFileSync(htmlFilePath, finalHtmlContent, "utf-8");

  console.log("WebOS script injected successfully.");
} else {
  console.error("WebOS index.html not found.");
}
