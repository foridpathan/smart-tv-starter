/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const ncp = require("ncp").ncp;
const fs = require("fs-extra");

ncp.limit = 16;

const webosConfigFHD = "config/fhd";

const webosBuild = "platform/webos/uhd";
const webosBuildFHD = "platform/webos/fhd";
fs.emptyDir(webosBuildFHD, function (err) {
  if (err) {
    return console.error(err);
  }
  ncp(webosBuild, webosBuildFHD, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log("WebOS configuration copied!");
    ncp(webosConfigFHD, webosBuildFHD, function (err) {
      if (err) {
        return console.error(err);
      }
      console.log("WebOS configuration copied!");
    });
  });
});
