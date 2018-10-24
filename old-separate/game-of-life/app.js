var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 80;
canvas.height = window.innerHeight - 80;

var paused = false;
var placingMode = false;

var theme;
var timeout;
var size;

getTheme();
getSpeed();
getSize();

var tilemap = new Tilemap(canvas, ctx);
var timestamp = Date.now();
var generation = 0;

document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('#toggleUi').onclick = function(){
      if(this.innerText == '<<<'){
        this.innerText = '>>>';
        document.querySelector('#ui').classList.add('hide');
      }else{
        this.innerText = '<<<';
        document.querySelector('#ui').classList.remove('hide');
      }
    }
},false);

document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('#pause').onclick = function(){
      paused = !paused;
      this.classList.toggle('active');
    }
},false);

document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('#random').onclick = function(){
      tilemap = new Tilemap(canvas, ctx);
      timestamp = Date.now();
      generation = 0;
    }
},false);

document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('#clear').onclick = function(){
      tilemap.clear();
      generation = 0;
      paused = true;
      document.querySelector('#pause').classList.add('active');
    }
},false);

document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('#place').onclick = function(){
      placingMode = !placingMode;
      this.classList.toggle('active');
    }
},false);

canvas.addEventListener("mousedown", function(event){
  if(placingMode){
    var rect = canvas.getBoundingClientRect();
    var xClicked = event.clientX - rect.left;
    var yClicked = event.clientY - rect.top;    
    var clickedId = Math.floor(xClicked/tilemap.tsize) + Math.floor(yClicked/tilemap.tsize) * tilemap.cols;
    tilemap.tiles[clickedId].isAlive = !tilemap.tiles[clickedId].isAlive;
    tilemap.tiles[clickedId].markedAs = tilemap.tiles[clickedId].isAlive;
    tilemap.tiles[clickedId].gens = 0;
  }
}, false);

document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('#theme').onchange = getTheme;
},false);

document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('#speed').onchange = getSpeed;
},false);

document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('#size').onchange = getSize;
},false);

function getTheme(){
  theme = document.getElementById("theme").value;  
}

function getSpeed(){  
  var speed = document.getElementById("speed").value;
  if(speed == 'fast'){
    timeout = 100;
  }else if(speed == 'medium'){
    timeout = 300;
  }else if(speed == 'slow'){
    timeout = 700;
  }
}

function getSize(){
  size = document.getElementById("size").value;
  tilemap = new Tilemap(canvas, ctx);
  timestamp = Date.now();
  generation = 0;
}

loop();

function loop(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0, canvas.width, canvas.height);
  if(Date.now() - timestamp > timeout &&!paused){
    generation++;
    tilemap.update();
    timestamp = Date.now();
  }
  ctx.save();
  tilemap.render();
  ctx.restore();
  document.querySelector('.generation').innerText = generation;
  requestAnimationFrame(loop);
}

function Tile(index, cols, rows){
   this.isAlive = Math.random() < 0.1;
   this.markedAs = this.isAlive;
   this.gens = 0;
   this.neighbors =  [index - 1, index + 1, index - cols, index + cols, index - cols - 1, index + cols - 1, index - cols + 1, index + cols + 1].map(function(x){
     if(x >= 0 && x < cols * rows){
       return x;
     }else if (x < 0){
       return cols * rows + x;
     }else if(x >= cols * rows){
       return x -  cols * rows;
     }
});
}

function Tilemap(canvas, context) {    
    this.tsize = size; //tile size
    this.cols = Math.floor(canvas.width / this.tsize);
    this.rows = Math.floor(canvas.height / this.tsize);

    this.tiles = [];
    for(var i = 0; i < this.cols * this.rows; i++){
        this.tiles.push(new Tile(i, this.cols, this.rows));
    }

    this.getTile = function(col, row) {
        return this.tiles[row * this.cols + col];
    };

    this.render = function(){
        for (var c = 0; c < this.cols; c++) {
            for (var r = 0; r < this.rows; r++) {
                var tile = this.getTile(c, r);              
                if (tile.isAlive) {
                  if(theme == 'matrix'){
                    context.fillStyle = '#33cc33';                  
                    context.textAlign = "center";
                    context.textBaseline = "middle";
                    context.font = this.tsize + "px monospace";
                    var text = tile.gens == 0 ? '0' : '1';
                    context.fillText(text, c * this.tsize + this.tsize/2, r * this.tsize + this.tsize/2, this.tsize);
                  }else if(theme == 'squares'){
                    if(tile.gens == 0){
                      context.fillStyle = '#33cc33';
                    }else if(tile.gens == 1){
                      context.fillStyle = '#1f7a1f';
                    }else{
                      context.fillStyle = '#0f3d0f';
                    }                       
                      context.fillRect(c * this.tsize, r * this.tsize, this.tsize, this.tsize);
                    }else if(theme == 'circles'){
                      var radius = this.tsize/2;
                      context.fillStyle = '#4d88ff';
                      context.beginPath();
                      context.arc(c * this.tsize + this.tsize/2, r * this.tsize + this.tsize/2, radius,0,2*Math.PI);
                      context.fill();
                    }else if(theme == 'stars'){
                      var radius;
                      var color;
                      var sColor;
                      var blur;
                      if(tile.gens == 0){
                        radius = this.tsize/2.5;
                        color = 'white';
                        sColor = '#99ccff';
                        blur = 20;
                      }else if(tile.gens == 1){
                        radius = this.tsize/3;
                        color = 'yellow';
                        sColor = 'white';
                        blur = 15;
                      }else if(tile.gens == 2){
                        radius = this.tsize/4;
                        color = 'orange';
                        sColor = '#99ccff';
                        blur = 10;
                      }else if(tile.gens == 3){
                        radius = this.tsize/6;
                        color = 'red';
                        sColor = 'yellow';
                        blur = 7;
                      }else if(tile.gens >= 4){
                        radius = this.tsize/8;
                        color = 'darkred';
                        sColor = 'orange';
                        blur = 5;
                      }
                      context.shadowColor = sColor;
                      context.shadowBlur = blur;//5
                      context.fillStyle = color;
                      
                      context.beginPath();
                      context.arc(c * this.tsize + this.tsize/2, r * this.tsize + this.tsize/2, radius,0,2*Math.PI);
                      context.fill();                      
                    }                 
                }
            }
        }
    };//end of Tilemap render
  
  this.clear = function(){
    this.tiles.map(function(tile){
      tile.isAlive = false;
      tile.markedAs = false;
    })
  };// end of Tilemap clear
  
  this.update = function(){
    this.tiles.map(function(currentTile){     
      var aliveCount = currentTile.neighbors
        .map(function(i){return this.tiles[i].isAlive;}, this)//get array of neighbors states
        .reduce(function(prev, curr){return prev + curr});//curr - true or false, coerced to 1 or 0
      
      if(!currentTile.isAlive && aliveCount == 3){
        currentTile.markedAs = true;
      }else if(currentTile.isAlive && aliveCount > 3){
        currentTile.markedAs = false;
      }else if(currentTile.isAlive && aliveCount < 2){
        currentTile.markedAs = false;
      }
    }, this);
    this.tiles.map(function(currentTile){
      if(currentTile.isAlive == currentTile.markedAs){
        currentTile.gens++;
      }else{
        currentTile.isAlive = currentTile.markedAs;
        currentTile.gens = 0;
      }      
    });
  };
}//end of Tilemap