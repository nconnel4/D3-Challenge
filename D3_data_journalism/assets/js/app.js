// instantiate variables for x and y measures
let xVariable;
let yVariable;
let x;
let y;

// set margin
const margin = {
    top: 20,
    right:20,
    bottom: 125,
    left: 125
};

const width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// svg setup
const svg = d3.select('#scatter').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// let x = d3.scaleLinear().domain([0, 100]).range([0, width]);
// svg.append('g')
//     .attr('transform', 'translate(0,' + height + ')')
//     .call(d3.axisBottom(x));

// let povertyLabel = svg.append("text")
//     .attr('transform','translate(' + width / 2 + ' ,' + (height + margin.top + 30) + ')')
//     .style('text-anchor', 'middle')
//     .style('font-weight', 'bold')
//     .text("In Poverty (%)");
// let ageLabel = svg.append('text')
//     .attr('transform','translate(' + width / 2 + ' ,' + (height + margin.top + 55) + ')')
//     .style('text-anchor', 'middle')
//     .style('fill', 'lightgrey')
//     .text("Age (Median)");
// let IncomeLabel = svg.append('text')
//     .attr('transform','translate(' + width / 2 + ' ,' + (height + margin.top + 80) + ')')
//     .style('text-anchor', 'middle')
//     .style('fill', 'lightgrey')
//     .text("Household Income (Median)");


// let y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
// svg.append('g')
//     .call(d3.axisLeft(y));
// let smokeLabel = svg.append('text')
//     .attr('transform', 'rotate(-90)')
//     .attr('y', -40)
//     .attr('x', 0 - height / 2)
//     .style('text-anchor', 'middle')
//     .style('font-weight', 'bold')
//     .text('Smokes (%)')
// let obeseLabel = svg.append('text')
//     .attr('transform', 'rotate(-90)')
//     .attr('y', -60)
//     .attr('x', 0 - height / 2)
//     .style('text-anchor', 'middle')
//     .style('fill', 'lightgrey')
//     .text('Obese (%)')
// let healthcareLabel = svg.append('text')
//     .attr('transform', 'rotate(-90)')
//     .attr('y', -80)
//     .attr('x', 0 - height / 2)
//     .style('text-anchor', 'middle')
//     .style('fill', 'lightgrey')
//     .text('Lacks Healthcare(%)')

function drawAxes(xLowerLimit, xUpperLimit, yLowerLimit, yUpperLimit) {
    //draw X Axis
    x = d3.scaleLinear().domain([xLowerLimit, xUpperLimit]).range([0, width]);
    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));


    // draw Y Axis
    y = d3.scaleLinear().domain([yLowerLimit, yUpperLimit]).range([height, 0]);
    svg.append('g')
        .call(d3.axisLeft(y));
}

function addYAxisLabel() {

    let smokeLabel = svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -40)
        .attr('x', 0 - height / 2)
        .style('text-anchor', 'middle')
        .text('Smokes (%)')
    let obeseLabel = svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -60)
        .attr('x', 0 - height / 2)
        .style('text-anchor', 'middle')
        .text('Obese (%)')
    let healthcareLabel = svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -80)
        .attr('x', 0 - height / 2)
        .style('text-anchor', 'middle')
        .text('Lacks Healthcare(%)')

    switch (yVariable) {
        case 'smokes':
            smokeLabel.style('font-weight', 'bold')
                .style('fill', 'black');
            obeseLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            healthcareLabel('font-weight', 'normal')
                .style('fill', 'lightgrey');
            break;
        case 'obesity':
            smokeLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            obeseLabel.style('font-weight', 'bold')
                .style('fill', 'black');
            healthcareLabel('font-weight', 'normal')
                .style('fill', 'lightgrey');
            break;
        case 'healthcare':
            smokeLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            obeseLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            healthcareLabel('font-weight', 'normal')
                .style('fill', 'lightgrey');
            break;
        default:
            smokeLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey')
            obeseLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey')
            healthcareLabel('font-weight', 'normal')
                .style('fill', 'lightgrey')
    }

}

function drawGraph() {
    // clear graph before drowing
    svg.selectAll('*').remove()

    d3.csv('assets/data/data.csv').then(function (data) {

        console.log(data.map(d=> parseFloat(d[xVariable])))

        xLowerLimit = d3.min(data, d => parseFloat(d[xVariable])) * .9
        xUpperLimit = d3.max(data, d => parseFloat(d[xVariable])) * 1.10

        yLowerLimit = d3.min(data, d => parseFloat(d[yVariable])) * .9
        yUpperLimit = d3.max(data, d => parseFloat(d[yVariable])) + 1.10

        // console.log(xLimit)
        // console.log(yLimit)

        drawAxes(xLowerLimit, xUpperLimit, yLowerLimit, yUpperLimit)

        let circles = svg.selectAll("circles")
            .data(data)
            .enter()
            .append('circle')
            .style('fill', 'lightblue')
            .style('stroke', 'white')
            .attr('cy', function (d) {
                return y(d[yVariable])
            })
            .attr('cx', function (d) {
                return x(d[xVariable])
            })
            .attr('r', 10);

    })
}

function setYVariable(value) {
    yVariable = value
    drawGraph(xVariable, yVariable)
    addYAxisLabel(yVariable)
}

function setXVariable(value) {
    xVariable = value
    drawGraph(xVariable, yVariable)
    addYAxisLabel(xVariable)
}

function init() {

}


// d3.csv('assets/data/data.csv').then(function (data) {
//
//     let circles = svg.selectAll("circles")
//         .data(data)
//         .enter()
//         .append('circle')
//         .attr('cy', function (d) {
//             return y(d['smokes'])
//         })
//         .attr('cx', function (d) {
//             return x(d['poverty'])
//         })
//         .attr('r', 5);

    // // X axis
    // svg.append('g')
    //     .attr('class', 'x axis')
    //     .attr('transform', 'translate(0,' + height + ')')
    //     .call(xAxis)
    //
    // // Y axis
    // svg.append('g')
    //     .attr('class', 'y axis')
    //     .call(yAxis)
    //
    // // Draw dots
    // svg.selectAll('.dot')
    //     .data(data)
    //     .enter().append('circle')
    //     .attr('class', 'dot')
    //     .attr('r' , 3.5)
    //     .attr('cx', xMap)
    //     .attr('cy', yMap)

    // var stateAbbr = data.map(obj => obj.abbr);
    // var poverty = data.map(obj => obj.poverty);
    // var smoke = data.map(obj => obj.smokes);

    // // Add X axis
    // var x = d3.scaleLinear()
    //     .domain([0, 100])
    //     .range([ 0, svgWidth]);
    // svg.append("g")
    //     .attr("transform", "translate(0," + svgHeight + ")")
    //     .call(d3.axisBottom(x));
    //
    // // Add Y axis
    // var y = d3.scaleLinear()
    //     .domain([0, 100])
    //     .range([ svgHeight, 0]);
    // svg.append("g")
    //     .call(d3.axisLeft(y));
    //
    // // Add dots
    // svg.append('g')
    //     .selectAll("dot")
    //     .data(data)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", function (d) { return x(d.poverty); } )
    //     .attr("cy", function (d) { return y(d.smokes); } )
    //     .attr("r", 1.5)
    //     .style("fill", "#69b3a2")


// });