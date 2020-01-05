const LAST_PAGE_WAS_HOME_PAGE_SESSION_KEY = "lastPageWasHomePage";

/**
 *
 */
export async function setHomepageTransition() {
  const isHomePage = window.__GLOBALS__.isHomePage;
  console.log("💥", { isHomePage });
  const lastPageWasHomePage =
    sessionStorage.getItem(LAST_PAGE_WAS_HOME_PAGE_SESSION_KEY) === "true";
  if (isHomePage && !lastPageWasHomePage) {
    console.log("👉 to homepage");
    const page = document.querySelector(".page");
    page.classList.add("page--to-home");
  } else if (!isHomePage && lastPageWasHomePage) {
    console.log("👉 from homepage");
    const page = document.querySelector(".page");
    page.classList.add("page--from-home");
  } else {
    console.log("👉 no change");
  }

  // await wait(200);
  // page.classList.remove("page--to-home");
  // page.classList.remove("page--from-home");

  sessionStorage.setItem(LAST_PAGE_WAS_HOME_PAGE_SESSION_KEY, isHomePage);
}
