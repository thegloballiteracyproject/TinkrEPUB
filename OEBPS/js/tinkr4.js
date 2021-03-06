 
var currentBathColor = ""; // holds the current bath and duck color
localStorage.setItem("duckColor", "white"); // we can intialize our local storage with the duck being white

// our audio for this page
var brownAudio = new Audio('audio/child_brown.mp3');
brownAudio.loop = false;
var orangeAudio = new Audio('audio/child_orange.mp3');
orangeAudio.loop = false;
var redAudio = new Audio('audio/child_red.mp3');
redAudio.loop = false;
var yellowAudio = new Audio('audio/child_yellow.mp3');
yellowAudio.loop = false;

// a RegEx for matching words to narrate based on their ID
var narrationWordMatch = new RegExp("^smil");

// our narration audio as a sprite
var narration = new Howl({
  src: ['audio/scene7_child_stanza.mp3'],
  sprite: {
    all: [0000, 9305],
    smil_p4w1: [0175, 0600],
    smil_p4w2: [0775, 0320],
    smil_p4w3: [1095, 0160],
    smil_p4w4: [1255, 1050],
    smil_p4w5: [2325, 0640],
    smil_p4w6: [2965, 0575],
    smil_p4w7: [3555, 0870],
    smil_p4w8: [4435, 0530],
    smil_p4w9: [4965, 0650],
    smil_p4w10: [5615, 1290],
    smil_p4w11: [6905, 0320],
    smil_p4w12: [7225, 0670],
    smil_p4w13: [7895, 0340],
    smil_p4w14: [8235, 1070]
  }

});

// our click listener
document.addEventListener('click', function(e) {
    var clickedElement = e.target.id;

    console.log(clickedElement);

    // change the bath color if the red or yellow leafs were selected
    if (clickedElement == "redLeaf") 
        changeBathColor("red");
    else if (clickedElement == "yellowLeaf")
        changeBathColor("yellow");
    // test to see if the clickedElement matches a word we should narrate
    else if (narrationWordMatch.test(clickedElement)) {
        playSoundAndChangeCSS(clickedElement);
    }
    else if (clickedElement == "readAloud")
        playAll(4, 14);
});

// for our iconomations-- show them when selected
function pg4MouseDown(word) {
    if (word.id == "smil_p4w8")
        document.getElementById("hidden_colors").style.visibility = "visible";
    else if (word.id == "smil_p4w9")
        document.getElementById("hidden_colors2").style.visibility = "visible";
    else if (word.id == "smil_p4w10")
        document.getElementById("hidden_colors3").style.visibility = "visible";
}

// also for our iconomations-- hide them when the word is no longer being interacted with
function pg4MouseUp(word) {
    if (word.id == "smil_p4w8")
        document.getElementById("hidden_colors").style.visibility = "hidden";
    else if (word.id == "smil_p4w9")
        document.getElementById("hidden_colors2").style.visibility = "hidden";
    else if (word.id == "smil_p4w10")
        document.getElementById("hidden_colors3").style.visibility = "hidden";
}


/* function to determine the color of the bath based on the current bath color
and what colored leaf was selected */
function changeBathColor(bathColor) {

    if (currentBathColor == "" && bathColor == "yellow") {
        document.getElementById("bathWater").style.background = "rgba(237, 245, 83, 0.7)";
        document.getElementById("duck_face2").style.background = "rgba(237, 245, 83, 0.7)";
        currentBathColor = "yellow";
        yellowAudio.play();
        localStorage.setItem("duckColor", "yellow");
        
    }
    else if (currentBathColor == "" && bathColor == "red") {
        document.getElementById("bathWater").style.background = "rgba(238, 34, 38, 0.7)";
        document.getElementById("duck_face2").style.background = "rgba(238, 34, 38, 0.7)";
        currentBathColor = "red";
        redAudio.play();
        localStorage.setItem("duckColor", "red");
    }
    else if (currentBathColor == "red" || currentBathColor == "yellow") {
        if ( (currentBathColor == "red" && bathColor == "yellow") || (currentBathColor == "yellow" && bathColor == "red") ) {
            document.getElementById("bathWater").style.background = "rgba(238, 154, 51, 0.7)";
            document.getElementById("duck_face2").style.background = "rgba(238, 154, 51, 0.7)";
            currentBathColor = "orange";
            orangeAudio.play();
            localStorage.setItem("duckColor", "orange");
        }
        else if (currentBathColor == "red" && bathColor == "red")
            redAudio.play();
        else if (currentBathColor == "yellow" && bathColor == "yellow")
            yellowAudio.play();
    }
    else if (currentBathColor == "orange") {
        document.getElementById("bathWater").style.background = "rgba(130, 81, 38, 0.7)";
        document.getElementById("duck_face2").style.background = "rgba(130, 81, 38, 0.7)";
        currentBathColor == "brown";
        brownAudio.play();
        localStorage.setItem("duckColor", "brown");
    }
    
}