# Loan Planner

Loan Planner is a web-based application designed to calculate and display a detailed loan payment plan. The user can input loan details such as the loan amount, interest rate, starting date and monthly payment, and the app will generate a full monthly payment plan with summary. The goal is to provide a user-friendly and visually appealing way to manage and understand how the monthly interest, monthly principle and the loan rest amount are calculated.
The calculation algorithm has been tested and verified against real-world loan data in Germany, ensuring that the results are accurate and reliable.

![Responsice Mockup](assets/images/loan-planner-mockup.png)

## Features 

### Existing Features

- __The header__

  - The header contains the app name, lead text and a description.

![Header](assets/images/loan-planner-header.png)

- __Input fields__

  - The input fields will allow the user to enter the details of the loan, such as loan amount, yearly interest, starting date and monthly payment.
  - At the end there is a button to execute the validatin and calculation.

![Input Fields](assets/images/loan-planner-input-fields.png)

- __Table Container__

  - The table container will appear when the user enter all valid data and start the calculation.
  - It contains a summary of the loan, including info about the total interest and the period required to cover the loan.

![Table Container](assets/images/loan-planner-table-container.png)


### Features Left to Implement

- New calculation algorithm. When the user enter the loan amount, yearly inerest and the total period of the loan. The app should calculate the required monthly payment.

## Testing 

We have thoroughly tested all features and validation of Loan Planner to ensure a smooth and user-friendly experience.

### Validator Testing 

- HTML
  - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/)
- CSS
  - No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/)


## Deployment

- The site was deployed to GitHub pages.

The live link can be found here - https://salah929.github.io/loan-planner/index.html


## Credits

### Content

- The fonts were taken from [Google Fonts](https://fonts.google.com/)
- The responsive design is made with help of [Bootstrap](https://getbootstrap.com/)