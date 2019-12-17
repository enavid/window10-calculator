const displayText = document.getElementById('display-text');
const buttons = document.getElementById('keyboard-buttons');

var view = function () {

    return {
        init,
    }

    //========================================================

    function init() {
        // read web input
        buttons.onclick = (e) => {
            var data = e.target.getAttribute('value');
            writeToDisplay(data);
        };

        // read keyboard 
        document.addEventListener('keydown', (e) => {
            //e.preventDefault();
            var data = inputFilter(e.key);
            if (data == undefined) return;
            writeToDisplay(data);
        })

    }

    function writeToDisplay(data) {
        displayText.innerHTML = data;
    }

    function inputFilter(data) {
        var validData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '*', '-', '+'];
        if (validData.indexOf(data) !== -1) {
            return data;
        }
    }
}();
