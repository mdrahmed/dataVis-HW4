const padding = { left: 80, bottom: 50, right: 50 };
const MARGIN = { left: 80, bottom: 20, top: 20, right: 50 };
const CHART_WIDTH = 500;
const CHART_HEIGHT = 400;
// const CHART_HEIGHT = 600;

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

    // this.continents = this.globalApplicationState.covidData.filter((d,i) => (d.iso_code.substring(0,4) == "OWID") ? d : null);
    // this.continents = d3.group(this.continents, d => d.location);
    // console.log(this.continents);
  
    // if(globalApplicationState.selectedLocations.length != 0){
    //   // this.globalApplicationState.selectedLocations = glo
    //   // console.log(this.globalApplicationState.selectedLocations);
    //   console.log("selected now");
    //   this.updateSelectedCountries();
    // }
    // else{
    // console.log("selec loc line: ",globalApplicationState.selectedLocations.length);
    
    // if(this.globalApplicationState.selectedLocations.length)
    
    let covid_data_selected;
    
    var selectedLocation = globalApplicationState.selectedLocations
    console.log(globalApplicationState.selectedLocations);
    if(selectedLocation.length != 0){ // if there is selection
      covid_data_selected = this.updateSelectedCountries()
      console.log("covid selected line: ",covid_data_selected);

      d3.select("#lines").selectAll("g").remove()
      d3.select("#y-axis").selectAll('g').remove()
      d3.select("#x-axis").selectAll('g').remove()
    }
    else{
      covid_data_selected= this.globalApplicationState.covidData.filter(function(d){
        return d.iso_code.includes("OWID")
      });
    }

    // covid_data_selected= this.globalApplicationState.covidData.filter(function(d){
    //   return d.iso_code.includes("OWID")
    // });
    console.log("type of covid: ",typeof(covid_data_selected))
    let groupedDataContinents = d3.group(covid_data_selected, (d) => d.location);
    console.log("group data: ",groupedDataContinents)


      // .data(this.globalApplicationState.covidData.filter((d,i) => (d.iso_code.substring(0,4) == "OWID") ? console.log(d.iso_code.substring(0,4)) : null))
      // .data(this.globalApplicationState.covidData.filter((d,i) => (d.iso_code.substring(0,4) == "OWID") ? d : null))
        //  .attr("")
        // .attr("width", CHART_WIDTH + MARGIN.left + MARGIN.right)
        // .attr("height", CHART_HEIGHT + MARGIN.top + MARGIN.bottom)
        
    
    // console.log(this.continents.values()[0][0].date)
    // console.log(Array.from(this.continents, (x,i) => {
    //   console.log(x,i)
    //   // x.date
    // }  ))

    //this.globalApplicationState.covidData.forEach(d => console.log("covid:",d));
    // const dates = this.continents.map((row) => )
    // const dates = this.globalApplicationState.covidData.map((row) => new Date(row.date))
    // // const dates = groupedDataContin.map((row) => new Date(row.date))
    // console.log("date: ",dates)

    let minDate = d3.min(covid_data_selected, function(d){
      return new Date(d.date)
    })
    let maxDate = d3.max(covid_data_selected, function(d){
      return new Date(d.date)
    })
    let maxCases = d3.max(covid_data_selected, function(d){
      return parseFloat(d.total_cases_per_million)
    })
    console.log(minDate,maxDate,maxCases);
    // let timeConv = d3.timeParse("%d-%b-%Y");
    // let dates=[];
    // for (let x of this.continents){
    //   // console.log("ad ",x)
    //   let f = 0;
    //   for(let i of x){
    //     // console.log("i ",i);
    //     if(f==1){
    //       for(let k in i){
    //         // console.log(k,x[i][k].date)
    //         // console.log(k,x[1][k].date);
    //         // dates.push(x[1][k]);
    //         dates.push(x[1][k])
    //         // let newDate = d3.map(x[1][k].date)
    //       }
    //       f=0;
    //     }
    //     f+=1;
    //   }
    // }
    // let timeConv = d3.timeParse("%d-%b-%Y");
    // const dateParser = d3.timeParse("%d/%m/%Y");
    // const xAccessor = (d) => dateParser(d);
    // console.log(xAccessor(dates[0].date));
    // console.log(dates);
    // let newDate = dates.map((d) => new Date(d.date));
    // console.log(Date.parse(d3.min(dates)),Date.parse(d3.max(dates)));
    // console.log(d3.extent(dates))
    // console.log("conv: ",timeConv(2020-01-22))
    // let dd = 
    // let maxDate = this.continents.map(function(d) {
    //   d.array.forEach(element => {
    //     console.log(element)
    //   });
    // })
    // Array.from(this.continents, (x,i) => {
    //   // console.log(x[1][0])
    //   for(let c in x){
    //     for(let i in c){
    //       if(c==1){
    //         console.log(x[c][i])
    //       }
    //     }
    //   }
    // })

