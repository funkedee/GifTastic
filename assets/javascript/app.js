var animals = ["otter", "seahorse", "penguin", "chameleon", "albatross", "giraffe", "wolf", "harpy eagle", "tiger", "octopus", "cuttlefish", "bird of paradise", "stingray", "jellyfish", "anaconda", "lion", "markhor", "gazelle", "gibbon", "tamarin", "bonobo", "ibex", "tortoise", "basilisk", "okapi", "baboon", "pufferfish", "cowfish", "iguana"]

// make and display animal buttons
var renderButtons = function () {
    $("#button-display").empty();
    $(animals).each(function (i) {
        var animalButton = $("<button>");
        animalButton.attr("class", "animal_button");
        animalButton.append(animals[i]);
        $("#button-display").append(animalButton);
    });
};
renderButtons();

// when you click an animal button
$(document.body).on("click", ".animal_button", function () {

    // display text
    $("#gif-text").text("Click a GIF to play/pause, it might take a second");

    // make query url
    var animal = $(this).text();
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=2MG8I5MdFF9U3zAxxRtyaDi6AWV1Sc4r&q=" + animal + "&limit=10";

    // make ajax call
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        // make animal div
        var animalDiv = $("<div class= 'animal_div'>");

        // for each div
        $(response.data).each(function (i) {

            // make gif  div
            var gifDiv = $("<div class= 'gif_div'>");

            // append rating and gifs to gif div
            gifDiv.append("<img src= '" + response.data[i].images.fixed_height_still.url + "' data-still= '" + response.data[i].images.fixed_height_still.url + "' data-animate= '" + response.data[i].images.fixed_height.url + "' data-state= 'still' class= 'gif'>")
            gifDiv.append("<p>Rating: " + response.data[i].rating + "</p>");
            animalDiv.append(gifDiv);
        });

        // display gif and rating
        $("#gif-display").prepend(animalDiv);
    });
});

// play pause function
var playPauseGif = function (state, gif) {
    $(gif).attr("src", $(gif).attr("data-" + state));
    $(gif).attr("data-state", state);
};

// when you click on a gif, play pause gif
$(document.body).on("click", ".gif", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        playPauseGif('animate', this);
    }
    else {
        playPauseGif('still', this)
    }

});

// when you click submit
$("#submit").on("click", function () {
    event.preventDefault();

    if ($("#new-animal").val().trim() !== "") {
        // add input to animals
        animals.push($("#new-animal").val().trim());
        renderButtons();

        // reset form
        $("#new-animal").val("");
    };
});
