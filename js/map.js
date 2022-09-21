/** Class representing the map view. */
class MapVis {
  /**
   * Creates a Map Visuzation
   * @param globalApplicationState The shared global application state (has the data and the line chart instance in it)
   */
  constructor(globalApplicationState) {
    this.globalApplicationState = globalApplicationState;

    // Set up the map projection
    const projection = d3.geoWinkel3()
      .scale(150) // This set the size of the map
      .translate([400, 250]); // This moves the map to the center of the SVG


    // adding map
    console.log("topoJSON: ",this.globalApplicationState.mapData);
    // let geoJSON = topojson.feature(this.globalApplicationState, this.globalApplicationState.mapData);
    console.log("geo: ",topojson.feature(this.globalApplicationState.mapData, this.globalApplicationState.mapData.objects.countries));

    this.countries = topojson.feature(this.globalApplicationState.mapData, this.globalApplicationState.mapData.objects.countries)

    console.log("covidData: ",this.globalApplicationState.covidData[0].total_cases_per_million);

    this.path = d3.geoPath().projection(projection);

    this.svg = d3.select('#map')

    this.graticule = d3.geoGraticule();
    // this.svg.select("graticules")
            
    // grid lines
    this.svg.select("#graticules")
            .selectAll("path")
	          .data(this.graticule.lines())
            .enter().append("path")
              .attr("class", "graticule line")
              .attr("id", function(d) {
                var c = d.coordinates;
                if (c[0][0] === c[1][0]) {
                  return (c[0][0] < 0) ? -c[0][0] + "W" : +c[0][0] + "E";
                }
                else if (c[0][1] === c[1][1]) {
                  return (c[0][1] < 0) ? -c[0][1] + "S" : c[0][1] + "N";
                }
                })
              .attr("d", this.path);

// this.svg.selectAll('text')
// .data(graticule.lines())
// 	.enter().append("text")
// 	.text(function(d) {
//       var c = d.coordinates;
// 			if ((c[0][0] == c[1][0]) && (c[0][0] % 30 == 0)) {return (c[0][0]);}
// 			else if (c[0][1] == c[1][1]) {return (c[0][1]);}
// 		})
// 	.attr("class","label")
// 	.attr("style", function(d) {
//       var c = d.coordinates;
//       return (c[0][1] == c[1][1]) ? "text-anchor: end" : "text-anchor: middle";
//    })
// 	.attr("dx", function(d) {
//       var c = d.coordinates;
//       return (c[0][1] == c[1][1]) ? -10 : 0;
//   })
// 	.attr("dy", function(d) {
//       var c = d.coordinates;
//       return (c[0][1] == c[1][1]) ? 4 : 10;
//   })
// 	.attr('transform', function(d) {
//     var c = d.coordinates;
// 		return ('translate(' + projection(c[0]) + ')')
// 	});

    

    this.colorScale = d3.scaleSequential(d3.interpolateReds).domain([0, 1]);
    console.log(d3.interpolateReds(0.125));

    this.svg.select("#graticules")
            .append("path")
            .datum(this.graticule.outline)
            .attr("class", "graticule outline")
            .attr("d", this.path); 

    this.svg.select('#countries')
            .append('path')
            .attr('d', this.path(this.countries))
            .attr('fill', 'none')
            .attr('stroke', 'grey')
            .attr('fill',(d,i) => d3.max(console.log(d[i].total_cases_per_million),d[i].total_cases_per_million))
            // .enter()
            // .attr('fill',d3.interpolateReds(0.125));
            // .attr('fill',(d) => colorScale(Math.random()))
            
    
    // this.svg.select("#countries")
    //         .selectAll('path')
    //         .data(this.countries)



    // this.svg.select('#countries')
    //         .data(this.globalApplicationState.covidData)
    //         // .enter().insert("path", "#graticules")
    //         //   .attr("d", path)
    //           // .style('fill',(d,i) => this.colorScale(d3.max(d[i].total_cases_per_million)))
    //           .attr('fill',(d) => colorScale(Math.random()))


  }

  updateSelectedCountries () {

  }
}
