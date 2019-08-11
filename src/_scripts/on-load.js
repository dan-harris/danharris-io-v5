import { lazyLoadFuraCodeFont } from "./utils/lazy-load-fura-code-font";
import { lazyLoadStyle } from "./utils/lazy-load-styles";
import { setFocusTab } from "./utils/set-focus-tab";

// async function contentLoaded() {
//   const backgroundImageFadeInModule = await import("background-image-fade-in");
//   backgroundImageFadeInModule.default(
//     ".lazy-load-bg-img",
//     600,
//     "background-size: auto; background-position: center center;",
//     "position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;"
//   );
// }

/**
 * global bootstrap
 */
async function init() {
  // do sync inits
  setFocusTab();
  // do lazy inits
  await lazyInit();
}

/**
 * global bootstrap for all async inits
 */
async function lazyInit() {
  await lazyLoadStyle(
    "https://fonts.googleapis.com/css?family=Fira+Mono:500,700&display=swap"
  );
  await lazyLoadFuraCodeFont();
}

document.addEventListener("DOMContentLoaded", init);
