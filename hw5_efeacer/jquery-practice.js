const FADE_OUT_TIME_INTERVAL = 1000;

function turnHeadingsRed() {
    $(":header").addClass("redElements");
}

function fadeItem() {
    $("#speakerHeading").fadeOut(FADE_OUT_TIME_INTERVAL);
}

$("#theRedButton").bind("click", turnHeadingsRed);
$("#theSpeakersButton").bind("click", fadeItem);
