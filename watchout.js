// $(document).ready(function() {
  var currScore = 0;
  var highScore = 0;
  var nEnemies = 30;
  var height = 450;
  var width = 700;
  var padding = 20;
  //r = radius of enemy/player sprite
  var r = 10;

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
  // start slingin' some d3 here.
  var enemiesArr = Array(nEnemies);
  //create enemies
  // var enemiesArr = [];
  // for (var i = 0; i < nEnemies; i++) {
  //   enemiesArr.push({
  //     // cx: randCX(),
  //     // cy: randCY(),
  //     // radius : r
  //   });
  // }

  d3.select('.svg-container').selectAll('.enemy').data(enemiesArr)
  .enter().append('image').attr("class", "enemy").attr("width", 2 * r)
  .attr("height", 2 * r).attr("x", function() {return randCX();})
  .attr("y", function(){return randCY();}).attr("xlink:href", "asteroid.png");

  // d3.select('.svg-container').selectAll('.enemy').data(enemiesArr)
  // .enter().append('image').attr("class", "enemy").attr("width", 2 * r)
  // .attr("height", 2 * r).attr("x", function(d) {return d.cx;})
  // .attr("y", function(d){return d.cy;}).attr("xlink:href", "asteroid.png");
  var moveEnemies = function() {
    d3.selectAll('.enemy').data(enemiesArr)
    .transition().duration(1000)
    .attr("x", function() {return randCX()})
    .attr("y", function(){return randCY();});
  };
  setInterval(moveEnemies, 1500);

  //give enemies orders to move in random direction every 1000ms

  //create player (diff color)
  //Move player based on click-and-drag

  //Increment current score

  //Detect player-enemy collision
    //Update score

// });
