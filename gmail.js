// ==UserScript==
// @name Gmail fixes (collapse menu, hide dots)
// @include https://mail.google.com/mail*
// @noframes
// @run-at document-idle
// ==/UserScript==

;(function () {
  "use strict"
  let menuButton
  waitForElements('div[aria-label="Main menu"]').then((elm) => {
    menuButton = elm[0]
  })

  document.addEventListener("keydown", function (e) {
    //CTRL + SHIFT + something
    if (e.ctrlKey && e.shiftKey) {
      switch (e.code) {
        case "KeyM":
          menuButton.click()
          break
        case "KeyF":
          focusMode()
          break
      }
    }
  })

  function focusMode() {
    document.querySelector('[data-tooltip="Chat"]').remove()
    document.querySelector('[data-tooltip="Spaces"]').remove()
    document.querySelector('[data-tooltip="Meet"]').remove()
    // Remove all my different filters
    document.querySelector(".zw").remove()
  }

  // Remove those annoying red dots when menu is collapsed
  // Add slight delay cuz of something that is regenerating them
  waitForElements(".bsU").then((elements) => {
    setTimeout(() => {
      document.querySelectorAll(".bsU").forEach((element) => {
        element.style.backgroundColor = "transparent"
      })
    }, 1200)
  })
})()

// Taken from https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForElements(selector) {
  return new Promise((resolve) => {
    if (document.querySelectorAll(selector).length > 0) {
      return resolve(document.querySelectorAll(selector))
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelectorAll(selector).length > 0) {
        resolve(document.querySelectorAll(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}
