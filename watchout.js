// $(document).ready(function() {
var currScore = 0;
var highScore = 0;
var nEnemies = 30;
var height = 450;
var width = 700;
var padding = 20;
//r = radius of enemy/player sprite
var r = 10;
var game = d3.select('.svg-container');
var randCX = function() {
  var x = Math.random() * width;
  if (x < 2*r) {
    return 2*r;
  }
  else if (x > width - 2 * r) {
    return width - 2 * r;
  }
  return x;
};
var randCY = function() {
  var y = Math.random() * height;
  if (y < 2*r) {
    return 2*r;
  }
  else if (y > height - 2 * r) {
    return height - 2 * r;
  }
  return y;
};


//create player
var drag = d3.behavior.drag().on("drag", function(d){
  var x = d3.event.x;
  var y= d3.event.y;
  d3.select(this).attr("x", x - r).attr("y", y - r);
});
game.selectAll('.player').data([1])
.enter().append('image').attr("class", "player").attr("width", 2 * r)
.attr("height", 2 * r).attr("x", width / 2)
.attr("y", height / 2).attr("xlink:href", "ship.png").call(drag);

// create enemies
var enemiesArr = Array(nEnemies);

game.selectAll('.enemy').data(enemiesArr)
.enter().append('image').attr("class", "enemy").attr("width", 2 * r)
.attr("height", 2 * r).attr("x", function() {return randCX();})
.attr("y", function(){return randCY();}).attr("xlink:href", "asteroid.png");

//move enemies
var moveEnemies = function() {
  d3.selectAll('.enemy').data(enemiesArr)
  .transition().duration(1000)
  .attr("x", function() {return randCX()})
  .attr("y", function(){return randCY();});
};
//give enemies orders to move in random direction every 1000ms
setInterval(moveEnemies, 1500);

setInterval(function() {
  currScore++;
  d3.select(".current-score").text(currScore);
}, 80);

//Increment current score

//Detect player-enemy collision
  //Update score

// });
