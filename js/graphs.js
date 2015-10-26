// Graph 1
var 
			// margin = {top: 20, right: 0, bottom: 30, left: 70},
			margin = {top: 20, right: 40, bottom: 30, left: 140},
		    width = $(".graph-section").width() - margin.left - margin.right,
		    height = 300 - margin.top - margin.bottom;

		var parseDate = d3.time.format("%Y").parse;

		var x = d3.time.scale()
		    .range([0, width]);

		var y = d3.scale.linear()
		    .range([height, 0]);

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom");

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .ticks(5)
		    .orient("left");

		var line1 = d3.svg.line()
		   .x(function(d) { return x(d.year); })
		   .y(function(d) { return y(d.noh); });

		var line2 = d3.svg.line()
		   .x(function(d) { return x(d.year); })
		   .y(function(d) { return y(d.noh); });
		  
		/*var line = d3.svg.line()
		    .interpolate("basis")
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.noh); });
		*/

		var svg = d3.select("#graph-1").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		d3.json("../php/data11.php", function(error, data) {
		    console.log(data);
		   data.forEach(function(d) {
		        d.noh = +d.noh;
		        d.year = parseDate(d.year);
		    });
		  data1 = data.filter(function(tee){return tee.type == "P"})
		  data = data.filter(function(tee){return tee.type == "AL"})
		  console.log(data);
		  x.domain(d3.extent(data, function(d) { return d.year; }));
		  //y.domain(d3.extent(data, function(d) { return d.noh; }));
		  y.domain([0, d3.max(data, function(d) { return d.noh; })]);
		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis);

		  svg.append("g")
		      .attr("class", "y axis")
		      .call(yAxis)
		    .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 10)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .style("fill", "#FFF");
		      
		      //.text("Number of Hurricanes") 

	  
		  svg.append("path")
		      .datum(data)
		      .attr("class", "line1")
		      .attr("d", line1);

		  svg.append("path")
		      .datum(data1)
		      .attr("class", "line2")
		      .attr("d", line2);
		});

		// Map
		// var map = L.map('map').setView([38.8833,-97.0167], 6);
	 //      var hdat=null;

	       
	    
	 //       L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
	 //           maxZoom: 18,
	           
	 //           id: 'mapbox.streets-satellite',
	 //          continuousWorld: 'true',
	 //          noWrap: 'true'
	 //       }).addTo(map);

// Graph 2

var line = d3.svg.line()
   .x(function(d) { return x(d.year2); })
   .y(function(d) { return y(d.noh2); });


var svg2 = d3.select("#graph-1-1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
d3.json("../php/data12.php", function(error, data) {
    console.log(data);
   data.forEach(function(d) {
        d.noh2 = +d.noh;
        d.year2 = parseDate(d.year);
    });
  console.log(data);
  x.domain(d3.extent(data, function(d) { return d.year2; }));
  //y.domain(d3.extent(data, function(d) { return d.noh; }));
  y.domain([0, d3.max(data, function(d) { return d.noh2*1.2; })]);
  svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  
  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")

  svg2.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
      });

// Bar 1
var x1 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .2);

var y1 = d3.scale.linear()
    .range([height, 0]);

var xAxis1 = d3.svg.axis()
    .scale(x1)
    .orient("bottom");

var yAxis1 = d3.svg.axis()
    .scale(y1)
    .orient("left")
    .ticks(6);

var tipal = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "Windspeed: " + d.almaxwind;
  });
 var tippc = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "Windspeed:" + d.pcmaxwind;
  }); 

var svgb1 = d3.select("#graph-2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svgb1.call(tipal);
svgb1.call(tippc);
d3.csv("gr4.csv", type, function(error, data) {
  if (error) throw error;

  x1.domain(data.map(function(d) { return d.month; }));
  y1.domain([0, d3.max(data, function(d) { return d.almaxwind; })]);

  svgb1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis1);

  svgb1.append("g")
      .attr("class", "y axis")
      .call(yAxis1)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      // .text("Max Windspeed in knots");

    bars=svgb1.selectAll(".bar")
      .data(data)
      .enter();

    bars.append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x1(d.month); })
      .attr("width", x1.rangeBand() / 2)
      .attr("y", function(d) { return y1(d.almaxwind); })
      .attr("height", function(d) { return height - y1(d.almaxwind); })
      .on('mouseover', tipal.show)
      .on('mouseout', tipal.hide)

    bars.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x1(d.month)+ x1.rangeBand()/2;})
      .attr("width", x1.rangeBand() / 2)
      .attr("y", function(d) { return y1(d.pcmaxwind); })
      .attr("height", function(d) { return height - y1(d.pcmaxwind); })
      .on('mouseover', tippc.show)
      .on('mouseout', tippc.hide)

});

function type(d) {
  d.almaxwind = +d.almaxwind;
  d.pcmaxwind = +d.pcmaxwind;
  return d;
}
//Bar Graph 2

var x2 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .2);

var y2 = d3.scale.linear()
    .range([height, 0]);

var xAxis2 = d3.svg.axis()
    .scale(x2)
    .orient("bottom");

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left")
    .ticks(6);


var tipal2 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "Pressure: " + d.alminpres;
  });
 var tippc2 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "Pressure: " + d.pcminpres;
  }); 
var svgb2 = d3.select("#graph-2-1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
svgb2.call(tipal2);
svgb2.call(tippc2);
d3.csv("gr4.csv", type2, function(error, data) {
  if (error) throw error;

  x2.domain(data.map(function(d) { return d.month; }));
  y2.domain([800, d3.max(data, function(d) { return d.pcminpres; })]);
  
  svgb2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis2);

  svgb2.append("g")
      .attr("class", "y axis")
      .call(yAxis2)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")

    bars2=svgb2.selectAll(".bar")
      .data(data)
      .enter();
    
    
    bars2.append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x2(d.month); })
      .attr("width", x2.rangeBand() / 2)
      .attr("y", function(d) { return y2(d.alminpres); })
      .attr("height", function(d) { return height - y2(d.alminpres); })
      .on('mouseover', tipal2.show)
      .on('mouseout', tipal2.hide)


    bars2.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x2(d.month)+ x2.rangeBand()/2;})
      .attr("width", x2.rangeBand() / 2)
      .attr("y", function(d) { return y2(d.pcminpres); })
      .attr("height", function(d) { return height - y2(d.pcminpres); })
      .on('mouseover', tippc2.show)
      .on('mouseout', tippc2.hide)

});

function type2(d) {
  d.alminpres = +d.alminpres;
  d.pcminpres = +d.pcminpres;
  return d;
}



