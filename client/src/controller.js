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
        
        var routes = {
            'C': clear,
            'b': backSpace,

        }[data];

        if(routes){
            routes();
            return;
        } 

        var sign = ['+', '-', '*', '/'].indexOf(data);
       
        sign == -1 ? createStringNumber(data) : createNumber(data);

        _viewInput = _viewInput + data;
        render();

    }
    function createStringNumber(data) {
        _input = _input + data;
    }
    function createNumber(sign) {

        if (_input === '') {
            _model.push(sign);
        } else {
            _model.push(parseFloat(_input));
            _model.push(sign);
            _input = '';
        }
    }
    function clear(){
        _input = '' ;
        _viewInput = '';
        render();
    }
    function backSpace(){
        _input = _input.slice(0, -1);
        _viewInput = _viewInput.slice(0, -1);
        render()
    }
    function inputFilter(data) {
        var validData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '*', '-', '+', '.'];
        if (validData.indexOf(data) !== -1) {
            return data;
        }
    }
    function render(){
        _viewInput ? view.render(_viewInput): view.render('0');
    }
}();