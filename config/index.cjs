/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ncp = require("ncp").ncp;

ncp.limit = 16;

const mode = process.argv[2];

const tizenConfig = "config/tizen";
const webosConfig = "config/webos";

const tizenBuild = "build/tizen";
const webosBuild = "build/webos/uhd";

if (mode === "tizen") {
  ncp(tizenConfig, tizenBuild, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log("Tizen configuration copied!");
  });
} else if (mode === "webos") {
  ncp(webosConfig, webosBuild, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log("WebOS configuration copied!");
  });
} else {
  console.error("Unknown mode:", mode);
}
