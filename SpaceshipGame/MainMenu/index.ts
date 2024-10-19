var btn = document.getElementById("btn");
const loadingScreen = document.getElementById("loading-screen");
// const activeLoading = document.getElementsByClassName("loading-screen");
const content = document.getElementById("content");

btn?.addEventListener("click", () => {
  content?.classList.add("hidden");
  if (loadingScreen) {
    loadingScreen.style.display = "flex";
  }
  setTimeout(function () {
    window.location.href = "http://localhost:8080/SpaceshipGame/Level1/index.html";
  }, 100);
});
