countLifes = 3;
const availableScreenHeight = window.screen.availHeight;
startButton = document.querySelector("#start button")
gamePage = document.querySelector("#app");
cloud = document.querySelector(".cloud");
body = document.querySelector("#app");

pig = document.querySelector("#app div.pig");
startButton.onclick = function(){
  startGame()
}

function startGame(){
  gamePage.style.display = "block"
  startButton.style.display = "none"
  
  createLifes();
  createPig();
  const timerID = setInterval(function () {
  createCloud();
}, 3000);
}

document.onkeydown = function (event) {
  console.dir(event);
  if (event.keyCode == 65) {
    moveLeft();
  }
  if (event.keyCode == 68) {
    moveRight();
  }

  if (event.keyCode == 32) {
    jump();
  }
  if (event.keyCode == 65 && event.keyCode == 32) {
    console.log("2");
  }
  if (event.keyCode == 68 && event.keyCode == 32) {
    console.log("2");
  }
};

function jump() {
  pig.style.top = pig.offsetTop - 250 + "px";
  let timerID = setTimeout(function () {
    pig.style.top = pig.offsetTop + 250 + "px";
    clearTimeout(timerID);
  }, 350);
}

function moveLeft() {
  pig.style.left = pig.offsetLeft - 30 + "px";
}

function moveRight() {
  pig.style.left = pig.offsetLeft + 30 + "px";
}

//Таймер який запуска хмаринки кожні 3 секунди


//Створення свині і початкової хмаринки
function createPig() {
  let pig = document.createElement("div");
  let cloud2 = document.createElement("div");
  pig.className = "pig";
  cloud2.className = "cloud";
  pig.style.left = 170 + "px";
  pig.style.top = 300 + "px";
  cloud2.style.left = 100 + "px";
  cloud2.style.top = 305 + "px";
  gamePage.appendChild(cloud2);
  gamePage.appendChild(pig);
}

//створення хмаринки
function createCloud() {
  let cloud = document.createElement("div");
  cloud.className = "cloud";
  cloud.style.left = random(200, gamePage.clientWidth - 500) + "px";
  cloud.style.top = "-150px";
  gamePage.appendChild(cloud);
  moveCloud(cloud);
}

//Рух хмаринки
function moveCloud(cloud) {
  let timerID = setInterval(function () {
    cloud.style.top = cloud.offsetTop + 10 + "px";
    if (cloud.offsetTop > document.querySelector("body").clientHeight ) {
      cloud.remove();
      clearInterval(timerID);
      console.log(availableScreenHeight);
    }
  }, 200);
}

//Втрата життя
function die() {
  countLifes = countLifes - 1;
  if (countLifes <= 0) {
    endGame();
  }
}

//Кількість життя
function createLifes() {
  let lifesBlock = document.querySelector("#lifes");
  lifesBlock.innerHTML = "";
  let count = 0;
  while (count < countLifes) {
    let span = document.createElement("span");
    lifesBlock.appendChild(span);
    count = count + 1;
  }
}

//Випадкове число
function random(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

//Перезагрузка сторінки
function restart() {
  location.reload();
}