// Dynamic theme
import themeLight from "../styles/theme";
import themeDark from "../styles/new-theme";
var userTheme =
  (typeof window !== "undefined" && window.localStorage.getItem("theme-mode")) || null;
if (userTheme === null) {
  userTheme = "light";
}
const theme = userTheme === "light" ? themeLight : themeDark;

export function isWideScreen() {
  if (typeof window !== `undefined`) {
    const windowWidth = window.innerWidth;
    const mediaQueryL = theme.mediaQueryTresholds.L;

    return windowWidth >= mediaQueryL;
  }
}

export function timeoutThrottlerHandler(timeouts, name, delay, handler) {
  if (!timeouts[name]) {
    timeouts[name] = setTimeout(() => {
      timeouts[name] = null;
      handler();
    }, delay);
  }
}
