const canvas = document.querySelector('canvas') ;
canvas.width = 400 ;
canvas.height = 400 ;
let ctx = canvas.getContext('2d') ;
let scale = 10 ;
let colums = canvas.width / scale ; 
let rows = canvas.height / scale ;
let score = document.querySelector('.score');
// resizing the canvas


class Snake {
    constructor() {
        this.x = 0 ;
        this.y = 0 ;
        this.xS = scale ;
        this.yS = 0 ;
        this.total = 0;
        this.tail = [] ;
    }
    draw() {
        ctx.fillStyle = "#fff";
        for(let i = 0 ; i < this.tail.length; i++) {
        ctx.fillRect(this.tail[i].x,this.tail[i].y,scale, scale);
        }
        ctx.fillRect(this.x,this.y,scale, scale);
    }
    update(){
        for(let i = 0 ; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1] ;
        }
        this.tail[this.total - 1] = {x:this.x,y:this.y} ;
        if(this.x > canvas.width){
            this.x = 0 ;
        }
        if(this.x < 0){
            this.x = canvas.width ;
        }
        if(this.y > canvas.height){
            this.y = 0 ;
        }
        if(this.y < 0){
            this.y = canvas.height ;
        }
        this.x += this.xS ;
        this.y += this.yS ;
        score.textContent = snake.total ;
    }
    collision(){
        for(let i = 0 ; i < this.tail.length;i++){
            if(this.x === this.tail[i].x && this.y === this.tail[i].y){
                return true ;
            }
        }
        return false ;
    }
    direction(keyCode){
        switch(keyCode){
            case 37: 
            this.xS = -scale ;
            this.yS = 0 ;
            break ;
            case 38: 
            this.xS = 0 ;
            this.yS = -scale ;
            break ;
            case 39: 
            this.xS = scale ;
            this.yS = 0 ;
            break ;
            case 40: 
            this.xS = 0 ;
            this.yS = scale ;
            break ;
        }
    }
    eat(fruit){
      if(this.x === fruit.x && this.y === fruit.y){
          this.total ++;
          return true ;
      }
      return false ;
    }
}

class Fruit {
    constructor() {
        this.x;
        this.y;
    }
    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x,this.y,scale, scale);
    }
    update(){
        this.x = Math.floor(Math.random() * colums) * scale ;
        this.y = Math.floor(Math.random() * rows) * scale ;
    }
}

// create the snake  and fruit
let snake = new Snake() ;
let fruit = new Fruit() ;
fruit.update();
window.setInterval(()=> {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(snake.eat(fruit)) {
        fruit.update();
    }
    if(snake.collision()){
        snake.tail = [];
        snake.total = 0 ;
    }
    fruit.draw();
    snake.update();
    snake.draw();
},200)


window.addEventListener('keydown', (event) => {
    snake.direction(event.keyCode);
});

