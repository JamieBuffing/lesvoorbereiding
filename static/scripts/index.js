let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer); // reset de timer elke keer dat resize gebeurt

  resizeTimer = setTimeout(() => {
    // Dit wordt pas uitgevoerd als er 300ms geen resize meer is
    if (window.innerWidth <= 1080) {
      console.log("Klaar met resizen - klein scherm");
    } else {
      console.log("Klaar met resizen - groot scherm");
    }
  }, 300); // wacht 300 milliseconden
});