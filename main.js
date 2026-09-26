/* =========================

   ELEMENTS

========================== */

const siteNav = document.querySelector(".site-nav");

const menuToggle = document.querySelector(".menu-toggle");

const recentDropdown = document.querySelector(".nav-dropdown");

const recentTrigger = document.querySelector(".recent-trigger");

const folders = document.querySelectorAll(".desktop-folder");

const popupClose = document.querySelector(".mini-window-bar button");

const welcomeWindow = document.querySelector(".welcome-window");

const heroWindow = document.querySelector(".hero-window");

const photoWindow = document.querySelector(".photo-window");

/* =========================

   RESPONSIVE NAV BREAKPOINT

========================== */

/*

  Navigation behavior is based on the

  actual responsive layout breakpoint.

  951px and above:

  Desktop hover navigation.

  950px and below:

  Tablet/mobile tap navigation.

  This avoids relying on hover/pointer

  capability detection, which can report

  incorrectly on tablets and hybrid devices.

*/

const navMediaQuery = window.matchMedia(

  "(max-width: 950px)"

);

function isMobileNav() {

  return navMediaQuery.matches;

}

/* =========================

   RECENT WORK

========================== */

function closeRecentDropdown() {

  if (!recentDropdown || !recentTrigger) {

    return;

  }

  recentDropdown.classList.remove("open");

  recentTrigger.setAttribute(

    "aria-expanded",

    "false"

  );

}

function toggleRecentDropdown() {

  if (!recentDropdown || !recentTrigger) {

    return;

  }

  const willOpen =

    !recentDropdown.classList.contains("open");

  recentDropdown.classList.toggle(

    "open",

    willOpen

  );

  recentTrigger.setAttribute(

    "aria-expanded",

    String(willOpen)

  );

}

/* =========================

   MOBILE / TABLET NAV

========================== */

function closeMobileNav() {

  if (!siteNav || !menuToggle) {

    return;

  }

  siteNav.classList.remove("open");

  menuToggle.setAttribute(

    "aria-expanded",

    "false"

  );

  menuToggle.setAttribute(

    "aria-label",

    "Open navigation"

  );

  closeRecentDropdown();

}

function openMobileNav() {

  if (!siteNav || !menuToggle) {

    return;

  }

  siteNav.classList.add("open");

  menuToggle.setAttribute(

    "aria-expanded",

    "true"

  );

  menuToggle.setAttribute(

    "aria-label",

    "Close navigation"

  );

}

function toggleMobileNav() {

  if (

    !siteNav ||

    !menuToggle ||

    !isMobileNav()

  ) {

    return;

  }

  const isOpen =

    siteNav.classList.contains("open");

  if (isOpen) {

    closeMobileNav();

  } else {

    openMobileNav();

  }

}

/* =========================

   MENU BUTTON

========================== */

if (menuToggle) {

  menuToggle.addEventListener(

    "click",

    (event) => {

      /*

        DESKTOP > 950px:

        CSS hover handles the navigation.

        Clicking does not pin the menu.

        TABLET / MOBILE <= 950px:

        Tap toggles .site-nav.open.

      */

      if (!isMobileNav()) {

        return;

      }

      event.preventDefault();

      event.stopPropagation();

      toggleMobileNav();

    }

  );

}

/* =========================

   RECENT WORK BUTTON

========================== */

if (recentTrigger) {

  recentTrigger.addEventListener(

    "click",

    (event) => {

      /*

        Desktop:

        CSS hover handles the dropdown.

        Tablet/mobile:

        Tap toggles the dropdown.

      */

      if (!isMobileNav()) {

        event.preventDefault();

        return;

      }

      event.preventDefault();

      event.stopPropagation();

      toggleRecentDropdown();

    }

  );

}

/* =========================

   MOBILE NAV LINKS

========================== */

/*

  Normal links should close the menu

  after they're tapped.

  Recent Work is excluded because its

  button needs to expand its submenu.

*/

