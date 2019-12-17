var controller = function () {
    var _input = '';
    var _viewInput = '';
    var _model = [];


    return {
        init,
    }
    //=======================Initialize=============================
    function init() {
        view.init({ inputFilter, inputHandler });
    }

    //=======================Functions=============================

    function inputHandler(data) {
        var sign = ['+', '-', '*', '/'];
        var result = sign.indexOf(data);

        result == -1 ?  createStringNumber(data) : createNumber(sign[result]);  
        
        _viewInput = _viewInput + data ;
        view.writeToDisplay(_viewInput);

    }
    function createStringNumber(data) {
        _input = _input + data;
    }
    function createNumber(sign) {

        if(_input === ''){
            _model.push(sign);
        }else{
            _model.push(parseFloat(_input));
            _model.push(sign);
            _input = '';
        }
    }
    function inputFilter(data) {
        var validData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '*', '-', '+', '.'];
        if (validData.indexOf(data) !== -1) {
            return data;
        }
    }
}();