/// worked axis
    // let cases=[];
    // for (let x of this.continents){
    //   // console.log("ad ",x)
    //   let f = 0;
    //   for(let i of x){
    //     // console.log("i ",i);
    //     if(f==1){
    //       for(let k in i){
    //         // console.log(k,x[i][k].date)
    //         // console.log(k,x[1][k].total_cases_per_million);
    //         cases.push(x[1][k]);
    //         // cases.push(x[1][k])
    //       }
    //       f=0;
    //     }
    //     f+=1;
    //   }
    // }

    // // console.log("max: ", d3.max(cases, d => parseFloat(d)));
    this.lineChart = d3.select("#line-chart")
                        // .attr('width',CHART_WIDTH)
                        // .attr('height',CHART_HEIGHT)
    this.xAxis = this.lineChart.select("#x-axis")
          .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");

    let xScale = d3.scaleTime()
          // .domain([2016, 2022])
          // .domain([ Date.parse(d3.min(dates, (d) => d.date)),Date.parse(d3.max(dates, (d) => d.date))])
          // .domain(d3.min(newDate),d3.max(newDate))
          // .domain([Date.parse("2020-01-22"), Date.parse(d3.max(dates))])
          // .domain(d3.extent(dates))
          .domain([minDate,maxDate])
          .range([0,CHART_WIDTH]);

    this.xAxis.append("g")
            .attr("class", "axis-x")
            .attr("transform", "translate(0," + CHART_HEIGHT + ")")
            .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b %Y")));
    
    this.xAxis.append('text')
                  .text('Date')
                  .attr('x', CHART_HEIGHT-170)
                  .attr('y', CHART_WIDTH-50);
    

    
    this.yAxis = this.lineChart.select("#y-axis")      

    let yScale = d3.scaleLinear()	
                  // .domain([0,d3.max(cases, (d) => parseFloat(d.total_cases_per_million))])
                  .domain([0,maxCases])
                  .range([CHART_HEIGHT, 0])
                  // .range([CHART_HEIGHT-MARGIN.top-MARGIN.bottom, 0])
                  .nice()

    this.yAxis.append("g")
        .attr("class", "axis-y")
        .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`)
        .call(d3.axisLeft(yScale))
    

    this.yAxis.append('text')
                      .text('case per million')
                      .attr('x', -250)
                      .attr('y', 20)
                      .attr('transform', 'rotate(-90)');


    // // console.log(this.continents[group])                  
    // this.lineChart.select("#lines")
    //               .selectAll("path")
    //               // .data(this.continents)
    //               .data(groupedDataContin)
    //               .join('path')
    //               .attr('fill','none')
    //               // .attr('stroke')
    //               .attr("stroke-width",3)
    //               .attr('d',([group,values]) => d3.line()
    //                         // .x(function(d) {
    //                         //   console.log("date type: ",typeof(d.date),",date: ",d.date);
    //                         //   // return this.xScale(d.map((row) => new Date(row.date)));
    //                         //   // return this.xScale(dates, (n) => {
    //                         //   //   console.log(n)
    //                         //   //   return n;
    //                         //   // })
    //                         //   return this.xScale(d.map(new Date(d.date)))
    //                         // })
    //                         .x( (d) => xScale(new Date(d.date)))
    //                         .y((d) => yScale(d.total_cases_per_million))
    //                         // .y((d) => {
    //                         //   console.log(d.total_cases_per_million)
    //                         //   this.yScale(parseFloat(d.total_cases_per_million))
    //                         // })
    //                         (values)
    //               )


    let lineColorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(groupedDataContinents.keys());
    this.lineChart.select('#lines')
    .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")")
      .append('g')
      .selectAll('path')
      .data(groupedDataContinents)
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', ([group, values]) => lineColorScale(group))
      .attr('stroke-width', 1)
      .attr('d', ([group, values]) => d3.line()
                                        .x((d) => xScale(new Date(d.date)))
                                        .y((d) => yScale(d.total_cases_per_million))
                                        (values))

  // formate Date
  let formatDate =  function (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
// console.log(formatDate('Wed May 13 2026 06:25:55 GMT-0600 (Mountain Daylight Time)'))
  // console.log("xAxis",)
  this.lineChart.on('mousemove', (event) => {
        //console.log("before ");
        console.log("client: ",event.clientX,"offset: ",event.offsetX)
        if (event.offsetX > MARGIN.left && event.offsetX < innerWidth - MARGIN.right) {
         // Set the line position
         //console.log("after")
        this.lineChart.select('#overlay')
                .select('line')
                .attr('stroke', 'black')
                .attr('x1', event.offsetX)
                .attr('x2', event.offsetX)
                .attr('y1', CHART_HEIGHT +20)
                .attr('y2', 20);
                                        
        // Find the relevant data (by date and location)
        // const dateHovered = xScale.invert(event.clientX)
        this.dateHovered = formatDate(xScale.invert(event.offsetX))
        console.log(this.dateHovered,typeof(this.dateHovered))
        const filteredData = covid_data_selected.filter((row) => row.date === this.dateHovered)
                                          .sort((rowA, rowB) => rowB.total_cases_per_million - rowA.total_cases_per_million)
       console.log(filteredData)
        
        this.lineChart.select('#overlay')
                  .selectAll('text')
                  .data(filteredData)
                  // .data(this.globalApplicationState.covidData)
                  .join('text')
                    .text(d=>`${d.location}, ${d3.format(".2s")(d.total_cases_per_million)}`)
                    // .attr('x', condition ? event.clientX : event.clickX)
                    // .attr('x', event.offsetX)
                    .attr('x', function (d){
                      // console.log("date hovered: ",typeof(d.date)) 
                      // middle date - 2021-10-19
                      console.log("offset:",event.offsetX);
                      const middle_date = new Date("2021-10-19")
                      let curr_date = new Date(d.date)
                      if(curr_date < middle_date){
                        return event.offsetX;
                      }
                      return event.offsetX-150;
                    })
                    .attr('y', (d, i) => 20*i + 20)
                    .attr('alignment-baseline', 'hanging')
                    .attr('fill', (d) => lineColorScale(d.location));
                    
        }
        
  });



  // }
  }

  // updateSelectedCountries (country_id) {
  updateSelectedCountries () {
    // console.log("inside update line: ",this.globalApplicationState.selectedLocations[0].__data__.id);
    // console.log("selected update line");
    // console.log("In lineChart: ",globalApplicationState.selectedLocations[0].__data__.id)
    // this.globalApplicationState.selectedLocations.forEach((el,in) => console.log("each: ", el[in].__data__))
    // this.globalApplicationState.selectedLocations.forEach( function(el, in) {
    //   console.log("each: ", el[in].__data__)
    // })
    // for(let i in this.globalApplicationState.selectedLocations){
    //   console.log(this.globalApplicationState.selectedLocations[i].__data__.id)
    // }
    // this.globalApplicationState.selectedLocations.filter((d) => console.log("data:",d));
    // console.log(country_id)
    let countrySelected_CovidData;
    // countrySelected_CovidData = this.globalApplicationState.covidData.filter(function(d){
    //   return d.iso_code.includes("AFG") && d.iso_code.includes("RUS")
    // });
      // console.log(i);
    
    // countrySelected_CovidData = this.globalApplicationState.covidData.filter(item => {
    //   return this.globalApplicationState.selectedLocations.includes(item.iso_code)
    // })

    // countrySelected_CovidData = this.globalApplicationState.covidData.filter(item => {
    //   return country_id.includes(item.iso_code)
    // })

    // let selectedLocation = 
    countrySelected_CovidData = this.globalApplicationState.covidData.filter(item => {
      return this.globalApplicationState.selectedLocations.includes(item.iso_code)
    })

    // for(let i in this.globalApplicationState.selectedLocations){
    //   this.globalApplicationState.covidData.filter(function(d){
    //         if(d.iso_code === this.globalApplicationState.selectedLocations[i].__data__.id){
    //           // console.log(d)
    //           countrySelected_CovidData.push(d)
    //         }
    //       })
    //   }

    console.log(countrySelected_CovidData);
    return countrySelected_CovidData;
    // let maxCases = d3.max(countrySelected_CovidData, function(d){
    //   return parseFloat(d.total_cases_per_million)
    // })
  
    // const selectedData_covid = this.updateSelectedCountries(globalApplicationState)

    // d3.select("#lines").selectAll("g").remove()
    // d3.select("#y-axis").selectAll('g').remove()
    // d3.select("#x-axis").selectAll('g').remove()

    // let yScale = d3.scaleLinear()	
    //                 // .domain([0,d3.max(cases, (d) => parseFloat(d.total_cases_per_million))])
    //                 .domain([0,maxCases])
    //                 .range([CHART_HEIGHT, 0])
    //                 // .range([CHART_HEIGHT-MARGIN.top-MARGIN.bottom, 0])
    //                 // .nice()
                    
    // console.log(maxCases);
  
    // // this.lineChart = d3.select("#line-chart")
    // // this.yAxis = this.lineChart.select("#y-axis")     
    // // this.yAxis.append("g")
    // this.yAxis.selectAll("#axis-y")
    //           // .selectAll("#tick")
    //                 // .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`)
    //                 // .attr('transform','translate(20,20)')
    //                 .call(d3.axisLeft(yScale))
  
    // this.yAxis.append('text')
    //                 .text('cases per million')
    //                 .attr('x', -250)
    //                 .attr('y', 20)
    //                 .attr('transform', 'rotate(-90)');


// worked a little bit    
    // for(let i of this.globalApplicationState.selectedLocations){
    //   // let s = this.globalApplicationState.selectedLocations[0];
    //   countrySelected_CovidData = this.globalApplicationState.covidData.filter(function(d){
    //     return d.iso_code.includes(i)
    //   });
    //   // console.log(countrySelected_CovidData);
    //   console.log(countrySelected_CovidData);

    //   


//  not worked    
    // console.log(countrySelected_CovidData);
    // for(let i of this.globalApplicationState.selectedLocations){
    //   console.log(i);
    //   this.globalApplicationState.covidData.filter(function(d){
    //     let dd = d.iso_code.includes(i);
    //     console.log(dd)
    //     // countrySelected_CovidData.push(d.iso_code.includes(i));
    //   })
    // }

    // console.log(countrySelected_CovidData)
    // for(let p in globalApplicationState.selectedLocations){
    //   // countrySelected = this.globalApplicationState.covidData.filter(function(d){
    //   //   return d.iso_code === p.id;

    //     console.log("cn: ",globalApplicationState.selectedLocations[p]);
    //   }
      // console.log("cn: ",p.id);
    
    
    
    // console.log("country selected: ",countrySelected);



  }
}
