const filters = {
  truncateText: (str, n = 10) => {
    if (!str) return;
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }
};

export default filters;
