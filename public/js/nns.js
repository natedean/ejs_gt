var noteMap = {
    A : ["A","B","C#","D","E","F#","G#"],
    Bb : ["Bb","C","D","Eb","F","G","A"],
    B :  ["B","C#","D#","E","F#","G#","A#"],
    C :  ["C","D","E","F","G","A","B"],
    Db : ["Db","Eb","F","Gb","Ab","Bb","C"],
    D :  ["D","E","F#","G","A","B","C#"],
    Eb : ["Eb","F","G","Ab","Bb","C","D"],
    E :  ["E","F#","G#","A","B","C#","D#"],
    F :  ["F","G","A","Bb","C","D","E"],
    Gb : ["Gb","Ab","Bb","Cb","Db","Eb","F"],
    G :  ["G","A","B","C","D","E","F#"],
    Ab : ["Ab","Bb","C","Db","Eb","F","G"]
};

var eKeyOptions = document.querySelectorAll('#numberPatterns .dropdown-content li a');
var eNumbers = document.querySelectorAll('.number');
var eKey = document.querySelector('#key');

function clickHandler(e) {
    var key = e.target.getAttribute('value');
    eKey.textContent = key;

    renderValues(key);
}

function animateNumber(eNumber) {
    eNumber.style.transition = 'none';
    eNumber.style.transform = 'scale(0)';

    setTimeout(function(){
        eNumber.style.transition = 'all 0.4s';
        eNumber.style.transform = 'scale(1)';
    }, 50);
}

function renderValues(key) {
    [].forEach.call(eNumbers, function(eNumber){
        var num = eNumber.getAttribute('value');
        eNumber.textContent = noteMap[key][num - 1];
        animateNumber(eNumber);
    });
}

[].forEach.call(eKeyOptions, function(eKeyOption){
    eKeyOption.addEventListener('click', clickHandler); // assign click
});

