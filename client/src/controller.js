var controller = function(){

    return {
        init,
    }
    //=======================Initialize=============================
    function init(){
        view.init({inputFilter,});
    }

    //=======================Functions=============================

    function inputHandler(){

    }
    function inputFilter(data) {
        var validData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '*', '-', '+'];
        if (validData.indexOf(data) !== -1) {
            return data;
        }
    }
}();