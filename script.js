const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');


numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventLIstener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

class Calculator{
  constructor(previousOperand, currentOperand){
    this.previousOperand = previousOperand
    this.currentOperand - currentOperand
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

  appendNumber(number){
    if(number === '.'  && this.currentOperand.includes('.')){
      return this.currentOperand = this.currentOperand.toString() + number.toString()
    }    
  }

  chooseOperation(operation){
    if(this.currentOperand === '')
      if(this.previousOperand !== ''){
        return this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
  
  }
}

const calculator = new Calculator(previousOperand, currentOperand)
