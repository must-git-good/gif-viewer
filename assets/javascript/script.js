//

var topics = ["Cats", "Dogs", "Monkeys"];

var input = null;
var userInput = topics[(topics.length - 1)];


for (var j = 0; j < topics.length; j++) {
    var newBootstrapAccordion = '<div class="card" id="cardnum-' + j + '"><div class="card-header" id=' + j + '><h5 class="mb-0"><button id=' + topics[j] + ' class="btn btn-link collapsed accordion-btn" type="button" data-toggle="collapse" data-target="#collapse' + j + '" aria-expanded="false" aria-controls="collapse' + j + '">' + topics[j] + ' </button></h5></div><div id="collapse' + j + '"class="collapse" aria-labelledby="heading"' + j + ' data-parent="#accordionHolder"><div class="card-body"><div class="gif-content" id="gif-"></div></div></div></div></div>'

    $("#accordionHolder").append(newBootstrapAccordion);

};


var pushAccordion = function () {
    for (var j = 0; j < topics.length; j++) {
        var newBootstrapAccordion = '<div class="card" id="cardnum-' + j + '"><div class="card-header" id=' + j + '><h5 class="mb-0"><button id=' + topics[j] + ' class="btn btn-link collapsed accordion-btn" type="button" data-toggle="collapse" data-target="#collapse' + j + '" aria-expanded="false" aria-controls="collapse' + j + '">' + topics[j] + ' </button></h5></div><div id="collapse' + j + '"class="collapse" aria-labelledby="heading"' + j + ' data-parent="#accordionHolder"><div class="card-body"><div class="gif-content" id="gif-"></div></div></div></div></div>'

        $("#accordionHolder").append(newBootstrapAccordion);

    }; // end of accordion populate for-loop
}




var inputCheck = function () {
    if (topics.includes(userInput)) {
        alert("That's already listed!");
    } if (userInput === "") {
        alert("Please enter a search term.");
    } else if ((topics.includes(userInput) === false) && (userInput !== "")) {
        topics.push(userInput);
    }
};


$(document).on("click", ".accordion-btn", function () {
    console.log("I clicked the ACCORDION.")
    console.log(this);
    console.log(this.id);

    var searchTerm = this.id;
    resultsAmount = 10;
    var urlQuery = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=kFmrkggeHb0rVjSwBsYc3fImxxJKPqWA&limit=" + resultsAmount;

    $.ajax({
        url: urlQuery,
        method: "GET",
    }).then(function (apiData) {
        var data = apiData.data;

        for (var i = 0; i < data.length; i++) {
            if (data[i].rating !== "r") {
                var gifHolder = $("<div class='item'>");
                var rating = data[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var image = $("<img>");
                image.attr({
                    "class": "gif",
                    "id": i,
                    "src": data[i].images.fixed_height_small_still.url,
                    "move-src": data[i].images.fixed_height_small.url,
                    "static-src": data[i].images.fixed_height_small_still.url,
                    "data-state": "still",
                });
                gifHolder.html("");
                gifHolder.append(image);
                gifHolder.append(p);
                $(".gif-content").prepend(gifHolder);

            }
        }

    });    //end of 'then' section

});



// changes the moving/still state of my gif images
$(".gif").val(this).on("click", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log(this);
    console.log($(".gif"));
    console.log($(".gif").val());
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("move-src"));
        $(this).attr("data-state", "move");
    } else {
        $(this).attr("src", $(this).attr("static-src"));
        $(this).attr("data-state", "still");
    }
}); //end of statechange



$("#the-search-button").on("click", function () {
    event.preventDefault();
    userInput = $("input").val();
    inputCheck();
    $("#accordionHolder").text("");
    pushAccordion();
    console.log(userInput);
    console.log(topics);
});


