const displayText = document.getElementById('display-text');
const buttons = document.getElementById('keyboard-buttons')

// read web input
buttons.onclick = (e) => {
    console.log(e.target.getAttribute('value'));
};

// read keyboard 
document.addEventListener('keydown',(e) =>{
   //e.preventDefault();
    console.log(e.key)

})