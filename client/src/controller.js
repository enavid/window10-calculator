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
        console.log(_model);
    }
}();