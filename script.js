
class Calculator{
  constructor(previousOperand, currentOperand){
    this.previousOperandElement = previousOperand
    this.currentOperandElement = currentOperand
    this.clear()
  }

  //specify what to clear
  clear(){
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  // this ensures that when adding a number and you click on the decimal point more than once, it will only add it one
  
  appendNumber(number){
    if(number === '.'  && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString() 
  }
  

  chooseOperation(operation){
    if(this.currentOperand === '') return
      if(this.previousOperand !== ''){
        return this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
      console.log(operation)
  }

  compute(){
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current)) return;
    //switch conditional operator
    console.log(this.operation)
    switch(this.operation){
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return 
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''   
  }

  //get display function 
  //we are spliting the value we get into 2 i.e the integer part & the decimal part
  //123.456
  getDisplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if(isNaN(integerDigits)){
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
    }
    if(decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`
    }else {
      return integerDisplay
    } 
  }

  //update display function
  updateDisplay(){
    this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand)
    if(this.operation != null){
      this.previousOperandElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }else{
      this.previousOperandElement.innerText = ''
    }
  }
}

// queryselectorall stores the values as a list i.e a collection stored in []
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperand, currentOperand)

//iterating the numberbuttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

//iterate the operation buttons
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

// all clear code
allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

//delete button
deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

//equals button
equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})
