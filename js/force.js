var width = 500,
    height = 300;

var color = d3.scale.category20();

var force = d3.layout.force()
    .gravity(0.2)
    .charge(-180)
    .linkDistance(60)
    .size([width, height]);

var svg = d3.select("#reseau").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("forceSchultz.json", function(error, graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return 3; });

     function mouseover() {
      d3.select(this).select("text")
          .attr("visibility", "visible");
    }

    function mouseout() {
      d3.select(this).select("text")
          .attr("visibility", "hidden");
    } 

  var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("g")
      .attr("class", "node")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
      .call(force.drag);

    node.append("circle")
        .attr("r", function(d) { return 7; });

    node.append("text")
        .attr("dx", ".10em")
        .attr("dy", ".10em")
        .attr("visibility", function(d){ if(d.type==0) return "hidden";if(d.type==1) return "visible";})
        .text(function(d) {return d.id; });


  force.on("tick", function() {

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

  

  });
});
