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
        })
        .on('mouseover', function () {
            povertyLabel.style('fill', 'black');
        })
        .on('mouseout', function () {
            changeXAxisLabel();
        });

    ageLabel = svg.append('text')
        .attr('transform','translate(' + width / 2 + ' ,' + (height + margin.top + 55) + ')')
        .style('text-anchor', 'middle')
        .text("Age (Median)")
        .on('click', function() {
            setXVariable('age')
        })
        .on('mouseover', function () {
            ageLabel.style('fill', 'black');
        })
        .on('mouseout', function () {
            changeXAxisLabel();
        });

    incomeLabel = svg.append('text')
        .attr('transform','translate(' + width / 2 + ' ,' + (height + margin.top + 80) + ')')
        .style('text-anchor', 'middle')
        .text("Household Income (Median)")
        .on('click', function() {
            setXVariable('income')
        })
        .on('mouseover', function () {
            incomeLabel.style('fill', 'black');
            })
        .on('mouseout', function () {
            changeXAxisLabel();
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
        })
        .on('mouseover', function () {
            smokeLabel.style('fill', 'black');
        })
        .on('mouseout', function () {
            changeYAxisLabel();
        });

    obeseLabel = svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -60)
        .attr('x', 0 - height / 2)
        .style('text-anchor', 'middle')
        .text('Obese (%)')
        .on('click', function() {
            setYVariable('obesity')
        })
        .on('mouseover', function () {
            obeseLabel.style('fill', 'black');
        })
        .on('mouseout', function () {
            changeYAxisLabel();
        });

    healthcareLabel = svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -80)
        .attr('x', 0 - height / 2)
        .style('text-anchor', 'middle')
        .text('Lacks Healthcare(%)')
        .on('click', function() {
            setYVariable('healthcare')
        })
        .on('mouseover', function () {
            healthcareLabel.style('fill', 'black');
        })
        .on('mouseout', function () {
            changeYAxisLabel();
        });
}

function changeYAxisLabel() {
    switch (yVariable) {
        case 'smokes':
            smokeLabel.style('font-weight', 'bold')
                .style('fill', 'black');
            obeseLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            healthcareLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            break;
        case 'obesity':
            smokeLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            obeseLabel.style('font-weight', 'bold')
                .style('fill', 'black');
            healthcareLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            break;
        case 'healthcare':
            smokeLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            obeseLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey')
            healthcareLabel.style('font-weight', 'bold')
                .style('fill', 'black');
            break;
        default:
            smokeLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey')
            obeseLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey')
            healthcareLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey')
            break;
    }

}

function changeXAxisLabel() {

    switch (xVariable) {
        case 'poverty':
            povertyLabel.style('font-weight', 'bold')
                .style('fill', 'black');
            ageLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            incomeLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            break;
        case 'age':
            povertyLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            ageLabel.style('font-weight', 'bold')
                .style('fill', 'black');
            incomeLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            break;
        case 'income':
            povertyLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            ageLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            incomeLabel.style('font-weight', 'bold')
                .style('fill', 'black');
            break;
        default:
            povertyLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            ageLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            incomeLabel.style('font-weight', 'normal')
                .style('fill', 'lightgrey');
            break;
    }
}

function drawGraph() {
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