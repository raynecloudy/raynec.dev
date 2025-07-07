let q = new URLSearchParams(window.location.search).get("q");

if (q) {
  location.href = q;
} else {
  location.href = "/";
}