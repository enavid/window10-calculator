const displayText = document.getElementById('display-text');
const buttons = document.getElementById('keyboard-buttons');

// read web input
buttons.onclick = (e) => {
    var data = e.target.getAttribute('value');
    writeToDisplay(data) ;
};

// read keyboard 
document.addEventListener('keydown',(e) =>{
   //e.preventDefault();
    var data = e.key;
    writeToDisplay(data);

})

function writeToDisplay(data){
    displayText.innerHTML = data;
}