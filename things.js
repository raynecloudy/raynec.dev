const filter = new URLSearchParams(location.search).get("filter");

if (filter) document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("tr td:nth-child(3)").forEach(element => {
    if (element.innerText !== filter) element.parentElement.remove();
  });
});
