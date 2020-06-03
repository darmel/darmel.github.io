var snd = new Audio("../audio/pop.mp3"); 
snd.play();
var sonidoAcierto = new Audio("../audio/acierto.mp3"); 
var aplausos = new Audio("../audio/jua.mp3"); 

	

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

var matchingGame = {};
matchingGame.deck = ['carta01', 'carta01','carta02', 'carta02','carta03', 'carta03','carta04', 'carta04','carta05', 'carta05','carta06', 'carta06','carta07', 'carta07','carta08', 'carta08','carta09', 'carta09','carta10', 'carta10'];

$(function(){
	  init();
});

function init() {
					uiComplete.hide();
					uiCards.hide();
					playGame = false;
					uiPlay.click(function(e) {
						e.preventDefault();
						uiIntro.hide();
						startGame();
					});
				
					uiReset.click(function(e) {
						e.preventDefault();
						uiComplete.hide();					
						reStartGame();
					});
			}

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
							uiCards.children().each(function(index) {
								$(this).css({
									"left" : ($(this).width() + 6) * (index % 4),
									"top" : ($(this).height() + 6) * Math.floor(index / 4)
								});
								var pattern = matchingGame.deck.pop();
								$(this).find(".back").addClass(pattern);
								$(this).attr("data-pattern",pattern);
								$(this).click(selectCard);
																$(this).click(snd.play());

							});											 
				   	timer();
				};			   
			  }


function timer() {
				if (playGame) {
					scoreTimeout = setTimeout(function() {
						uiScore.html(++score + " segundos");		
						timer();
					}, 1000);
				};
		};

function shuffle() {
	return 0.5 - Math.random();
}

function selectCard() {
	if ($(".card-flipped").size() > 1) {
	return;
	}
	$(this).addClass("card-flipped");
	if ($(".card-flipped").size() == 2) {
	setTimeout(checkPattern,700);
}
	snd.play();
}

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

function isMatchPattern() {
	var cards = $(".card-flipped");
	var pattern = $(cards[0]).data("pattern");
	var anotherPattern = $(cards[1]).data("pattern");
	return (pattern == anotherPattern);
}

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

function reStartGame(){
				playGame = false;
				uiCards.html("<div class='card'><div class='face front'></div><div class='face back'></div></div>");
				clearTimeout(scoreTimeout);
matchingGame.deck = ['carta01', 'carta01','carta02', 'carta02','carta03', 'carta03','carta04', 'carta04','carta05', 'carta05','carta06', 'carta06','carta07', 'carta07','carta08', 'carta08','carta09', 'carta09','carta10', 'carta10'];
	startGame();
			}
				