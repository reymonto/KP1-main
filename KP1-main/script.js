var startPage = document.querySelector("#start");
var titleText = document.querySelector("#start h2");
var firstPlayer = document.querySelector(".selected");
var secondPlayer = document.querySelector(".select");
var start = document.querySelector("#btn-start");
var scoreText = document.querySelector("#score span");
var gamePage = document.querySelector("#game");
gamerSkin = "skin_1";
//-----1урок-----
countLifes = 1;
//-----2урок-----
var audioPlayer = document.querySelector("audio");
soundButton = document.querySelector("#sound img");
sound = "off"; //аудіоплаєр
soundButton.onclick = function () {
  if (sound == "on") {
    soundButton.src = "images/mute_sound.png";
    sound = "off";
    audioPlayer.pause();
  } else {
    soundButton.src = "images/sound_on.png";
    sound = "on";
    audioPlayer.play();
  }
};

start.onclick = function () {
  //кнопка старт
  startGame();
};

//рух гравця

gamer = document.querySelector("#player");
document.onkeydown = function (event) {
  if (event.keyCode == 87) {
    moveUp();
  }
  if (event.keyCode == 83) {
    moveDown();
  }

  if (event.keyCode == 32) {
    createBullet();
  }
};

function startGame() {
  gamePage.style.display = "block";
  startPage.style.display = "none";
  gamer.className = gamerSkin;
  createLifes();
  numberOfEnemies();
}
//рух гравця до верху

function moveUp() {
  if (gamer.offsetTop > 50) {
    gamer.style.top = gamer.offsetTop - 50 + "px";
  } else {
    gamer.style.top = 50 + "px";
  }
}
//рух гравця до низу
function moveDown() {
  if (
    gamer.offsetTop <
    document.querySelector("#app").clientHeight - gamer.clientHeight
  ) {
    gamer.style.top = gamer.offsetTop + 50 + "px";
  } else {
    gamer.style.top =
      document.querySelector("#app").clientHeight + gamer.style.top + "px";
  }
}

//постріл
function createBullet() {
  let bullet = document.createElement("div");
  bullet.className = "bullet";
  bullet.style.top = gamer.offsetTop + 140 + "px";
  gamePage.appendChild(bullet);
  moveBullet(bullet);
}
//політ пулі
function moveBullet(bullet) {
  let timerID = setInterval(function () {
    bullet.style.left = bullet.offsetLeft + 20 + "px";

    if (bullet.offsetLeft > document.querySelector("body").clientWidth) {
      bullet.remove();
      clearInterval(timerID);
    }
    isBoom(bullet);
  }, 10);
}

//кількість ворогів
function numberOfEnemies() {
  for (var index = 0; index < 5; index++) {
    if (document.querySelectorAll("#game div.enemy").length < 5) {
      createEnemy();
    }
  }
}

//cтворення  ворога

function createEnemy() {
  let enemy = document.createElement("div");
  enemy.className = "enemy" + " " + typeEnemy();
  enemy.style.top =
    random(100, document.querySelector("#app").clientHeight - 140) + "px";
  gamePage.appendChild(enemy);
  //enemies.push(enemy);
  //console.log(enemies);
  moveEnemy(enemy);
}

function typeEnemy() {
  if (random(1, 2) == 1) {
    return "type-1";
  } else {
    return "type-2";
  }
}

//рух  ворога1
function moveEnemy(enemy) {
  let timerID = setInterval(function () {
    enemy.style.left = enemy.offsetLeft - 10 + "px";
    if (enemy.offsetLeft < -100) {
      enemy.remove();
      numberOfEnemies();
      clearInterval(timerID);
      die();
    }
  }, 200);
}

//рахунок
score = 0;
function calculation() {
  score = score + 1;
  scoreText.innerText = score;
}

//момент вибуху
function isBoom(bullet) {
  let enemies = document.querySelectorAll(".enemy");
  for (let i = 0; i < enemies.length; i++) {
    if (
      bullet.offsetTop > enemies[i].offsetTop &&
      bullet.offsetTop < enemies[i].offsetTop + enemies[i].clientHeight &&
      bullet.offsetLeft > enemies[i].offsetLeft
    ) {
      createBoom(bullet.offsetTop, bullet.offsetLeft);
      bullet.remove();
      enemies[i].remove();
      numberOfEnemies();
      calculation();
    }
  }
}
//вибух
function createBoom(top, left) {
  let boom = document.createElement("div");
  boom.className = "boom";
  boom.style.top = top - 100 + "px";
  boom.style.left = left - 100 + "px";

  gamePage.appendChild(boom);
  setTimeout(function () {
    boom.remove();
  }, 1000);
}
// втрата життя
function die() {
  countLifes = countLifes - 1;
  if (countLifes <= 0) {
    endGame();
  }
}

//кількість життя
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

function endGame() {
  let scoreBlok = document.querySelector("#end h3 span");
  scoreBlok.innerText = scoreText.innerText;

  gamePage.style.display = "none";
  let endBlock = document.querySelector("#end");
  endBlock.style.display = "block";
  let restartBtn = document.querySelector("#end button");
  restartBtn.onclick = restart;
}

function random(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
function restart() {
  location.reload();
}

selectSkin1 = document.querySelector("#skin_1");
selectSkin1.onclick = function () {
  selectSkin1.className = "selected";
  selectSkin2.className = "";
  gamerSkin = "skin_1";
};

selectSkin2 = document.querySelector("#skin_2");
selectSkin2.onclick = function () {
  selectSkin2.className = "selected";
  selectSkin1.className = "";
  gamerSkin = "skin_2";
};