if (siteNav) {

  const navLinks =

    siteNav.querySelectorAll(

      ".nav-panel a"

    );

  navLinks.forEach((link) => {

    link.addEventListener(

      "click",

      () => {

        if (!isMobileNav()) {

          return;

        }

        closeMobileNav();

      }

    );

  });

}

/* =========================

   CLICK OUTSIDE NAV

========================== */

document.addEventListener(

  "click",

  (event) => {

    if (

      !isMobileNav() ||

      !siteNav

    ) {

      return;

    }

    if (

      !siteNav.contains(event.target)

    ) {

      closeMobileNav();

    }

  }

);

/* =========================

   ESCAPE KEY

========================== */

document.addEventListener(

  "keydown",

  (event) => {

    if (event.key !== "Escape") {

      return;

    }

    closeMobileNav();

    folders.forEach((folder) => {

      folder.classList.remove(

        "folder-open"

      );

    });

  }

);

/* =========================

   WELCOME POPUP

========================== */

if (popupClose && welcomeWindow) {

  popupClose.addEventListener(

    "click",

    (event) => {

      event.preventDefault();

      event.stopPropagation();

      welcomeWindow.classList.add(

        "popup-closing"

      );

      setTimeout(() => {

        welcomeWindow.hidden = true;

      }, 180);

    }

  );

}

/* =========================

   MOBILE / TABLET FOLDERS

========================== */

folders.forEach((folder) => {

  folder.addEventListener(

    "click",

    (event) => {

      if (!isMobileNav()) {

        return;

      }

      const isOpen =

        folder.classList.contains(

          "folder-open"

        );

      /*

        First tap:

        Open the folder animation.

        Second tap:

        Allow the link to navigate.

      */

      if (!isOpen) {

        event.preventDefault();

        event.stopPropagation();

        folders.forEach(

          (otherFolder) => {

            if (

              otherFolder !== folder

            ) {

              otherFolder.classList.remove(

                "folder-open"

              );

            }

          }

        );

        folder.classList.add(

          "folder-open"

        );

      }

    }

  );

});

/* =========================

   CLICK OUTSIDE FOLDERS

========================== */

document.addEventListener(

  "click",

  (event) => {

    const clickedFolder =

      event.target.closest(

        ".desktop-folder"

      );

    if (clickedFolder) {

      return;

    }

    folders.forEach((folder) => {

      folder.classList.remove(

        "folder-open"

      );

    });

  }

);

/* =========================

   BREAKPOINT RESET

========================== */

/*

  If the browser crosses the 950px

  breakpoint, clear any mobile-only

  classes.

  This prevents a menu opened on mobile

  from remaining stuck open after the

  viewport becomes desktop-sized.

*/

function resetNavState() {

  if (!siteNav || !menuToggle) {

    return;

  }

  siteNav.classList.remove("open");

  closeRecentDropdown();

  menuToggle.setAttribute(

    "aria-expanded",

    "false"

  );

  menuToggle.setAttribute(

    "aria-label",

    "Open navigation"

  );

}

navMediaQuery.addEventListener("change", resetNavState);

/* =========================

   PHOTO MOVEMENT

========================== */

if (heroWindow && photoWindow) {

  heroWindow.addEventListener(

    "mousemove",

    (event) => {

      /*

        Disable mouse movement effects

        in the tablet/mobile layout.

      */

      if (isMobileNav()) {

        return;

      }

      const bounds =

        heroWindow.getBoundingClientRect();

      const mouseX =

        event.clientX - bounds.left;

      const mouseY =

        event.clientY - bounds.top;

      const percentX =

        mouseX / bounds.width - 0.5;

      const percentY =

        mouseY / bounds.height - 0.5;

      photoWindow.style.setProperty(

        "--mouse-x",

        `${percentX * 5}px`

      );

      photoWindow.style.setProperty(

        "--mouse-y",

        `${percentY * 5}px`

      );

    }

  );

  heroWindow.addEventListener(

    "mouseleave",

    () => {

      photoWindow.style.setProperty(

        "--mouse-x",

        "0px"

      );

      photoWindow.style.setProperty(

        "--mouse-y",

        "0px"

      );

    }

  );

}
