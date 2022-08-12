// parse the demo json file - in production version, this will be specific to a user
var topspend = JSON.parse(topspend);
var recenttransactions = JSON.parse(recenttransactions);
var spendingtime = JSON.parse(spendingtime);
var budget = JSON.parse(budget);
var investments = JSON.parse(investments);

// used to set up how money is displayed
let dollarUSLocale = Intl.NumberFormat('en-US');


// Recent Transaction Table
function getRecentName(number) {
    return recenttransactions[number].name;
}

function getRecentDate(number) {
    return recenttransactions[number].date;
}

function getRecentType(number) {
    return recenttransactions[number].type;
}

function getRecentAmount(number) {
    return recenttransactions[number].amount;
}
// Recent Transaction End


// Top Spending Pi
function getSpendingCategory(place) {
    return topspend[place].category;
}

function getSpendingAmount(place) {
    return topspend[place].amount;
}

function getSpendingColor(place) {
    return topspend[place].displaycolor;
}

function getTotal() {
    let total = 0;
    for (let i = 0; i < 5; i++) {
        total += getSpendingAmount(i);
    }
    return total;
}
// Top Spending End


// Budget Chart
function getExpensePredicted() {
    return budget[0].expensepredicted;
}

function getExpenseActual() {
    return budget[0].expenseactual;
}

function getIncomePredicted() {
    return budget[0].incomepredicted;
}

function getIncomeActual() {
    return budget[0].incomeactual;
}
// Budget End


// Spending Months Bar
function getSpendingMonthsName(number) {
    return spendingtime[number].month;
}

function getSpendingMonthsAmount(number) {
    return spendingtime[number].amount;
}
// Spending Months End


// Investment Summary Table
function getSecurityAmount() {
    return investments[0].securitiesamount;
}

function getCashBalance() {
    return investments[0].cashbalance;
}

function getInvestmentTotal() {
    return investments[0].securitiesamount + investments[0].cashbalance;
}

function getTodaysChange() {
    return investments[0].todaychange;
}

function getPercentChange() {
    return investments[0].percentchange;
}
// Investment Summary End


// adding and filling the recent transactions table (has 5 elements)
for (let i = 0; i < 5; i++) {
    $('#recentpurchasetable').append("<tr><td>" // adds table rows
        + getRecentName(i) + "</td><td>"        // uses the getter methods to fill cells
        + getRecentDate(i) + "</td><td>"
        + getRecentType(i) + "</td><td>"
        + "$" + dollarUSLocale.format(getRecentAmount(i)) + "</td></tr>");
}


// addding the top spending table to the left of the pi chart (has 5 lines)
for (let i = 0; i < 5; i++) {
    $('#topspendinglist').append(
        '<dt class="col-8"><i class="fa fa-solid fa-circle" style="color:'   // adds colors specified in json
            + getSpendingColor(i) + '"></i> ' + getSpendingCategory(i)
            + '</dt><dd class="col-4"> $' + dollarUSLocale.format(getSpendingAmount(i)) + '</dd>'
    );
}


// adding the expense text in the budget card
$('#expensetext1').html("<p>$"
    + dollarUSLocale.format(getExpenseActual()) + " of $" 
    + dollarUSLocale.format(getExpensePredicted()) + "</p>");

// get the difference in expense, and display accordingly using ternary operator
var difference = getExpensePredicted() - getExpenseActual();
$('#expensetext2').html("<p>$" 
    + dollarUSLocale.format(Math.abs(difference))
    + (difference < 0 ? " Over" : " Under") + "</p>");


// adding the income text
$('#incometext1').html("<p>$"
    + dollarUSLocale.format(getIncomeActual()) + " of $" 
    + dollarUSLocale.format(getIncomePredicted()) + "</p>");

// same deal with ternary operator
var difference = getIncomePredicted() - getIncomeActual();
$('#incometext2').html("<p>$"
    + dollarUSLocale.format(Math.abs(difference)) 
    + (difference > 0 ? " Under" : " Over") + "</p>");


// adding the investment text to the investment summary card
$('#securityamount').append("$" + dollarUSLocale.format(getSecurityAmount()));
$('#cashamount').append("$" + dollarUSLocale.format(getCashBalance()));
$('#total').append("$" + dollarUSLocale.format(getInvestmentTotal()));

// add the today's change section, using ternary operator to decide what direction caret points
$('#changeamount').append("$" 
    + dollarUSLocale.format(getTodaysChange())
    + " (" + getPercentChange() + '%) <i class="fa fa-caret-'
    + (getPercentChange() > 0 ? 'up' : 'down')
    + ' fa-lg"></i>');

// ternary operator decides what color text should be
$('#changeamount').css("color",(getPercentChange() > 0 ? "green" : "red"));