// Create an array of tv show names
let topics = ["Silicon Valley","The Simpsons","The Office","The League","Freaks and Geeks","Stranger Things"];

$(document).ready(function() {

// Create a loop to cycle through the topics array
    for (var i = 0; i < topics.length; i++) {
        // Generate buttons for each movie
        let gif = $("<button>");
        gif.attr("data-name" , topics[i]);
        gif.attr("data-state");
        gif.text(topics[i]);
        gif.addClass("tvShow");
        $("#buttons").append(gif);
    }

    // Click function to grab images 
     $("button").on("click", function() {
      let show = $(this).text();
      let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        show + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(show);

        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            let results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
          
                let rating = results[i].rating;
                let p = $("<p>").text("Rating: " + rating);
                let stillGif = $("<img>");
                let animateGif = $("<img>");
                let showName = show;

                //assignment of properties to still gif img
                stillGif.attr("src", results[i].images.original_still.url, );
                stillGif.attr("data-state", "still");
                stillGif.addClass("tvShowStill");
                stillGif.attr("show-name", showName);
                stillGif.attr("gif-ID", "still" + showName + i);
                stillGif.attr("pic-nmbr", i);

                //assignment of properties to animated gif img 
                animateGif.attr("src", results[i].images.original.url, );
                animateGif.attr("data-state", "animate");
                animateGif.addClass("tvShowAnimate");
                animateGif.attr("show-name", showName);
                animateGif.attr("gif-ID", "animate" + showName + i);
                animateGif.attr("pic-nmbr", i);
                animateGif.css({ display: "none" });

                //append to gifs div
                stillGif.prepend(p);
                $("#gifs").prepend(stillGif, animateGif);          
                console.log(animateGif.attr("src"));                  
            }

        });
     });

    /*ADDED BY JH:******************************************************************************
    Becasue gifs are dynamically added, they are NOT in the hard coded HTML of the index page,
    and you can not bind an event such as onlcick directly to them. Event delegation must be used, and
    this method allows you to bind a click event to a parent container (body, in the case below), 
    and define which child element to use - one function for tvShowStill class elements, 
    and another for the animated gifs.
    *******************************************************************************************/

    $("body").on("click", "img.tvShowStill", function () {

        let showName = $(this).attr("show-name");
        let picNum = $(this).attr("pic-nmbr");

        $(this).fadeOut("fast", function () {
            $("[gif-ID='animate" + showName + picNum + "']").fadeIn("fast");
        });
        
    });

    //TODO: add in another event handler like one above to handle clicks on the img.tvShowAnimate gifs
    
});