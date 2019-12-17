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

        isNumber(data) ? numberHandler(data) : operationHandler(data)
        
    }
    function numberHandler(data){
        _input = _input + data ;
        _viewInput = _viewInput + data;
        render();
    }
    function operationHandler(data){
        createNumber(); 

        var routes = {
            'Clear'    : clear,
            'Backspace': backSpace,
            'Enter'    : enter,
        };

        var handler = routes[data] || signHandler;
        handler(data);       
    }
    function createNumber() {
        if(_input === '') return ;
        _model.push(parseFloat(_input));
        _input = '';
    }
    function signHandler(data){
        if(isLastElementSign()){
            _model[_model.length - 1] = data;
            _viewInput = _viewInput.slice(0, -1) + data;
            render();
            return;
        }
        _model.push(data);
        _viewInput = _viewInput + data;
        render(); 
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
        var validData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '*', '-', '+', '.','Backspace', 'Enter'];

        if (validData.indexOf(data) !== -1) return data;
    }
    function enter(){
        console.log(_model);
    }
    function render(){
        _viewInput ? view.render(_viewInput): view.render('0');
    }
    function isNumber(data){
        var value = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(data);
        return value == -1 ? false : true;    
    }
    function isSign(data){
        var value = ['+', '-', '/', '*'].indexOf(data);
        return value == -1 ? false : true; 
    }
    function isLastElementSign(){
        return isSign(_model[_model.length - 1]);
    }
}();