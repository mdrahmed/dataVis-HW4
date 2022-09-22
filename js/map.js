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
    console.log("geo converted to features: ",topojson.feature(this.globalApplicationState.mapData, this.globalApplicationState.mapData.objects.countries).features);
    this.countries = topojson.feature(this.globalApplicationState.mapData, this.globalApplicationState.mapData.objects.countries).features;
    console.log("covidData: ",this.globalApplicationState.covidData[10000].iso_code);
    console.log("covidData: ",this.globalApplicationState.covidData[2].iso_code);
    console.log("covidData: ",this.globalApplicationState.covidData[3].iso_code);
    console.log("covidData: ",this.globalApplicationState.covidData[4].iso_code);
    console.log("covidData: ",this.globalApplicationState.covidData[5].iso_code);

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


    this.colorScale = d3.scaleSequential(d3.interpolateReds).domain([-10000, 50000]);
    this.color = d3.scaleOrdinal(d3.schemeCategory10);

    this.svg.select("#graticules")
            .append("path")
            .datum(this.graticule.outline)
            .attr("class", "graticule outline")
            .attr("d", this.path); 

// trying a new method
    this.svg.selectAll("#countries")
            .data(this.countries)
            .enter().insert("path","#graticules")
                .attr('class','country')
                .attr("d",this.path)
                .attr('stroke', 'grey')
                .style('fill', (d,i) => {
                  console.log(d.id,i);
                  // iso-code is mapped to id of countries. Just get all the cases in the array using loop. Then get the maximum of that using d3.max
                  let max_cases = 0;
                  // this.max_cases = d3.max( this.globalApplicationState.covidData, (n) => {
                  //   // (n.iso_code === d.id) ? n.total_cases_per_million : null;
                  //   if(n.iso_code === d.id){
                  //     // console.log(n.total_cases_per_million);
                  //     return n.total_cases_per_million;
                  //   }
                  //   else return null;
                  // }) 
                  max_cases = d3.max( this.globalApplicationState.covidData, (n) => (n.iso_code === d.id) ? n.total_cases_per_million : null) 
                  console.log("max_cases: ",max_cases);
                  // console.log(d3.max(arr));
                  // return this.colorScale(max_cases);
                  return this.color(d.color = max_cases);
                })

// all the countries are selected at one time
    // this.svg.select('#countries')
    //           .append('path')
    //           .attr('d', this.path(this.countries))
    //           // .attr('fill', d3.interpolateReds( 0.125))
    //           .attr('stroke', 'grey')
    //           // .attr('fill',(d,i) => d3.max(console.log(d[i].total_cases_per_million),d[i].total_cases_per_million))

    // console.log("countries: ",this.countries.features);

    // this.svg.select('#countries')
    //         .selectAll('path')
    //         .data(this.countries.features)
    //         // .data(this.globalApplicationState.covidData)
    //         // .enter()
    //         // .attr('fill', d3.interpolateReds( 0.125))
    //         .attr('fill', (d,i) => {
    //           console.log(d,i);
    //           return d3.interpolateReds( 0.125);
    //         })

    // this.svg.select('#countries')
    //         .data(this.countries)
    //         .attr('fill', (d,i) => {
    //             console.log("id",d.id);
    //             let arr=[];
    //             // iso-code is mapped to id of countries. Just get all the cases in the array using loop. Then get the maximum of that using d3.max
    //             // d3.interpolateReds( d3.max(d.total_cases_per_million) );

    //           } )

    // this.svg.select("#countries")
    //         .data(this.globalApplicationState.covidData)
    
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
