// $(document).ready(function() {
var currScore = 0;
var highScore = 0;
var collisions = 0;
var nEnemies = 30;
var height = 450;
var width = 700;
var padding = 20;
//r = radius of enemy/player sprite
var r = 10;
var diameter = 2 * r;
var game = d3.select('.svg-container');
var enemies = game.selectAll('.enemy');
var player = game.selectAll('.player');

var randCX = function() {
  var x = Math.random() * width;
  if (x < diameter) {
    return diameter;
  }
  else if (x > width - diameter) {
    return width - diameter;
  }
  return x;
};
var randCY = function() {
  var y = Math.random() * height;
  if (y < diameter) {
    return diameter;
  }
  else if (y > height - diameter) {
    return height - diameter;
  }
  return y;
};


var onCollision = function() {
  if (highScore < currScore) {
    highScore = currScore;
    d3.selectAll('.high-score').text(highScore);
  }
  currScore = 0;
  collisions++;
  d3.selectAll('.collision-counter').text(collisions);
};

//create player and drag functionality for player
var drag = d3.behavior.drag().on("drag", function(d){
  var x = d3.event.x - r;
  var y= d3.event.y - r;
  d3.select(this).attr("x", x).attr("y", y)
  .transition().tween('custom', function() {
    var en = d3.selectAll(".enemy");
    var enList = Array.prototype.slice.call(d3.selectAll(".enemy"))[0];
    for (var i = 0; i < enList.length; i++) {
      var enemyX = enList[i].getAttribute('x');
      var enemyY = enList[i].getAttribute('y');
      var separation = Math.sqrt(Math.pow((x - enemyX), 2) + Math.pow((y - enemyY), 2));
      if (separation <= diameter) {
        onCollision();
      }

    }
  });
});

player.data([1])
.enter().append('image').attr("class", "player").attr("width", diameter)
.attr("height", diameter).attr("x", width / 2)
.attr("y", height / 2).attr("xlink:href", "ship.png").call(drag);

// create enemies
var enemiesArr = Array(nEnemies);

enemies.data(enemiesArr)
.enter().append('image').attr("class", "enemy").attr("width", diameter)
.attr("height", diameter).attr("x", function() {return randCX();})
.attr("y", function(){return randCY();}).attr("xlink:href", "asteroid.png");

//move enemies
var moveEnemies = function() {
  d3.selectAll('.enemy').data(enemiesArr)
  .transition().duration(1000)
  .attr("x", function() {return randCX();})
  .attr("y", function() {return randCY();})
  .transition().tween('custom', function() {
    var playerX = d3.selectAll('.player').attr('x');
    var playerY = d3.selectAll('.player').attr('y');
    var enemyX = d3.selectAll(".enemy").attr('x');
    var enemyY = d3.selectAll(".enemy").attr('y');
    var separation = Math.sqrt(Math.pow((playerX - enemyX), 2) + Math.pow((playerY - enemyY), 2));
    if (separation <= diameter) {
      onCollision();
    }
  });
};

d3.selectAll('.enemy').data(enemiesArr)
//give enemies orders to move in random direction every 1000ms
setInterval(moveEnemies, 1000);


//Increment current score
setInterval(function() {
  d3.select(".current-score").text(currScore++);
}, 80);

//Detect player-enemy collision
  //Update score
// var checkCollision = function() {
//   //get player coordinates

//   //get coordinates of each enemy

//   //check if enemy coordinate === player coordinate
//     //if highScore < currScore
//       //highScore === currScore
//     //currScore = 0
// };

// });
