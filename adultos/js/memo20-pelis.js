var snd = new Audio("../audio/pop.mp3"); // buffers automatically when created
snd.play();
var sonidoAcierto = new Audio("../audio/acierto.mp3"); 
var aplausos = new Audio("../audio/jua.mp3"); 

	

//create all the variables
var score;
var cardsmatched;

var ui = $("#gameUI");
var uiIntro = $("#gameIntro");
var uiStats = $("#gameStats");
var uiComplete = $("#gameComplete");
var uiCards= $("#cards");
var uiReset = $(".gameReset");
var uiScore = $(".gameScore");
var uiPlay = $("#gamePlay");
var uiTimer = $("#timer");

//create deck array
var matchingGame = {};
matchingGame.deck = ['carta01', 'carta01','carta02', 'carta02','carta03', 'carta03','carta04', 'carta04','carta05', 'carta05','carta06', 'carta06','carta07', 'carta07','carta08', 'carta08', 'carta09', 'carta09','carta10', 'carta10'];

//on document load the lazy way
$(function(){
	  init();
});

//initialise game
function init() {
					uiComplete.hide();
					uiCards.hide();
					playGame = false;
					uiPlay.click(function(e) {
						e.preventDefault();
						uiIntro.hide();
						startGame();
						snd.play();
					});
				
					uiReset.click(function(e) {
						e.preventDefault();
						uiComplete.hide();					
						reStartGame();
						snd.play();
					});
			}

//start game and create cards from deck array
function startGame(){
				uiTimer.show();
				uiScore.html("0 segundos");
				uiStats.show();
				uiCards.show();
				score = 0;
				cardsmatched = 0;
			   	if (playGame == false) {
			   			playGame = true;
						matchingGame.deck.sort(shuffle);
					//ACA VA UNO MENOS QUE LA CANTIDAD DE CARTAS
						for(var i=0;i<19;i++){
								$(".card:first-child").clone().appendTo("#cards");
							}
							// initialize each card's position
							uiCards.children().each(function(index) {
								// align the cards to be 3x6 ourselves.
								$(this).css({
									"left" : ($(this).width() + 10) * (index % 4),
									"top" : ($(this).height() + 10) * Math.floor(index / 4)
								});
								// get a pattern from the shuffled deck
								var pattern = matchingGame.deck.pop();
								// visually apply the pattern on the card's back side.
								$(this).find(".back").addClass(pattern);
								// embed the pattern data into the DOM element.
								$(this).attr("data-pattern",pattern);
								// listen the click event on each card DIV element.
								$(this).click(selectCard);
																$(this).click(snd.play());

							});											 
				   	timer();
				};			   
			  }


//timer for game
function timer() {
				//alert("timer set")
				if (playGame) {
					scoreTimeout = setTimeout(function() {
						uiScore.html(++score + " segundos");		
						timer();
					}, 1000);
				};
		};

//shuffle cards
function shuffle() {
	return 0.5 - Math.random();
}

//onclick function add flip class and then check to see if cards are the same
function selectCard() {
	// we do nothing if there are already two cards flipped.
	if ($(".card-flipped").size() > 1) {
	return;
	}
	$(this).addClass("card-flipped");
	// check the pattern of both flipped card 0.7s later.
	if ($(".card-flipped").size() == 2) {
	setTimeout(checkPattern,700);
}
	snd.play();
}

//if pattern is same remove cards otherwise flip back
function checkPattern() {
	if (isMatchPattern()) {
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
			if(document.webkitTransitionEnd){
				$(".card-removed").bind("webkitTransitionEnd",	removeTookCards);
			}else{
				removeTookCards();
					sonidoAcierto.play();

			}
		} else {
		$(".card-flipped").removeClass("card-flipped");
			
	}
}

//put 2 flipped cards in an array then check the image to see if it's the same.
function isMatchPattern() {
	var cards = $(".card-flipped");
	var pattern = $(cards[0]).data("pattern");
	var anotherPattern = $(cards[1]).data("pattern");
	return (pattern == anotherPattern);
}

//check to see if all cardmatched variable is less than 8 if so remove card only otherwise remove card and end game 
// ACA VA UN NUMERO MENOS QUE LA CANTIDAD DE PARES
function removeTookCards() {
	if (cardsmatched < 9){
		cardsmatched++;
		$(".card-removed").remove();
	}else{
		$(".card-removed").remove();
			aplausos.play();

		uiCards.hide();
		uiComplete.show();
		clearTimeout(scoreTimeout);

	}	
}

//recreate the original card , stop the timer and re populate the array with class names
function reStartGame(){
				playGame = false;
				uiCards.html("<div class='card'><div class='face front'></div><div class='face back'></div></div>");
				clearTimeout(scoreTimeout);
matchingGame.deck = ['carta01', 'carta01','carta02', 'carta02','carta03', 'carta03','carta04', 'carta04','carta05', 'carta05','carta06', 'carta06','carta07', 'carta07','carta08', 'carta08', 'carta09', 'carta09','carta10', 'carta10'];

	startGame();
			}
				