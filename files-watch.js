const watch = require("node-watch");
const copyFiles = require("copyfiles");

const path = require("path");

const folders = ["assets", "config", "layout", "locales", "sections", "snippets", "templates"];

watch("src", { recursive: true }, function(evt, name) {
  console.log("=>Changed: ", name);
  let fPath = name.replace(`src${path.sep}`, "");
  let folder = fPath.substr(0, fPath.indexOf(path.sep));
  if (folders.indexOf(folder) >= 0) {
    if (fPath.indexOf(`templates${path.sep}customers`) >= 0) {
      copyFiles([name, path.join("dist", folder, "customers")], { up: true }, () => console.log(`copied ${folder}${path.sep}customers`));
    } else {
      copyFiles([name, path.join("dist", folder)], { up: true }, () => console.log(`copied ${name}`));
    }
  }
});
