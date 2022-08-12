// create and fill pi chart data
let piSpendingLabels = []
let piSpendingData = []
let piSpendingColors = []

for (let i = 0; i < 5; i++) {
    piSpendingLabels[i] = getSpendingCategory(i);
    piSpendingData[i] = getSpendingAmount(i);
    piSpendingColors[i] = getSpendingColor(i);
}

// assign data to a Chart.JS model
var data = {
    labels: piSpendingLabels,
    datasets: [{
        data: piSpendingData,
            backgroundColor: piSpendingColors
    }]
};

// this is a custom Chart.JS plugin that draws text inside a pi chart
const inlinetext = {
    beforeDraw: function(chart) {

        var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;  // this is an html canvas instance
            
            ctx.restore();
            var fontSize = (height / 250);
            ctx.textBaseline = "middle";
            
            // set the font and add the text to the center of the chart
            ctx.font = "bold " + fontSize.toFixed(2) + "em sans-serif";
            var text = "$" + dollarUSLocale.format(Math.round(getTotal())),
                textX = Math.round((width - ctx.measureText(text).width) / 2 ),
                textY = height / 2 - 5;  // put slightly above midline
            ctx.fillText(text, textX, textY);
    
            // add the SPENT line
            ctx.font = (fontSize-0.25).toFixed(2) + "em sans-serif";
            var subtext = "SPENT",
                subtextX = Math.round((width - ctx.measureText(subtext).width) / 2),
                subtextY = height / 2 + 15;  // position below midline
            ctx.fillText(subtext, subtextX, subtextY);

            ctx.save();
    }
}

// add the top spending category pi chart
var topSpendingPi = new Chart(document.getElementById('spendingpichart'), {
    plugins:[inlinetext],
        type: 'doughnut',
            data: data,
            options: {

                aspectRatio: 1.25,  // make it slightly smaller
                plugins: {
                    legend: {
                      display: false   // prevent labels from being displayed
                    }
        
                    
                }
            }
});


// add data for spending over time chart
let barSpendingLabels = []
let barSpendingData = []
for (let i = 0; i < 6; i++) {
    barSpendingLabels[i] = getSpendingMonthsName(i);
    barSpendingData[i] = getSpendingMonthsAmount(i);
}

// create chart data
var spendingMonthData = {
    labels: barSpendingLabels,
    datasets: [{
        data: barSpendingData,
            backgroundColor:"#045b04"
    }]
};

// add the spending chart
var spendingChart = new Chart(document.getElementById('spendingChart'),{
    type:'bar',
    data: spendingMonthData,
    options: {
        aspectRatio: 2.5,
        plugins: {
            legend: {
              display: false
            },

            tooltip: {
                callbacks: {
                    label: function(context) {   // this funciton adds custom labels to the data
                        let label = context.dataset.label || ''; 

                        // applying the currency formats
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }


        },
        scales:{
            // adding the custom labels to the Y axis ticks
            y:{
                ticks:{
                    callback: function(label, index, labels) {
                        return  "$" + label;
                    }
                }
            }
        }
    }
});



// create two arrays of background colors with default
let expenseBackgroundColors = ["#3b2561"];
let incomeBackgroundColors = ["#3b2561"];

// ternary operator to determine if the actual value has gone over expected, add colors appropriately
expenseBackgroundColors.push((getExpensePredicted() > getExpenseActual() ? "#28cb04" : "#a50000"));
incomeBackgroundColors.push((getIncomeActual() < getIncomePredicted() ? "#a50000" : "#28cb04" ));

// add to expense and income data
var expensedata = { 
    labels: [
            "Predicted",
            "Actual"
      ],
    datasets: [{
        data: [
            getExpensePredicted(),
            getExpenseActual()
        ],
            backgroundColor: expenseBackgroundColors
    }]
};

var incomedata = { 
    labels: [
            "Predicted",
            "Actual"
      ],
    datasets: [{
        data: [
            getIncomePredicted(),
            getIncomeActual()
        ],
            backgroundColor: incomeBackgroundColors
    }]
};

// creating the spending bar chart
var spendingChart = new Chart(document.getElementById('expensechart'),{
    type:'bar',
    data: expensedata,
    options: {
        indexAxis: 'y',
        aspectRatio: 2.5,
        plugins: {
            legend: {
              display: false
            },

            tooltip: {  // using the currency formatter and custom tooltips to have properly formatted labels
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';

                        if (context.parsed.x !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.x);
                        }
                        return label;
                    }
                }
            }

        },
        scales:{
            // assign currency labels to x axis instead of y axis
            x:{
                ticks:{
                    callback: function(label, index, labels) {
                        return  "$" + label;
                      }
                }
            }
        }
    }
});

// repeat with the chart below
var spendingChart = new Chart(document.getElementById('incomechart'), {
    type:'bar',
    data: incomedata,
    options: {
        indexAxis: 'y',
        aspectRatio: 2.5,
        plugins: {

            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';

                        if (context.parsed.x !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.x);
                        }
                        return label;
                    }
                }
            },
            legend: {
                display: false
            }

        },
        scales:{
            x:{
                ticks:{
                    callback: function(label, index, labels) {
                        return  "$" + label;
                      }
                }
            }
        }
    }
});