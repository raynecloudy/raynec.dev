function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

while (true) {
  fetch("https://lastfm-last-played.biancarosa.com.br/raynecloudy/latest-song").then(res => res.json().then(json => {
    if (json["track"]["@attr"] && json["track"]["@attr"]["nowplaying"] === "true") document.getElementById("lastfm_status").innerText = "currently jamming to";
    document.getElementById("lastfm_image").src = json["track"]["image"][2]["#text"];
    document.getElementById("lastfm_image").alt = json["track"]["album"]["#text"];
    document.getElementById("lastfm_title").innerText = json["track"]["name"];
    document.getElementById("lastfm_title").href = json["track"]["url"];
    document.getElementById("lastfm_artist").innerText = json["track"]["artist"]["#text"];
    document.getElementById("lastfm_artist").href = `https://www.last.fm/music/${json["track"]["artist"]["#text"]}`;
    document.getElementById("lastfm_album").innerText = json["track"]["album"]["#text"];
    document.getElementById("lastfm_album").href = `https://www.last.fm/music/${json["track"]["artist"]["#text"]}/${json["track"]["album"]["#text"]}/`;
  }));
  await sleep(50000);
}
