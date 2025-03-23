/**
 * Calculate the whole plan and show it in the table.
 */
function calculatePlan(event) {
    // event.preventDefault is used to prevent refreshing the page after clicking calculate button
    event.preventDefault();

    // clear the table and summary if this is not the first calculation
    removeOldTableData();
    
    // Check if the given data is valid for the calculation
    if (!formIsValid()) return;
    
    // here, all data are valid, we start the calculation

    // show the table before the calculation
    showTable();

    // Do the actual calculation
    calculate();
}

/**
 * Remove the old table data if exists
 */
function removeOldTableData()
{
    // first we remove the old data from the table body
    let tableBody = document.getElementById("tbody");
    tableBody.innerHTML = "";

    // we remove the old plan info (the 3 paragraphs)
    let tableContainer = document.getElementById("table-container");
    tableContainer.querySelectorAll("p").forEach(p => p.remove());
}

/**
 * Check if the given information is valid.
 * * @returns ture if yes, otherwise returns false
 */
function formIsValid() {
    let creditForm = document.getElementById("credit-form");
    if (creditForm.checkValidity() == false || checkManualValidation() == false) {
        // If form is not valid, hide the table, show built-in validation messages and stop the execution
        document.getElementById("table").style.visibility = "hidden";
        creditForm.reportValidity();
        return false;
    }
    else return true;
}

/**
 * Check if the monthly payment is enouph for the given loan and interest
 * @returns 
 */
function checkManualValidation() {
    let interestAmountElement = document.getElementById("interest");
    let interestPerYear = Number(interestAmountElement.value / 100);
    let creditAmount = Number(document.getElementById("amount").value);
    let interestPerMonth = Number(interestPerYear / 12);
    let monthlyPaymentElement = document.getElementById("payment");
    let monthlyPayment = Number(monthlyPaymentElement.value);
    let firstInterestAmount = creditAmount * interestPerMonth;
    let firstPrincipal = monthlyPayment - firstInterestAmount;

    // if the monthly payment does't cover the first interest amount
    // or if the first principal is too small
    // then return false
    if (monthlyPayment <= firstInterestAmount || firstPrincipal < creditAmount * 0.001) {
        alert("The monthly payment is too small for this loan!");
        monthlyPaymentElement.focus();
        return false;
    }
    return true;
}

/**
 * Shows the table and set the style for tht table container
 */
function showTable()
{
    // show the table
    let table = document.getElementById("table");
    table.style.visibility = "visible";

    // set the style for table container
    let tableContainer = document.getElementById("table-container");
    tableContainer.style.backgroundColor = "#2c2c2c";
    tableContainer.style.borderRadius = "8px";
}

/**
 * Make the real calculations and fill the table
 */
 function calculate()
{
    let tableBody = document.getElementById("tbody");

    let creditAmount = Number(document.getElementById("amount").value);
    let interestPerYear = Number(document.getElementById("interest").value / 100);
    let month = Number(document.getElementById("month").value);
    let year = Number(document.getElementById("year").value);
    let monthlyPayment = Number(document.getElementById("payment").value);

    let interestPerMonth = Number(interestPerYear / 12);
    let interestSum = 0; // keeps the total amount of the interest
    let i = 0;
    let date = new Date("1850-01-01");
    let balance = creditAmount;

    while(balance > 0) {
        // create a row in the table
        let row = document.createElement("tr");
        let tdMonth = document.createElement("td");
        let tdMonthYear = document.createElement("td");
        let tdInterest = document.createElement("td");
        let tdPricipal = document.createElement("td");
        let tdBalance = document.createElement("td");

        let monthCount = ++i;
        tdMonth.textContent = monthCount;

        // the default value of date is 1850-01-01
        // if it is still so, this means we are in the first loop
        // so we take the date from the form fields.
        if (date.getFullYear() < 1900) date = new Date(`${year}-${month}-01`);
        // if the date is not the default date, this means we are not in the first loop
        // simply we add one month to the date to make it ready for the next loop
        else date.setMonth(date.getMonth() + 1);
        tdMonthYear.textContent = date.toLocaleString('en-US', { month: 'short', year: 'numeric' })

        // calculate the interest amount
        var interestAmount = Number((balance * interestPerMonth).toFixed(2));
        tdInterest.textContent = interestAmount;
        // add the interest amount to the interest sum
        interestSum += interestAmount;
        // principal is the amount that will be deducted every month from the credit
        var principal = 0;
        if (monthlyPayment >= balance) principal = balance; // this will happen only in the last payment
        // principal is the monthly payment minus the monthly interest
        else principal = Number((monthlyPayment - interestAmount).toFixed(2));
        tdPricipal.textContent = principal;
        // the new balance is the old balance minus the principal
        balance = Number((balance - principal).toFixed(2));
        tdBalance.textContent = balance;

        // add all of these information to the row
        row.appendChild(tdMonth);
        row.appendChild(tdMonthYear);
        row.appendChild(tdInterest);
        row.appendChild(tdPricipal);
        row.appendChild(tdBalance);

        // add the rwo to table
        tableBody.appendChild(row);
    }
    
    // the last payment will be different
    let lastPayment = principal + interestAmount;

    // add the summary before the table
    addCreditSummary(i, interestSum, creditAmount, lastPayment);
}

/**
 * Add plan summary before the table
 * @param {*} i , at the end, i represents the number of the last payment
 * @param {*} interestSum , contains the total amount of the interest
 * @param {*} creditAmount , the amount of the credit
 * * @param {*} lastPayment , the last payment, which is different from all previous payments
 */
function addCreditSummary(i, interestSum, creditAmount, lastPayment) {

    let tableContainer = document.getElementById("table-container");
    let table = document.getElementById("table");

    // The summary will be in the table container before the table
    let p1 = document.createElement("p");
    p1.textContent = `You will cover the loan in: ${i} payments.`;
    p1.append(document.createElement('br'));
    p1.append(`Total loan time is: ${Math.floor(i / 12)} year(s) and ${i % 12} month(s).`);
    p1.append(document.createElement('br'));
    p1.append(`Total interest amount is: ${interestSum.toFixed(2)}.`);
    p1.append(document.createElement('br'));
    p1.append(`Ratio of total interest to loan amount is ${(interestSum / creditAmount * 100).toFixed(2)}%.`);
    p1.append(document.createElement('br'));
    p1.append("Details are in the below table.");

    tableContainer.insertBefore(p1, table);

    // only the summary of the last payment will be after the table
    // and there should be a link to page start
    let p2 = document.createElement("p");
    p2.textContent = `The last payment is: ${lastPayment.toFixed(2)}`;
    p2.append(document.createElement('br'));

    const upLink = document.createElement('a');
    upLink.href = '#';
    upLink.innerText = 'Go to Top';
    p2.appendChild(upLink)

    tableContainer.appendChild(p2);
}

document.getElementById("btn").addEventListener("click", calculatePlan);