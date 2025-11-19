const btns = document.querySelectorAll(".button")
const display =document.querySelector(".display-numero")
const displayResult = document.querySelector(".display-result")


let valorActual = ""
let valorAnterior = ""
let operator = ""
let resultado = ""
displayResult.textContent = "0"

btns.forEach(btn =>{
    btn.addEventListener("click",(e) => {
        console.log(e.target.dataset.option)
        let selection = e.target.dataset.option
        
        if (selection === "."){
            if(valorActual === ""){
                valorActual = "0."
            }else if(valorActual ==="-"){
                valorActual = "-0."
            } else if(!valorActual.includes(".")){
                valorActual += "."
            }
            displayResult.textContent = valorActual
            return
        }

        if(selection  === "+/-"){
            if(valorActual === ""){
                valorActual = "-"
                displayResult.textContent = valorActual
                return
            } else if(valorActual === "-"){
                valorActual = ""
                displayResult.textContent = valorActual
                return
            }else if(valorActual !== ""){
                valorActual = String(Number(valorActual) * -1)
                displayResult.textContent = valorActual
                console.log(typeof valorActual)
                return
            }
        }

        if(selection === "back"){
            if(valorActual !== ""){
                valorActual = valorActual.slice(0,-1)
                displayResult.textContent = `${valorAnterior} ${operator} ${valorActual}`
                return
            }

            if(operator !== ""){
                operator = ""
                displayResult.textContent = `${valorAnterior} ${operator} ${valorActual}`
                return
            }

            if(valorAnterior !== ""){
                valorAnterior = valorAnterior.slice(0,-1)
                displayResult.textContent = `${valorAnterior} ${operator} ${valorActual}`
                return
            }
        }
        
        if(selection >= "0" && selection <="9"){
            valorActual += selection
        }
        if(selection === "+" || selection === "-" || selection === "X" || selection === "/"){
            if(valorActual === "" && valorAnterior === ""){
                return
            } 
            
            if(valorAnterior !== "" && operator !== "" && valorActual !== ""){
                const operacionCompleta = `${valorAnterior} ${operator} ${valorActual}`
                resultado = calculator(Number(valorAnterior),operator,Number(valorActual))
                
                display.textContent = operacionCompleta
                operator = selection
                displayResult.textContent = `${resultado} ${operator}`
                
                valorAnterior= String(resultado)
                valorActual=""
                return
            }
            
            if(valorActual === "" && valorAnterior !== ""){
                operator = selection
                displayResult.textContent =`${valorAnterior} ${operator}`
                return
            } 
            
            if(valorActual !== ""){
                valorAnterior = valorActual
                operator = selection
                valorActual = ""
                displayResult.textContent = `${valorAnterior} ${operator}`
                return
            }
        }

        if(selection === "="){
            if(valorActual === "" || operator === "" || valorAnterior === ""){
                return
            }

            const operacionCompleta = `${valorAnterior} ${operator} ${valorActual}`
            resultado = calculator(Number(valorAnterior),operator,Number(valorActual))
            
            display.textContent = operacionCompleta
            displayResult.textContent =  resultado
            
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

    return "ERROR"

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
        return "ERROR"
    }
    let result = a / b

    return result.toFixed(2)
}

