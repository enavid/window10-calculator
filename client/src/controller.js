var controller = function () {
    var _input = '';
    var _viewInput = '';
    var _model = [];
    var _modelLenght = 0;


    return {
        init,
    }
    //=======================Initialize=============================
    function init() {
        view.init({ inputFilter, inputHandler });
    }

    //=======================Functions=============================

    // This function for input handler
    function inputHandler(data) {
        isNumber(data) ? numberHandler(data) : operationHandler(data)
    }
    function numberHandler(data) {
        _input = _input + data;
        _viewInput = _viewInput + data;
        createNumber();
        render();
    }
    function operationHandler(data) {
        createNumber('new');

        var routes = {
            'Clear': clear,
            'Enter': enter,
            'Backspace': backSpace,
        };

        var handler = routes[data] || signHandler;
        handler(data);
    }
    function createNumber(state = 'save number') {
        if (_input === '') return;

        ({
            'save number': (data) => { replaceLastItem(data) },
            'new': (data) => {
                addNumber(data);
                _input = '';
            }
        })[state](_input);


        console.log(_model);
    }
    function signHandler(data) {
        if (isLastElementSign()) {
            _model[_model.length - 1] = data;
            _viewInput = _viewInput.slice(0, -1) + data;
            render();
            return;
        }

        addSign(data);
        _viewInput = _viewInput + data;
        render();
    }
    function inputFilter(data) {
        var validData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '*', '-', '+', '.', 'Backspace', 'Enter'];

        if (validData.indexOf(data) !== -1) return data;
    }
    // This function for display
    function render() {
        _viewInput ? view.render(_viewInput) : view.render('0');
    }
    function clear() {
        _input = '';
        _viewInput = '';
        render();
    }
    function backSpace() {
        _input = _input.slice(0, -1);
        _viewInput = _viewInput.slice(0, -1);
        render()
    }
    // This function for check 
    function isNumber(data) {
        var value = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].indexOf(data);
        return value == -1 ? false : true;
    }
    function isSign(data) {
        var value = ['+', '-', '/', '*'].indexOf(data);
        return value == -1 ? false : true;
    }
    function isLastElementSign() {
        return isSign(_model[_model.length - 1]);
    }

    // This function for model
    function addNumber(data) {
        _model[_modelLenght] = parseFloat(data);
        _modelLenght = _modelLenght + 1;
    }
    function replaceLastItem(data) {
        _model[_modelLenght] = parseFloat(data);
    }
    function addSign(data) {
        _modelLenght = _modelLenght + 1;
        _model.push(data);
    }

    //This function for handle  math operation
    function enter() {
        console.log(calculater(_model));
    }
    function calculater(data) {
        var copyData = data.slice();

        if (signCheck(0)) {
            copyData.unshift(0);
        }
        if (signCheck(copyData.length - 1)) {
            copyData.push(0);
        }

        oneOperation(copyData);
        twoOperation(copyData);

        return copyData[0];

        function oneOperation(numArray) {

            var operation = ['+', '-'];
            var result;
            for (var i = 0; i < operation.length; i++) {
                result = process(detecter(operation[i], numArray));
                for (var j = 0; j < result.length; j++) {
                    numArray[result[j].id] = result[j].result;
                    removeNumber(result[j].number);
                }
            }
            function detecter(operator, dataArray) {
                var result = [];
                var data = {
                    number: '',
                    operator: '',
                    state: 'oneOperation',
                    id: 0,
                    result: 0,
                }
                for (var i = 0; i < dataArray.length; i++) {
                    if (dataArray[i] === operator) {
                        if ((operator === '+' || operator === '-') && i !== 0) continue; // need function
                        data.operator = operator;
                        if (dataArray[i + 1] !== undefined) {
                            data.number = dataArray[i + 1];
                        } else {
                            data.number = 0;
                        }
                        data.id = i;
                        result.push(data);
                    }
                }
                return result;
            }
            function process(dataArray) {
                for (var i = 0; i < dataArray.length; i++) {
                    switch (dataArray[i].operator) {
                        case '+':
                            dataArray[i].result = dataArray[i].number;
                            break
                        case '-':
                            dataArray[i].result = -1 * dataArray[i].number;
                            break
                    }
                }
                return dataArray;
            }
            function removeNumber(Item) {
                for (var i = 0; i < numArray.length; i++) {
                    if (numArray[i] === Item) {
                        numArray.splice(i, 1);
                        break;
                    }
                }
            }
        }
        function twoOperation(numArray) {

            do {
                let operation = ['*', '/', '+', '-'];
                for (var i = 0; i < operation.length; i = i + 2) {

                    var data = detecter(operation[i], operation[i + 1], numArray);
                    if (data) {
                        process(data);
                        numArray[data.id] = data.result;
                        removeNumber(data.firstNumber);
                        removeNumber(data.secondNumber);
                    }
                }
            } while (numArray.length > 1);

            function detecter(firstSign, secondSign, dataArray) {
                var data = {
                    firstNumber: 0,
                    secondNumber: 0,
                    operator: '',
                    result: 0,
                    id: 0,
                }
                var firstSignIndex = dataArray.indexOf(firstSign)
                var secondSignIndex = dataArray.indexOf(secondSign);

                if (firstSignIndex === -1 && secondSignIndex === -1) return false;
                if (indexValid(firstSignIndex, secondSignIndex)) {
                    data.firstNumber = dataArray[firstSignIndex - 1];
                    data.secondNumber = dataArray[firstSignIndex + 1];
                    data.operator = firstSign;
                    data.id = firstSignIndex;
                }
                else if (indexValid(secondSignIndex, firstSignIndex)) {
                    data.firstNumber = dataArray[secondSignIndex - 1];
                    data.secondNumber = dataArray[secondSignIndex + 1];
                    data.operator = secondSign;
                    data.id = secondSignIndex;
                }
                return data;
            }
            function process(data) {
                switch (data.operator) {
                    case '*':
                        data.result = data.firstNumber * data.secondNumber;
                        break;
                    case '/':
                        data.result = data.firstNumber / data.secondNumber;
                        break;
                    case '+':
                        data.result = data.firstNumber + data.secondNumber;
                        break;
                    case '-':
                        data.result = data.firstNumber - data.secondNumber;
                        break;
                }
            }
            function removeNumber(Item) {
                for (var i = 0; i < numArray.length; i++) {
                    if (numArray[i] === Item) {
                        numArray.splice(i, 1);
                        break;
                    }
                }
            }
            function indexValid(firstOptIndex, secondOptIndex) {
                return (firstOptIndex < secondOptIndex || secondOptIndex === -1) && firstOptIndex !== -1
            }
        }
        function signCheck(index) {
            var sign = ['*', '/', '+', '-'];
            if (sign.indexOf(copyData[index]) !== -1) {
                return true;
            }
            return false;
        }
    }
}();