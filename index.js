// let cmd = document.getElementById("cmd");

let oneko_num = new URLSearchParams(window.location.search).get("onekos");
let onekos = [];

if (oneko_num !== null) {
  for (let i = 0; i < oneko_num; i++) {
    let oneko = new Oneko();
    oneko.x = Math.random() * window.innerWidth;
    oneko.y = Math.random() * window.innerHeight;
    oneko.updateSpeed = 70;
    oneko.setTarget(oneko.x, oneko.y);
    onekos.push(oneko);
  }
}

document.addEventListener("mousemove", (e) => {
  onekos.forEach((oneko) => {
    oneko.setTarget(e.clientX, e.clientY);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === " ") {
    e.preventDefault();
    onekos.forEach((oneko) => {
      oneko.setTarget(oneko.x, oneko.y);
    });
  }
});

// document.addEventListener("keydown", function(e) {
//   if (e.ctrlKey && e.key === "/") {
//     e.preventDefault();
//     cmd.value = "";
//     cmd.style.display = "block";
//     cmd.focus();
//   }
// });

// cmd.addEventListener("keydown", function(e) {
//   if (e.key === "Escape" || e.key === "Enter") {
//     e.preventDefault();
//     cmd.blur();
//   }
// });

// cmd.addEventListener("blur", function() {
//   cmd.style.display = "none";
// });

document.getElementById("draw").width = window.innerWidth;
document.getElementById("draw").height = window.innerHeight;

window.addEventListener("resize", function(e) {
  document.getElementById("draw").width = window.innerWidth;
  document.getElementById("draw").height = window.innerHeight;
});

let mousexpos = [];
let mouseypos = [];
let canvas = document.getElementById("draw");
let draw = canvas.getContext("2d");

document.addEventListener("mousemove", function(e) {
  mousexpos.push(e.clientX);
  mouseypos.push(e.clientY);
  if (mousexpos.length > 30) {
    mousexpos.shift();
    mouseypos.shift();
  }
  
  draw.clearRect(0, 0, canvas.width, canvas.height);
  draw.strokeStyle = "#ffffff";
  for (let i = 0; i < mousexpos.length-1; i++) {
    draw.beginPath();
    draw.moveTo(mousexpos[i], mouseypos[i]);
    draw.lineTo(mousexpos[i+1], mouseypos[i+1]);
    draw.stroke();
    draw.closePath();
  }
});

// function outputsize() {
//   document.getElementById("EWZ_frame").width = document.getElementById("home").offsetWidth-20;
//   document.getElementById("EWZ_frame").height = (document.getElementById("home").offsetWidth-20)/2;
// }
// outputsize();

// new ResizeObserver(outputsize).observe(document.body);

if (window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === false) {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  let left = document.getElementById("s0gw-left");
  let right = document.getElementById("s0gw-right");
  
  while (true) {
    left.innerText = "<-";
    right.innerText = "---->";
    await sleep(200);
    left.innerText = "<--";
    right.innerText = "--->";
    await sleep(200);
    left.innerText = "<---";
    right.innerText = "-->";
    await sleep(200);
    left.innerText = "<----";
    right.innerText = "->";
    await sleep(200);
    left.innerText = "<---";
    right.innerText = "-->";
    await sleep(200);
    left.innerText = "<--";
    right.innerText = "--->";
    await sleep(200);
  }
};
