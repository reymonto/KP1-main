gamerSkin = "select-pig"; //вибір аватара для гри
skin = "pig"; //вибір поворота вліво право
countLifes = 1; //кількість життя
player = document.querySelector(".selected"); //гравець
gamePage = document.querySelector("#app"); //іграва сторінка
cloud = document.querySelector(".cloud"); //хмара
start = document.querySelector(".start"); //стартова сторінка
startButton = document.querySelector(".start button"); //стартова кнопка
let disatnce = 150
let uptimerId
let downtimerId
//старт гри

startButton.onclick = function () {
  startGame();
  jump()
};

//Таймер який запуска хмаринки кожні 4 секунди

function t() {
  let tID = setInterval(function () {
    if (pig.offsetTop < gamePage.clientHeight) {
      createCloud();
    }
    if (pig.offsetLeft == 0) {
      clearInterval(tID);
    }
  }, 4000);
}

//Старт ігри

function startGame() {
  t();
  gamePage.style.display = "block";
  start.style.display = "none";
  createLifes();
  createPig();
  pig = document.querySelector("#player");
  createCloud2();
  cloud2 = document.querySelector(".cloud");
  createCloud();
  
}

// Функція клавіатури

document.onkeydown = function (event) {
  //console.dir(event);
  if (event.keyCode == 65) {
    moveLeft();
    /* console.log(pig.offsetTop);
    console.log(cloud2.offsetTop + 50); */
  }
  if (event.keyCode == 68) {
    moveRight();
  }

  if (event.keyCode == 32) {
    jumpWhenOnCloud();
    /* console.log("jumped");
    jump(); */
  }
};

//стрибок свині тільки якщо вона на хмаринці
function jumpWhenOnCloud() {
  let cloud = document.querySelectorAll(".cloud");
  for (i = 0; i < cloud.length; i++) {
    if (
      pig.offsetTop > cloud[i].offsetTop &&
      pig.offsetTop + pig.clientHeight < cloud[i].offsetTop + cloud[i].clientHeight &&
      pig.offsetLeft > cloud[i].offsetLeft &&
      pig.offsetLeft + pig.clientWidth < cloud[i].offsetLeft + cloud[i].clientWidth
    ) {
      jump();     
    } 
  }
}

//Стрибок свині

function jump() {
  clearInterval(downtimerId)
  uptimerId = setInterval(function(){
      disatnce += -40
      pig.style.top = disatnce +"px"   
      if (disatnce < 30)  {
          fallPig()  
      }
  }, 30)
}

// рух вліво

function moveLeft() {
  let clouds = document.querySelectorAll(".cloud");
  pig.style.left = pig.offsetLeft - 30 + "px";
  pig.style.backgroundImage = "url(img/" + skin + "2.png)";
}

//рух вправо

function moveRight() {
  let clouds = document.querySelectorAll(".cloud");
  pig.style.left = pig.offsetLeft + 30 + "px";
  pig.style.backgroundImage = "url(img/" + skin + "1.png)";
}

//перевірка падіння свині чи рух

function fallPig() {
  clearInterval(uptimerId)
  let cloud = document.querySelector(".cloud");
  downtimerId = setInterval(function() {
      disatnce += 5;
      pig.style.top = disatnce + "px";   
      jumpWhenOnCloud() 
  }, 30)
}

//поява персонажа на ігровому полі

function createPig() {
  let pig = document.querySelector("#player");
  if (gamerSkin == "select-pig") {
    pig.className = "pig";
    pig.style.left = gamePage.clientWidth / 2 + "px";
    pig.style.top = gamePage.clientHeight / 2 + "px";
  }
  if (gamerSkin == "select-bee") {
    pig.className = "bee";
    pig.style.left = gamePage.clientWidth / 2 + "px";
    pig.style.top = gamePage.clientHeight / 2 + 100 + "px";
  }
}
//Створення  початкової хмаринки

function createCloud2() {
  let cloud2 = document.createElement("div");
  cloud2.className = "cloud";
  cloud2.style.left = gamePage.clientWidth / 2 - 70 + "px";
  cloud2.style.top = gamePage.clientHeight / 2 + "px";
  gamePage.appendChild(cloud2);
}

//створення хмаринки

function createCloud() {
  let cloud = document.createElement("div");
  cloud.className = "cloud";
  cloud.style.left = random(200, gamePage.clientWidth - 500) + "px";
  //cloud.style.left = gamePage.clientWidth / 2 - 70 + "px";
  cloud.style.top = "-80px";
  gamePage.appendChild(cloud);
  moveCloud(cloud);
}

//рух першої хмарринки

function moveCloud2(cloud2) {
  let timerID = setInterval(function () {
    cloud2.style.top = cloud2.offsetTop + 10 + "px";
    if (cloud2.offsetTop > gamePage.clientHeight) {
      cloud2.remove();
      clearInterval(timerID);
    }
  }, 200);
}

//Рух хмаринки
function moveCloud(cloud) {
  let timerCloud = setInterval(function () {
    cloud.style.top = cloud.offsetTop + 10 + "px";
    if (cloud.offsetTop > gamePage.clientHeight) {
      cloud.remove();
      clearInterval(timerCloud);
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
    if (gamerSkin == "select-pig") {
      span.className = "pig2";
    } //вибір картинки для життя
    if (gamerSkin == "select-bee") {
      span.className = "bee2";
    }
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

//вибір гравця свиня
selectSkin1 = document.querySelector("#select-pig");
selectSkin1.onclick = function () {
  selectSkin1.className = "selected";
  selectSkin2.className = "";
  gamerSkin = "select-pig";
  skin = "pig";
};

//вибір гравця бджола
selectSkin2 = document.querySelector("#select-bee");
selectSkin2.onclick = function () {
  selectSkin2.className = "selected";
  selectSkin1.className = "";
  gamerSkin = "select-bee";
  skin = "bee";
};
