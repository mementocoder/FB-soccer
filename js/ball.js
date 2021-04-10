const navBar = document.querySelector('#navBar');
const gameScreen = document.querySelector('#gameScreen');
const ball = document.querySelector('#ball');
const score = document.querySelector('#score');
const notice = document.querySelector('#notice > p');

const user = document.querySelector('#user');
const highScore = document.querySelector('#highScore');
user.innerHTML = localStorage.user;
highScore.innerHTML = '최고기록:' + localStorage.highScore;

const windowWidth = document.body.getBoundingClientRect().width
const bottom = gameScreen.getBoundingClientRect().height;
const wall = gameScreen.getBoundingClientRect().width;
const ballWidth = ball.getBoundingClientRect().width + 5;

const ballPos = { x: 0, y: 0 };
const ballV = { x: 0, y: 0 };

ballPos.x = ballPos.x = wall / 2;
ballPos.y = ballPos.y = bottom / 5;

const g = 9.8;
const dt = 0.1;
const t = 0.0;

let isStart = false;
let userScore = 0;

let timeId2;

var gameOver = function(timeId) {
    clearInterval(timeId);
    clearInterval(timeId2);

    light.innerHTML = '';

    if (userScore > Number(localStorage.highScore) || !localStorage.highScore) {
        userName = prompt('이 기기의 최고 기록입니다. 사용자 이름을 입력해주세요.')
        localStorage.setItem('user', userName);
        localStorage.setItem('highScore', userScore);

        user.innerHTML = localStorage.user;
        highScore.innerHTML = '최고기록:' + localStorage.highScore;
    }

    ballPos.x = wall / 2.5;
    ballPos.y = bottom / 2;
    ballV.x = 0;
    ballV.y = 0;
    
    userScore = 0;
    isStart = false;
    navBar.style.opacity = 1;
    notice.style.opacity = 1;
}

var gravity = function (timeId) {
    ballV.y = ballV.y + g*dt;
    ballPos.y = ballPos.y + ballV.y*dt;
    
    if (ballPos.y > bottom) {
        gameOver(timeId);
    }
    
    ball.style.top = ballPos.y + 'px';

    ballPos.x += ballV.x;
    ball.style.left = ballPos.x + 'px';
    
    if (ballPos.x > wall - ballWidth || ballPos.x < 0) {
        ballV.x = -ballV.x;
    }
}

ball.addEventListener('click', function(e) {
    let mousePosX = e.pageX - ((windowWidth - wall) / 2) - 50 
    //()안의 수식은 모바일이 아닐 경우 게임 화면의 위치를 구하는 공식 -50은 공의 반지름
    ballV.y = -70;
    ballV.x = (ballPos.x - mousePosX) / 10;
    userScore += 1;
    score.innerHTML = userScore;

    if (userScore == 10 || userScore == 40) {
        Light1()
    }
    if (userScore == 20 || userScore == 60) {
        Light2()
    }
    if (userScore == 30) {
        timeId2 = setInterval(() => {
            Fire();
        }, 3000); 
    }
    if (userScore == 50) {
        clearInterval(timeId2)
        timeId2 = setInterval(() => {
            Fire();
        }, 2000); 
    }
    if (userScore == 70) {
        clearInterval(timeId2)
        timeId2 = setInterval(() => {
            Fire();
        }, 1500); 
    }
});

gameScreen.addEventListener('click', function() {
    if (!isStart) {
        score.innerHTML = userScore;
        let timeId = setInterval(() => {
            gravity(timeId);
        }, 8);
        
        isStart = true;
        navBar.style.opacity = 0;
        notice.style.opacity = 0;
        notice.innerHTML = 'Game Over<br>다시 도전하시겠습니까?';
    }
})
