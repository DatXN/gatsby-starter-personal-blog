import { JssProvider } from "react-jss";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import React from "react";

require("dotenv").config();

import getPageContext from "./src/getPageContext";
import createStore from "./src/state/store";

// Dynamic theme
import themeLight from "./src/styles/theme";
import themeDark from "./src/styles/new-theme";

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) => {
  const pageContext = getPageContext();
  const store = createStore();

  replaceBodyHTMLString(
    renderToString(
      <Provider store={store}>
        <JssProvider
          registry={pageContext.sheetsRegistry}
          generateClassName={pageContext.generateClassName}
        >
          {React.cloneElement(bodyComponent, {
            pageContext
          })}
        </JssProvider>
      </Provider>
    )
  );

  setHeadComponents([
    <style
      type="text/css"
      id="server-side-jss"
      key="server-side-jss"
      dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
    />
  ]);
};

exports.onRenderBody = ({ setHeadComponents }) => {
  return setHeadComponents([]);
};

exports.onRenderBody = ({ setPostBodyComponents }) => {
  console.log("1");
  var userTheme =
    (typeof window !== "undefined" && window.localStorage.getItem("theme-mode")) || null;
  if (userTheme === null) {
    userTheme = "light";
  }
  const theme = userTheme === "light" ? themeLight : themeDark;

  return setPostBodyComponents([
    <script
      key={`webfontsloader-setup`}
      dangerouslySetInnerHTML={{
        __html: `
        WebFontConfig = {
          google: {
            families: ["${theme.base.fonts.styledFamily}:${theme.base.fonts.styledFonts}"]
          }
        };

        (function(d) {
            var wf = d.createElement('script'), s = d.scripts[0];
            wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
            wf.async = true;
            s.parentNode.insertBefore(wf, s);
        })(document);`
      }}
    />
  ]);
};
