var deck = $(".deck");
var card1;
var card2;
// create an array to hold open cards
var openCards = [];

/*
 * Create a list that holds all of your cards
 */
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

//  Deal Function
function deal(cards){
    // deal all the cards needed
    for (i=0; i < cards.length; i++) {
        deck.append('<li class ="card"><i class ="fa fa-' + cards[i] + '"></i></li>');
    }
}

// Shuffle and Deal two sets of cards
// shuffle(cards);
deal(cards);
// shuffle(cards);
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

function areBothCardsTheSame(){
    if(openCards[0] === openCards[1]){
        return true;
    } else{
        return false;
    }
}

$(".card").on("click", function() {
    
    if(openCards.length == 0 ){
        card1 = this;
        openAndShow($(this));
        var faClass = $(this).find("i").attr("class");
        addtoList(faClass);

    } else if (openCards.length == 1 ){
        card2 = this;
        openAndShow($(this));
        var faClass = $(this).find("i").attr("class");
        addtoList(faClass);
        matchOrClose(card1, card2, className = faClass.slice(3));
        clearOpenCardsArray();
        
    } else {
        // addtoList(faClass);
        console.log('third click');
        // (openCards.length < 2) && (openCards[0] != openCards[1]);
        
        // $(this).removeClass("show"); 
        // $(this).addClass("no-match"); 
       };
       

});

function openAndShow(card) {
    card.toggleClass("open");
    card.toggleClass("show");
};

function addtoList(card){
    openCards.push(card.slice(6));
}

function matchOrClose(card1, card2, faClass){
    // if they do not match, shake and close them
    if(openCards[0] != openCards[1]){

        $(card1).addClass("no-match").addClass("animated headShake");
        $(card2).addClass("no-match").addClass("animated headShake");


        setTimeout(function(){
            $(card1).removeClass("open show no-match");
            $(card2).removeClass("open show no-match");
        },1000);

        return;
    }

    // they match, so show match
    $('.' + faClass).parent().removeClass("show"); 
    $('.' + faClass).parent().removeClass("animated headShake"); 
    $('.' + faClass).parent().addClass("match animated bounce");

};

function clearOpenCardsArray(){
    openCards = [];
}

//increment the move counter and desplay on page
var counter = 0;
    
$(document).ready(function() {

    $(".card").click(function(){
        counter++;


        $(".moves").text(counter);
    });

});

//reset

$(".restart").click(function(){
    $(".card").removeClass("open show match no-match animated bounce headshake");
    counter = 0;
    $(".moves").text(counter);
});




//display a message with final score when the cards have matched



