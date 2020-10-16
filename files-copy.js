const copyFiles = require("copyfiles");
const path = require("path");

const directories = ["assets", "config", "layout", "locales", "sections", "snippets", "templates"];

directories.forEach((dir) => {
  if (dir === "templates") {
    copyFiles([`src${path.sep}${dir}${path.sep}**`, `dist${path.sep}${dir}`], { up: true, exclude: `src${path.sep}${dir}${path.sep}customers${path.sep}*` }, () => console.log(`copied ${dir}`));
    copyFiles([`src${path.sep}${dir}${path.sep}customers${path.sep}*`, `dist${path.sep}${dir}${path.sep}customers`], { up: true }, () => console.log(`copied ${dir}${path.sep}customers`));
  } else {
    copyFiles([`src${path.sep}${dir}${path.sep}**`, `dist${path.sep}${dir}`], { up: true }, () => {
      console.log(`copied ${dir}`);
    });
  }
});
