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

//create svg
const svg = d3.select('#scatter').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


// create labels
let smokeLabel,
    obeseLabel,
    healthcareLabel,
    povertyLabel,
    ageLabel,
    incomeLabel;


function drawAxes(xLowerLimit, xUpperLimit, yLowerLimit, yUpperLimit) {
    //draw X Axis
    x = d3.scaleLinear().domain([xLowerLimit, xUpperLimit]).range([0, width]);
    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    povertyLabel = svg.append("text")
        .attr('transform','translate(' + width / 2 + ' ,' + (height + margin.top + 30) + ')')
        .style('text-anchor', 'middle')
        .text("In Poverty (%)")
        .on('click', function() {
            setXVariable('poverty')
        });

    ageLabel = svg.append('text')
        .attr('transform','translate(' + width / 2 + ' ,' + (height + margin.top + 55) + ')')
        .style('text-anchor', 'middle')
        .text("Age (Median)")
        .on('click', function() {
            setXVariable('age')
        });

    incomeLabel = svg.append('text')
        .attr('transform','translate(' + width / 2 + ' ,' + (height + margin.top + 80) + ')')
        .style('text-anchor', 'middle')
        .text("Household Income (Median)")
        .on('click', function() {
            setXVariable('income')
        });

    // draw Y Axis
    y = d3.scaleLinear().domain([yLowerLimit, yUpperLimit]).range([height, 0]);
    svg.append('g')
        .call(d3.axisLeft(y));

    smokeLabel = svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -40)
        .attr('x', 0 - height / 2)
        .style('text-anchor', 'middle')
        .text('Smokes (%)')
        .on('click', function() {
            setYVariable('smokes')
        });

    obeseLabel = svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -60)
        .attr('x', 0 - height / 2)
        .style('text-anchor', 'middle')
        .text('Obese (%)')
        .on('click', function() {
            setYVariable('obesity')
        });

    healthcareLabel = svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -80)
        .attr('x', 0 - height / 2)
        .style('text-anchor', 'middle')
        .text('Lacks Healthcare(%)')
        .on('click', function() {
            setYVariable('healthcare')
        });
}

function changeYAxisLabel() {
    switch (yVariable) {
        case 'smokes':
            smokeLabel.classed('activeLabel',true);
            obeseLabel.classed('axisLabel', true);
            healthcareLabel.classed('axisLabel', true);
            break;
        case 'obesity':
            smokeLabel.classed('axisLabel',true);
            obeseLabel.classed('activeLabel', true);
            healthcareLabel.classed('axisLabel', true);
            break;
        case 'healthcare':
            smokeLabel.classed('axisLabel',true);
            obeseLabel.classed('axisLabel', true);
            healthcareLabel.classed('activeLabel', true);
            break;
        default:
            smokeLabel.classed('axisLabel',true);
            obeseLabel.classed('axisLabel', true);
            healthcareLabel.classed('axisLabel', true);
            break;
    }

}

function changeXAxisLabel() {

    switch (xVariable) {
        case 'poverty':
            povertyLabel.classed('activeLabel',true);
            ageLabel.classed('axisLabel', true);
            incomeLabel.classed('axisLabel', true);
            break;
        case 'age':
            povertyLabel.classed('axisLabel',true);
            ageLabel.classed('activeLabel', true);
            incomeLabel.classed('axisLabel', true);
            break;
        case 'income':
            povertyLabel.classed('axisLabel',true);
            ageLabel.classed('axisLabel', true);
            incomeLabel.classed('activeLabel', true);
            break;
        default:
            povertyLabel.classed('axisLabel',true);
            ageLabel.classed('axisLabel', true);
            incomeLabel.classed('axisLabel', true);
            break;
    }
}

function drawGraph() {
    const labelDict = {
        'poverty': 'Poverty: ',
        'age': 'Median Age (Years): ',
        'income': 'Median Household Income: $',
        'obesity': 'Obesity: ',
        'smokes': 'Smokes: ',
        'healthcare': 'Lacks Healthcare: '
    }

    const suffixDict = {
        'poverty': '%',
        'obesity': '%',
        'smokes': '%',
        'healthcare': '%',
        'age': '',
        'income': ''
    }


    // clear graph before drowing
    svg.selectAll('*').remove()

    d3.csv('assets/data/data.csv').then(function (data) {

        xLowerLimit = d3.min(data, d => parseFloat(d[xVariable])) * .9;
        xUpperLimit = d3.max(data, d => parseFloat(d[xVariable])) * 1.10;

        yLowerLimit = d3.min(data, d => parseFloat(d[yVariable])) * .9;
        yUpperLimit = d3.max(data, d => parseFloat(d[yVariable])) + 1.10;

        drawAxes(xLowerLimit, xUpperLimit, yLowerLimit, yUpperLimit);
        changeYAxisLabel()
        changeXAxisLabel()

        let circles = svg.selectAll("circles")
            .data(data)
            .enter()


        circles.append('circle')
            .style('fill', 'lightblue')
            .style('stroke', 'white')
            .attr('cy', function (d) {
                return y(d[yVariable])
            })
            .attr('cx', function (d) {
                return x(d[xVariable])
            })
            .attr('r', 10)

        circles.append('text')
            .classed('circleText', true)
            .attr('dy', '0.35em')
            .attr('y', function (d) {
                return y(d[yVariable])
            })
            .attr('x', function (d) {
                return x(d[xVariable])
            })
            .attr("text-anchor", "middle")
            .text(d => d.abbr)
            .on('mouseover', function(d) {
                div.transition()
                    .duration(100)
                    .style('opacity', .9);
                div.html('<center><strong>' + d.state + '</strong><br>' +
                    '<strong>' + labelDict[xVariable] + '</strong>' + d[xVariable] + suffixDict[xVariable] + '<br>' +
                    '<strong>' + labelDict[yVariable] + '</strong>' + d[yVariable] + suffixDict[yVariable] + '</center>'
                )
                    .style('left', d3.event.pageX + 'px')
                    .style('top', d3.event.pageY + 'px')
                // .style('color', 'white')
                // .style('background', 'black');
            })
            .on('mouseout', function(d) {
                div.transition()
                    .duration(100)
                    .style('opacity', 0);
            })



    })
}

function setYVariable(value) {
    yVariable = value;
    drawGraph();
    changeYAxisLabel();
}

function setXVariable(value) {
    xVariable = value;
    drawGraph();
}

function init() {
    xVariable = 'poverty';
    yVariable = 'smokes';

    drawGraph();
}

init()