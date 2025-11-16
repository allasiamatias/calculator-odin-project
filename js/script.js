const btns = document.querySelectorAll(".button")
const display =document.querySelector(".display-numero")
const displayResult = document.querySelector(".display-result")


let valorActual = ""
let valorAnterior = ""
let operator = ""
let resultado = ""

btns.forEach(btn =>{
    btn.addEventListener("click",(e) => {
        console.log(e.target.dataset.option)
        let selection = e.target.dataset.option
        if(selection >= "0" && selection <="9"){
            valorActual += selection
        }
        if(selection === "+" || selection === "-" || selection === "X" || selection === "/"){
            valorAnterior = valorActual
            operator = selection
            valorActual = ""
        }
        if(selection === "="){
            const operacionCompleta = `${valorAnterior} ${operator} ${valorActual}`
            resultado = calculator(Number(valorAnterior),operator,Number(valorActual))
            
            display.textContent = operacionCompleta
            displayResult.textContent = resultado
            
            valorAnterior = ""
            valorActual = String(resultado)
            operator = ""
            return
        }
        if(selection === "clear"){
            valorActual = ""
            valorAnterior = ""
            operator = ""
            resultado = ""
            return display.textContent = "", displayResult.textContent = ""
        }
        displayResult.textContent = `${valorAnterior} ${operator} ${valorActual}`
    })
})


function calculator(numA, operator, numB){
    if(operator === "+"){
        return add(numA, numB)
    } else if(operator === "-"){
        return substract(numA, numB)
    } else if (operator === "X"){
        return multiply(numA, numB)
    }else if(operator === "/"){
        return divide(numA, numB)
    }
}

function add(a, b){
    return a + b
}
function substract(a, b){
    return a - b
}
function multiply(a, b){
    return a * b
}
function divide(a, b){
    if (b === 0){
        console.error ("NO SE PUEDE DIVIDIR POR 0")
    }
    return a / b
}

