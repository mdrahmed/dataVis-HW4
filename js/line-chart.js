const padding = { left: 80, bottom: 50, right: 50 };
const CHART_WIDTH = 500;
const CHART_HEIGHT = 250;

/** Class representing the line chart view. */
class LineChart {
  /**
   * Creates a LineChart
   * @param globalApplicationState The shared global application state (has the data and map instance in it)
   */
  constructor(globalApplicationState) {
    // Set some class level variables
    this.globalApplicationState = globalApplicationState;

    // console.log("iso codes: ",this.globalApplicationState.covidData[0].filter( (d,i) => d.iso_code ));

    this.continents = this.globalApplicationState.covidData.filter((d,i) => (d.iso_code.substring(0,4) == "OWID") ? d : null);
    this.continents = d3.group(this.continents, d => d.location);
    console.log(this.continents);

    this.lineChart = d3.select("#line-chart")
      // .data(this.globalApplicationState.covidData.filter((d,i) => (d.iso_code.substring(0,4) == "OWID") ? console.log(d.iso_code.substring(0,4)) : null))
      // .data(this.globalApplicationState.covidData.filter((d,i) => (d.iso_code.substring(0,4) == "OWID") ? d : null))
        //  .attr("")
    
    let xAxis = d3.scaleLinear()
        .domain([2016, 2022])
        .range([0,CHART_WIDTH]);

    this.lineChart.select('#x-axis')
                  .attr("transform", "translate(80," + 490 + ")")
                  .call(d3.axisBottom(xAxis))
    
    this.lineChart.select('#x-axis')
                  .append('text')
                  .text('Year')
                  .attr('x', 50)
                  .attr('y', 700);



    this.yAxis = d3.scaleLinear()	
                  .domain([0,1000])
                  .range([ 600 - padding.bottom, 10 ])

    this.lineChart.select('#y-axis')
                  .append('g')
                  .attr('transform', `translate(${padding.left},0)`)
                  .call(d3.axisLeft(this.yAxis));
              
    // Append y axis text
    this.lineChart
                  .select('#y-axis')
                  .append('text')
                  .text('Spending')
                  .attr('x', -340)
                  .attr('y', 20)
                  .attr('transform', 'rotate(-90)');



  }

  updateSelectedCountries () {

  }
}
