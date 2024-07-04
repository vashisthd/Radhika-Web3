
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let displayValue = '';
    let operator = '';
    let firstValue = '';
    let secondValue = '';

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-value');
            buttons.forEach(btn => btn.classList.remove('active'));

            // Add active class to the clicked button
            e.target.classList.add('active');

            if (value >= '0' && value <= '9' || value === '.') {
                displayValue += value;
                display.innerText = displayValue;
            } else if (value === '=') {
                secondValue = displayValue;
                displayValue = operate(firstValue, secondValue, operator);
                display.innerText = displayValue;
                firstValue = displayValue;
                secondValue = '';
                operator = '';
            } else if (value === '+' || value === '-' || value === '/' || value === '*' || value === '√' || value === '^') {
                if (value === '√') {
                    displayValue = Math.sqrt(parseFloat(displayValue)).toString();
                    display.innerText = displayValue;
                } else {
                    // Append operator to display
                    displayValue += ' ' + value + ' ';
                    display.innerText = displayValue;
                    operator = value;
                    firstValue = displayValue; // Store the expression for further calculation
                    displayValue = '';
                }
            } else {
                // Clear button clicked
                displayValue = '';
                operator = '';
                firstValue = '';
                secondValue = '';
                display.innerText = '0';
            }
        });
    });
    // function isFloat(num) {
    //     return Number.isFinite(num) && !Number.isInteger(num);
    // }
    function roundNumber(num) {
        if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) {
            throw new Error('Please provide a valid number');
        }
        let roundedNum = num.toFixed(15).replace(/\.?0*$/, ''); 
    
        if (roundedNum.includes('.') && roundedNum.split('.')[1].length > 5) {
            roundedNum = parseFloat(roundedNum).toFixed(5);
        }
    
        return roundedNum;
    }
    
    function operate(first, second, operator) {
        
        operator = operator.trim();
        first = parseFloat(first);
        second = parseFloat(second);
        let result;
        switch (operator) {
            case '+':
                result = first + second;
                break;
            case '-':
                result = first - second;
                break;
            case '*':
                result = first * second;
                break;
            case '/':
                result = first / second;
                break;
            case '^':
                result = Math.pow(first, second);
                break;
            default:
                result = second;
        }
        // if(isFloat(result)){
        // return result.toFixed(5);
        // }
        // else{
        //     return result;
        // }
        end_result = roundNumber(result);
        return end_result;
    }
});
