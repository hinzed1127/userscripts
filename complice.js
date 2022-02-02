// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://complice.co/dan_hinze/today
// @icon         https://www.google.com/s2/favicons?domain=complice.co
// @grant        none
// ==/UserScript==

;(function () {
  "use strict"

  document.addEventListener("keydown", function (e) {
    //CTRL + SHIFT + something
    if (e.ctrlKey && e.shiftKey) {
      switch (e.code) {
        case "KeyE":
          // expand all options on EOD "Is this enough?"
          const buttonsArray = Array.from(document.querySelectorAll("button.btn.btn-default"))
          const ellipses = buttonsArray.filter((btn) => btn.innerText === "⋯")
          ellipses.forEach((elm) => elm.click())
          break
      }
    }
  })
})()
