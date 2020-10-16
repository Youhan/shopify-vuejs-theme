export const upperFirst = (string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
};

export const camelCase = (text) => {
  text = text.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  return text.substr(0, 1).toLowerCase() + text.substr(1);
};

/**
 * Display a banner in the console.
 */
export const consoleBanner = () => {
  // prettier-ignore
  const recVersion = process.env.PACKAGE_VERSION;
  console.log("version: " + recVersion + "\n\n");
};
