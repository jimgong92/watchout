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

  var enemiesArr = Array(nEnemies);

  var drag = d3.behavior.drag()
               .on('dragstart', function() { circle.style('fill', 'red'); })
               .on('drag', function() { circle.attr('cx', d3.event.x)
                                              .attr('cy', d3.event.y); })
               .on('dragend', function() { circle.style('fill', 'black'); });

  var circle = box.selectAll('.draggableCircle')
                .data([{ x: (boxWidth / 2), y: (boxHeight / 2), r: 25 }])
                .enter()
                .append('svg:circle')
                .attr('class', 'draggableCircle')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', function(d) { return d.r; })
                .call(drag)
                .style('fill', 'black');

  //create enemies
  game.selectAll('.enemy').data(enemiesArr)
  .enter().append('image').attr("class", "enemy").attr("width", 2 * r)
  .attr("height", 2 * r).attr("x", function() {return randCX();})
  .attr("y", function(){return randCY();}).attr("xlink:href", "asteroid.png");

  //create player
  game.selectAll('.player').data([1])
  .enter().append('image').attr("class", "player").attr("width", 2 * r)
  .attr("height", 2 * r).attr("x", width / 2)
  .attr("y", height / 2).attr("xlink:href", "ship.png");

  var moveEnemies = function() {
    d3.selectAll('.enemy').data(enemiesArr)
    .transition().duration(1000)
    .attr("x", function() {return randCX()})
    .attr("y", function(){return randCY();});
  };
  //give enemies orders to move in random direction every 1000ms
  setInterval(moveEnemies, 1500);



  //Move player based on click-and-drag

  //Increment current score

  //Detect player-enemy collision
    //Update score

// });
