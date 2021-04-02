const navBar = document.querySelector('#navBar');
const gameScreen = document.querySelector('#gameScreen');
const ball = document.querySelector('#ball');
const score = document.querySelector('#score');
const notice = document.querySelector('#notice > p');

const user = document.querySelector('#user');
const highScore = document.querySelector('#highScore');
user.innerHTML = localStorage.user;
highScore.innerHTML = '최고기록:' + localStorage.highScore;

const bottom = gameScreen.getBoundingClientRect().height;
const wall = gameScreen.getBoundingClientRect().width;
const ballWidth = ball.getBoundingClientRect().width + 5;

const ballPos = { x: 0, y: 0 };
const ballV = { x: 0, y: 0 };

ballPos.x = ball.getBoundingClientRect().x;
ballPos.y = ball.getBoundingClientRect().y;

const g = 29.8;
const dt = 0.1;
const t = 0.0;

let isStart = false;
let userScore = 0;

var gameOver = function(timeId) {
    clearInterval(timeId);

    if (userScore > Number(localStorage.highScore) || !localStorage.highScore) {
        userName = prompt('이 기기의 최고 기록입니다. 사용자 이름을 입력해주세요.')
        localStorage.setItem('user', userName);
        localStorage.setItem('highScore', userScore);

        user.innerHTML = localStorage.user;
        highScore.innerHTML = '최고기록:' + localStorage.highScore;
    }

    ballPos.x = wall / 2;
    ballPos.y = bottom / 5;
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
    let mousePosX = e.pageX - 50; // -50은 공의 반지름
    ballV.y = -140;
    ballV.x = (ballPos.x - mousePosX) / 7;
    userScore += 1;
    score.innerHTML = userScore;
});

gameScreen.addEventListener('click', function() {
    if (!isStart) {
        score.innerHTML = userScore;
        let timeId = setInterval(() => {
            gravity(timeId);
        }, 1000/60);
        
        isStart = true;
        navBar.style.opacity = 0;
        notice.style.opacity = 0;
        notice.innerHTML = 'Game Over<br>다시 도전하시겠습니까?';
    }
})
