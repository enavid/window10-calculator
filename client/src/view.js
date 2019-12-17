const displayText = document.getElementById('display-text');
const buttons = document.getElementById('keyboard-buttons');

var view = function () {

    return {
        init,
    }
    //=======================Initialize=============================

    function init({inputFilter}) {

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

    //=======================Functions=============================

    function writeToDisplay(data) {
        displayText.innerHTML = data;
    }

    
}();
