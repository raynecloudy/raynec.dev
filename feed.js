fetch("/feed.rss").then((res) => {
  res.text().then((html) => {
    let doc = new DOMParser().parseFromString(html, "text/html");
    doc.querySelectorAll("item").forEach((element) => {
      document.querySelector("#posts").innerHTML =
`${document.querySelector("#posts").innerHTML}
<a href="${element.querySelector("HTMLParserLink").innerText}" class="panel feed_post">
  <h1>${element.querySelector("title").innerText}</h1>
  <p>${element.querySelector("pubDate").innerText}</p>
  <p>${element.querySelector("description").innerText}</p>
</a>`;
    });
  });
}).catch(() => console.error("failed to get feed!!"));