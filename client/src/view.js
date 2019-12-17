const displayText = document.getElementById('display-text');
const buttons = document.getElementById('keyboard-buttons');

var view = function () {
    var _listeners = {};

    return {
        init,
        writeToDisplay,
    }
    //=======================Initialize=============================

    function init({inputFilter, inputHandler}) {


        // read web input
        buttons.onclick = (e) => {
            var data = e.target.getAttribute('value');
            inputHandler(data);
        };

        // read keyboard input
        document.addEventListener('keydown', (e) => {
            //e.preventDefault();
            var data = inputFilter(e.key);
            if (data == undefined) return;
            inputHandler(data);
        })
    }

    //=======================Functions=============================

    function writeToDisplay(data) {
        displayText.innerHTML = data;
    }

    
}();
