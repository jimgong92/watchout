// $(document).ready(function() {
var currScore = 0;
var highScore = 0;
var nEnemies = 30;
var height = 450;
var width = 700;
var padding = 20;
//r = radius of enemy/player sprite
var r = 10;
var d = 2 * r;
var game = d3.select('.svg-container');
var enemies = game.selectAll('.enemy');

var randCX = function() {
  var x = Math.random() * width;
  if (x < d) {
    return d;
  }
  else if (x > width - d) {
    return width - d;
  }
  return x;
};
var randCY = function() {
  var y = Math.random() * height;
  if (y < d) {
    return d;
  }
  else if (y > height - d) {
    return height - d;
  }
  return y;
};


//create player and drag functionality for player
var drag = d3.behavior.drag().on("drag", function(d){
  var x = d3.event.x;
  var y= d3.event.y;
  d3.select(this).attr("x", x - r).attr("y", y - r);
});

game.selectAll('.player').data([1])
.enter().append('image').attr("class", "player").attr("width", d)
.attr("height", d).attr("x", width / 2)
.attr("y", height / 2).attr("xlink:href", "ship.png").call(drag);

// create enemies
var enemiesArr = Array(nEnemies);

game.selectAll('.enemy').data(enemiesArr)
.enter().append('image').attr("class", "enemy").attr("width", d)
.attr("height", d).attr("x", function() {return randCX();})
.attr("y", function(){return randCY();}).attr("xlink:href", "asteroid.png");

//move enemies
var moveEnemies = function() {
  d3.selectAll('.enemy').data(enemiesArr)
  .transition().duration(1000)
  .attr("x", function() {return randCX();})
  .attr("y", function() {return randCY();})
};
//give enemies orders to move in random direction every 1000ms
setInterval(moveEnemies, 1500);


//Increment current score
setInterval(function() {
  d3.select(".current-score").text(currScore++);
}, 80);

//Detect player-enemy collision
  //Update score
var checkCollision = function() {
  //get player coordinates

  //get coordinates of each enemy

  //check if enemy coordinate === player coordinate
    //if highScore < currScore
      //highScore === currScore
    //currScore = 0
};

// });
