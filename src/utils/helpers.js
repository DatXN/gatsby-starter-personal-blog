// Dynamic theme
import _themeLight from "../styles/theme";
import _themeDark from "../styles/new-theme";
export function getCurrentThemeModeName(themeLight, themeDark, props) {
  var userTheme = null;
  if (typeof props !== `undefined`) {
    userTheme = props.themeMode;
  } else {
    userTheme =
      (typeof window !== "undefined" && window.localStorage.getItem("theme-mode")) || null;
  }
  if (userTheme === null) {
    userTheme = "light";
  }
  return userTheme;
}
export function getCurrentThemeMode(themeLight, themeDark, props) {
  var userTheme = getCurrentThemeModeName(themeLight, themeDark, props);

  if (userTheme === "light") {
    if (typeof themeLight !== `undefined` && themeLight !== null) {
      return themeLight;
    } else {
      return _themeLight;
    }
  }
  if (userTheme === "dark") {
    if (typeof themeDark !== `undefined` && themeDark !== null) {
      return themeDark;
    } else {
      return _themeDark;
    }
  }
}

export function isWideScreen() {
  var theme = getCurrentThemeMode();
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
