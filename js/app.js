$(document).ready(function() {
    var card1;
    var card2;
    var matchCount = 0;
    var moveCounter = 0;
    var starCount = 3;
    var deck = $(".deck");
    var timerStart = Date.now();
    var timerEnd;
    var totalSeconds = 0;
    var timer;

    // Create an array to hold open cards
    var openCards = [];

    // Create a list that holds all of the cards
    var cards = [
        "diamond",
        "plane",
        "anchor",
        "bolt",
        "cube",
        "leaf",
        "bicycle",
        "bomb"
    ]

    /*
    * Display the cards on the page
    *   - shuffle the list of cards using the provided "shuffle" method below
    *   - loop through each card and create its HTML
    *   - add each card's HTML to the page
    */

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    // Deal Function
    function deal(cards){
        // Deal all the cards needed
        for (i=0; i < cards.length; i++) {
            deck.append('<li class ="card"><i class ="fa fa-' + cards[i] + '"></i></li>');
        }
    }

    // Shuffle and Deal two sets of cards
    shuffle(cards);
    deal(cards);
    shuffle(cards);
    deal(cards);

    /*
    * set up the event listener for a card. If a card is clicked:
    *  - display the card's symbol (put this functionality in another function that you call from this one)
    *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    *  - if the list already has another card, check to see if the two cards match
    *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
    *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
    *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
    *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
    */

    // Add card1 and card2 to the empthy array
    $(".card").on("click", function() {
        checkForStarReduction();
        checkForStartCounter();
        if(openCards.length == 0 ) {
            card1 = this;
            openAndShow($(this));
            var faClass = $(this).find("i").attr("class");
            addtoList(faClass);
        }else{
            card2 = this;
            openAndShow($(this));
            var faClass = $(this).find("i").attr("class");
            addtoList(faClass);
            matchOrClose(card1, card2, className = faClass.slice(3));
            clearOpenCardsArray();
        }
    });

    function openAndShow(card) {
        card.toggleClass("open");
        card.toggleClass("show");
    };

    function addtoList(card) {
        openCards.push(card.slice(6));
    };

    function matchOrClose(card1, card2, faClass){
        // If they do not match, shake and close them
        if(openCards[0] != openCards[1]) {
            $(card1).addClass("no-match").addClass("animated headShake");
            $(card2).addClass("no-match").addClass("animated headShake");

            setTimeout(function() {
                $(card1).removeClass("open show no-match");
                $(card2).removeClass("open show no-match");
            }, 1000);
            return;
        }

        // They match, so show match
        $('.' + faClass).parent().removeClass("show"); 
        $('.' + faClass).parent().removeClass("animated headShake"); 
        $('.' + faClass).parent().addClass("match animated bounce");

        // Display a message with final score when the cards have matched
        matchCount++;
        if(matchCount == 8){
            $(".timer").remove();
            swal({
                title: "Congratulations! You won!",
                text: "MOVES: " + moveCounter + " -- STAR COUNT: " + starCount + " --  Seconds: " + totalSeconds,
                icon: "success",
                buttons:{
                    catch: {
                        text: "Reset",
                        value: "reset"
                      },
                      defeat: {
                          text: "Ok",
                          value: "ok"
                      }
                }
            }).then((value) => {
                switch (value) {
               
                  case "reset":
                    reset();
                    break;

                  case "ok":
                    break;
                }
              });
        };
    };

    function clearOpenCardsArray(){
        openCards = [];
    };

    function checkForStarReduction(){
        switch(moveCounter) {
            case 8:
                $(".stars li i").eq(0).removeClass("fa fa-star");
                $(".stars li i").eq(0).addClass("fa fa-star-o");
                starCount--;
                break;
            case 16:
                $(".stars li i").eq(1).removeClass("fa fa-star");
                $(".stars li i").eq(1).addClass("fa fa-star-o");
                starCount--;
                break;

        }
    };

    // Increment the move counter and display on page

    $(".card").click(function() {
        $(".moves").text(moveCounter);
        moveCounter++;
    });

    // Reset
    $(".restart").click(function() {
        reset();
    });

    function checkForStartCounter(){
        if(moveCounter == 0){
            $('body').prepend('<section><div class="timer"><label id="minutes">00</label>:<label id="seconds">00</label></div></section>')

            var minutesLabel = document.getElementById("minutes");
            var secondsLabel = document.getElementById("seconds");

            timer = setInterval(setTime, 1000);

            function setTime() {
                ++totalSeconds;
                secondsLabel.innerHTML = pad(totalSeconds % 60);
                minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
            };

            function pad(val) {
                var valString = val + "";
                if (valString.length < 2) {
                    return "0" + valString;
                } else {
                    return valString;
                    };
            };
        };
    };

    function reset(){
        $(".card").removeClass("open show match no-match animated bounce headshake");

            timerStart = Date.now();
            moveCounter = 0;
            matchCount = 0;
            totalSeconds = 0;
            starCount = 3;

            $(".stars li i").eq(1).removeClass("fa fa-star-o");
            $(".stars li i").eq(1).addClass("fa fa-star");
            $(".stars li i").eq(0).removeClass("fa fa-star-o");
            $(".stars li i").eq(0).addClass("fa fa-star");

            $(".moves").text(moveCounter);

            clearInterval(timer);
            $(".timer").remove();
    };


});
