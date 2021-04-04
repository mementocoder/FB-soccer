const light = document.querySelector('#lightContainer');
const fire = document.querySelector('#fireContainer');

function Light1() {
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('light1');
    light.appendChild(this.mainElem);
}
function Light2() {
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('light2');
    light.appendChild(this.mainElem);
}

function Fire() {
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('fire');
    fire.appendChild(this.mainElem);

    let red = Math.floor((Math.random() * 256) + 1);
    let green =  Math.floor((Math.random() * 256) + 1);
    let blue =  Math.floor((Math.random() * 256) + 1);
    let rotate = Math.floor((Math.random() * 40) - 20);
    let posleft = Math.floor((Math.random() * (wall/3)) + 200);

    this.mainElem.style.width = '1px';
    this.mainElem.style.height = '40px';
    this.mainElem.style.border = '1px rgba('+ red +','+ blue +','+ green +') solid';
    this.mainElem.style.background = 'rgba('+ red +','+ blue +','+ green +')';
    this.mainElem.style.left = posleft + 'px'

    let y = 0;
    let y2 = -(bottom - (bottom / 5));

    this.t = function() {
        y -= 3;
        if (y > y2) {
            this.mainElem.style.transform = 'rotate('+ rotate +'deg) translateY('+ y +'px)';
        }
        else {
            clearInterval(this.timeId)
            fire.removeChild(fire.lastChild)
        }
    }

    this.timeId = setInterval(() => {
       this.t() 
    }, 1);

}