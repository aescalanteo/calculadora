Calculadora = (function () {

    var teclas = document.getElementsByClassName('tecla');
    var display = document.getElementById('display');
    var firstNumber;
    var secondNumber;
    var operator;

    var shrink = function (event) {
        event.target.style.transform = 'scale(0.85,0.85)';
    }

    var expand = function (event) {
        event.target.removeAttribute("style");
    }

    var clearDisplay = function () {
        display.textContent = 0;
    }

    handleTecla = function (tecla) {
        if (isEightOrLess()) {
            var displayNow = display.textContent;
            if (displayNow === '0') {
                display.textContent = tecla;
            } else {
                display.textContent = displayNow + tecla;
            }
        }
    }

    handlePunto = function () {
        if (isEightOrLess()) {
            var displayNow = display.textContent;
            if (!displayNow.includes('.')) {
                display.textContent = displayNow + '.';
            }
        }
    }

    handleSign = function () {
        var displayNow = display.textContent;
        if (displayNow !== '0') {
            if (displayNow.charAt(0) === '-') {
                display.textContent = displayNow.substr(1);
            } else {
                display.textContent = '-' + displayNow;
            }
        }
    }

    isEightOrLess = function () {
        var displayNow = display.textContent;
        return (displayNow.length < 8)
    }

    handleOperation = function (tecla) {
        firstNumber = parseFloat(display.textContent);
        operator = tecla;
        clearDisplay();
    }

    operate = function () {
        var result;
        secondNumber = parseFloat(display.textContent);
        if (firstNumber) {
            switch (operator) {
                case 'mas':
                    result = firstNumber + secondNumber;
                    break;
                case 'menos':
                    result = firstNumber - secondNumber;
                    break;
                case 'por':
                    result = firstNumber * secondNumber;
                    break;
                case 'dividido':
                    result = firstNumber / secondNumber;
                    break;
            }
            return result;
        }
        return '0';
    }

    var updateDisplay = function (event) {
        var tecla = event.target.id;
        console.log(tecla);

        if (!isNaN(tecla)) {
            handleTecla(tecla);
        } else {
            switch (tecla) {
                case 'on':
                    clearDisplay();
                    firstNumber = null;
                    secondNumber = null;
                    operator = null;
                    break;
                case 'punto':
                    handlePunto();
                    break;
                case 'sign':
                    handleSign();
                    break;
                case 'mas':
                case 'menos':
                case 'por':
                case 'dividido':
                    handleOperation(tecla);
                    break;
                case 'igual':
                    display.textContent = operate();
                    break;
                default:
                    break;
            }
        }
    }

    return {
        setOnClickToTeclas: function () {
            for (var i = 0; i < teclas.length; i++) {
                teclas[i].onmousedown = shrink;
                teclas[i].onmouseup = expand;
                teclas[i].onclick = updateDisplay;
            }
        },


    }
})();

Calculadora.setOnClickToTeclas();