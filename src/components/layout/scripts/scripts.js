export function hamburgerMenu() {
  var x = document.getElementById("myTopnav");
  if (x.className === "nav-right") {
    x.className += " responsive";
  } else {
    x.className = "nav-right";
  }
}
