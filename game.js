const h1 = $("h1")
const dom = $(document)
const colors = ["red", "blue", "green", "yellow"]

var pattern = []
var clickedButtons = []
var level = 0
var started = false

Swal.fire({
    title: 'Hi!',
    text: 'lower the volume a bit cause our game sounds are loud',
    imageUrl: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
})

dom.keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        sequence();
        started = true;
    }
});

function clicking(color) {
    $("#" + color).addClass("pressed")
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
    var aud = new Audio("sounds/" + color + ".mp3");
    aud.play();
}


$(".btn").click(function () {
    clickedButtons.push($(this).attr('id'));
    clicking($(this).attr('id'));
    checking(clickedButtons.length - 1);
})



function checking(currlevel) {
    if (pattern[currlevel] === clickedButtons[currlevel]) {
        if (clickedButtons.length === pattern.length) {
            setTimeout(function () {
                sequence();
            }, 800);
        }
    } else {
        var aud = new Audio("sounds/wrong.mp3");
        aud.play();
        $("body").addClass("game-over")
        h1.text("Game Over Press any key to start over")
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 500);

        gameOver()
    }
}


function sequence() {
    clickedButtons = [];
    level++;
    var rnd = Math.floor(Math.random() * 4);
    clicking(colors[rnd]);
    pattern.push(colors[rnd]);

    h1.text("Level " + level);
}


function gameOver() {
    started = false
    pattern = []
    level = 0
}