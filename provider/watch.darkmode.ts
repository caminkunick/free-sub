export const watchDarkmode = (
  matchMedia: ((query: string) => MediaQueryList) &
    ((query: string) => MediaQueryList),
  callback: (darkmode: boolean) => void
) => {
  const elem = matchMedia("(prefers-color-scheme: dark)") ?? false;
  callback(elem.matches);
  elem.addEventListener("change", () => {
    callback(elem.matches);
  });
  return () => elem.removeEventListener("change", () => {});
};
