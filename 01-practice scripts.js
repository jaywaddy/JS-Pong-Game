function Paddle () {
    let heightUp = 5;
    let heightDown= 5;

    this.height = 30;
    this.width = 10;
    this.color = 'white';
    this.speed = 1;
    this.heightShrink() = function() {
        return this.height -= heightDown;
    };
    this.heightGrow() = function() {
        return this.height += heightUp;
    };
    this.colorChange() = function() {
        if (this.height < 30) {
            this.color = 'red';
        } else if (this.height > 30) {
            this.color = 'green';
        }
    }
}

function Puck() {
    let multiplierUp = 1.2;
    let multiplierDown = 0.8;

    this.height = 10;
    this.width = 10;
    this.color = 'white';
    this.speed = 1;
    this.speedUp() = function () {
        return this.speed *= multiplierUp;
    };
    this.speedDown() = function() {
        return this.speedDown *= multiplierDown;
    };this.colorChange() = function() {
        if (this.speed < 1) {
            this.color = 'red';
        } else if (this.speed > 1) {
            this.color = 'green';
        }
    }

}

function PowerUp() {

}

(function test() {
    console.log('test');
}())

//DOM Manipulation

let playArea = document.createElement('div');

playArea.id = 'play-area';
document.body.appendChild('#play-area');
playArea.setAttribute('height', '500px');
playArea.setAttribute('width', '800px');
playArea.style.backgroundColor = '#f4f4f4';

//Convert to Object

function PlayArea() {
    let playArea = document.createElement('div');
    playArea.id = 'play-area';
    document.body.appendChild('div #play-area');

    this.width = playArea.setAttribute('width', '800px');
    this.height = playArea.setAttribute('height', '500px');
    this.background = playArea.style.backgroundColor = '#f4f4f4';
    this.click() = playArea.addEventListener('click', () => {
        console.log('The play area was clicked!');
    });
}


