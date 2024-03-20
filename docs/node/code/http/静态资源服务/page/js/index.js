const table = document.querySelector("table");
const tds = document.querySelectorAll("td");
table.addEventListener("click", function (e) {
  const target = e.target;
  if (target.tagName.toUpperCase() === "TD") {
    clearTableBackground();
    target.style.backgroundColor = "red";
  }
});
function clearTableBackground() {
  tds.forEach((td) => {
    td.style.backgroundColor = "";
  });
}
// 我的世界