// JavaScript version of the Console War Game.
// CU CSP

//Funciton to create the original deck

function createOfficialDeck() {
    const theDECK = [
        // Hearts
        ['A-H', 1], ['2-H', 2], ['3-H', 3], ['4-H', 4], ['5-H', 5], ['6-H', 6], ['7-H', 7], ['8-H', 8], ['9-H', 9], ['10-H', 10], ['J-H', 11],
        ['Q-H', 12], ['K-H', 13],
        // Spades
        ['A-S', 1], ['2-S', 2], ['3-S', 3], ['4-S', 4], ['5-S', 5], ['6-S', 6], ['7-S', 7], ['8-S', 8], ['9-S', 9], ['10-S', 10], ['J-S', 11],
        ['Q-S', 12], ['K-S', 13],
        // Diamonds
        ['A-D', 1], ['2-D', 2], ['3-D', 3], ['4-D', 4], ['5-D', 5], ['6-D', 6], ['7-D', 7], ['8-D', 8], ['9-D', 9], ['10-D', 10], ['J-D', 11],
        ['Q-D', 12], ['K-D', 13],
        // Clubs
        ['A-C', 1], ['2-C', 2], ['3-C', 3], ['4-C', 4], ['5-C', 5], ['6-C', 6], ['7-C', 7], ['8-C', 8], ['9-C', 9], ['10-C', 10], ['J-C', 11],
        ['Q-C', 12], ['K-C', 13]
        ];
    return theDECK
}

//The below function shuffles a deck of cards

function shuffleDeck(deck) {
    var funcDeck = deck; //Make the deck a variable
    var shuffledDeck = []; //Empty deck
    //The below while loop will run until the original deck is empty.
    while (funcDeck.length != 0) {
        var rand = Math.floor(Math.random() * funcDeck.length); //it then chooses a number at random between 1 and the length of the deck
        shuffledDeck.push(funcDeck[rand]); //It puts the random card in the shuffled deck
        funcDeck.splice(rand, 1); //It finally removes the card from the original deck
    };
    return shuffledDeck
};

//splitDecks takes a deck of cards and splits it into two decks of 26 cards

function splitDecks(deck) {
    var deckOne = deck;
    var deckTwo = deckOne.splice(26,26);
    return [deckOne, deckTwo];
};

//The compareFunc is a core gameplay funciton. It will compare two drawn cards, 
//and return who has the larger of  the two values. If there is a tie, it will 
//then draw four more cards, and return who has the largest final card drwan.

function compareFunc(p1Card, p2Card, currentPot, p1Deck, p2Deck) {
    var p1FuncCard = p1Card[0][1]
    var p2FuncCard = p2Card[0][1]
    if (p1FuncCard > p2FuncCard) {
        var winner = "p1";
        return [winner, currentPot, p1Deck, p2Deck];
    } else if (p1FuncCard < p2FuncCard) {
        var winner = "p2";
        return [winner, currentPot, p1Deck, p2Deck];
    } else if (p1FuncCard == p2FuncCard) {
        if (p1Deck.length >= 5 && p2Deck.length >= 5){
            for (i = 0; i < 3; i++) {
                currentPot.push(p1Deck.splice(0,1));
                currentPot.push(p2Deck.splice(0,1));
            }
            var test1 = p1Deck.length
            var test2 = p2Deck.length
            var p1Card2 = p1Deck.slice(0,1);
            var p2Card2 = p2Deck.slice(0,1);
            var test1 = p1Deck.length
            var test2 = p2Deck.length
            p1Deck = p1Deck.slice(1, (p1Deck.length));
            p2Deck = p2Deck.slice(1, (p2Deck.length));
            currentPot.push(p1Card2);
            currentPot.push(p2Card2);
            var result = compareFunc(p1Card2, p2Card2, currentPot, p1Deck, p2Deck);
        } else {
            if (p1Deck.length > p2Deck.length) {
                var shorterListLen = p2Deck.length;
            } else {
                var shorterListLen = p1Deck.length;
            }
            if (shorterListLen == 0) {
                if (p1Deck.length > p2Deck.length) {
                    var winner = "p1";
                    return [winner, currentPot, p1Deck, p2Deck]
                } else {
                    var winner = "p2";
                    return [winner, currentPot, p1Deck, p2Deck]
                }
            } else if (shorterListLen == 1) {
                var p1Card2 = p1Deck.slice(0,1);
                var p2Card2 = p2Deck.slice(0,1);
                currentPot.push(p1Card2);
                currentPot.push(p2Card2);
                p1Deck = p1Deck.slice(1, p1Deck.length)
                p2Deck = p2Deck.slice(1, p2Deck.length)
                var result = compareFunc(p1Card2, p2Card2, currentPot, p1Deck, p2Deck);
            } else {
                for (i = 0; i < shorterListLen-1; i++) {
                    currentPot.push(p1Deck.splice(0,1));
                    currentPot.push(p2Deck.splice(0,1));
                }
                var p1Card2 = p1Deck.slice(0,1);
                var p2Card2 = p2Deck.slice(0,1);
                currentPot.push(p1Card2);
                currentPot.push(p2Card2);
                var result = compareFunc(p1Card2, p2Card2, currentPot, p1Deck, p2Deck);
            }
        }
    }
    var winner = result[0];
    var currentPot = result[1];
    var finalP1Deck = result[2];
    var finalP2Deck = result[3];
    return [winner, currentPot, finalP1Deck, finalP2Deck];
}

var warMaster = '';
var count = 0;


//The playGame function is the core gameplay loop of the game. It gets takes in input
//of the players decks, and then will draw two cards and send them to the compare function.
//It then gets the winner from the compare function, and then gives the pot of cards to the 
//winner. If both players still have cards, the loop restarts.

function playGame(p1Deck, p2Deck) {
    while (p1Deck.length != 0 || p2Deck.length != 0) {
        if (count >= 5000) {
            warMaster = 'tie';
            return;
        }
        if (p2Deck.length == 0) {
            warMaster = 'p1';
            return;
        } else if (p1Deck.length == 0) {
            warMaster = 'p2';
            return;
        }
        count = count + 1;
        var currentPot = [];
		
        var p1Card = p1Deck.slice(0, 1);
        p1Deck = p1Deck.slice(1, (p1Deck.length));
		
        var p2Card = p2Deck.slice(0, 1);
        p2Deck = p2Deck.slice(1, (p2Deck.length));
		
        currentPot.push(p1Card);
        currentPot.push(p2Card);
		
        var result = compareFunc(p1Card, p2Card, currentPot, p1Deck, p2Deck);

        var winner = result[0];
        currentPot = result[1];
        p1Deck = result[2];
        p2Deck = result[3];
		
        //currentPot = shuffleDeck(currentPot);
        if (winner == "p1") {
            for (i = 0; i < currentPot.length; i++) {
                p1Deck.push(currentPot[i][0]);
            }
        } else {
            for (i = 0; i < currentPot.length; i++) {
                p2Deck.push(currentPot[i][0]);
            }
        }
        if(p1Deck.length > 52 || p2Deck.length > 52 || (p1Deck.length + p2Deck.length) > 52 ) {
            if (p1Deck.length > p2Deck.length) {
                var longerList = "p1";
            } else {
                var longerList = "p2";
            }
            if(longerList == "p1") {
                while((p1Deck.length + p2Deck.length) > 52 )
                    p1Deck = p1Deck.splice(0, p1Deck.length-1)
            } else {
                while((p1Deck.length + p2Deck.length) > 52 )
                    p2Deck = p2Deck.splice(0, p2Deck.length-1)
            }
        }
        loadGameResults(p1Card, p1Deck, p2Card, p2Deck, winner);
    }
}

const gameResults = [];
function loadGameResults(p1Card, p1Deck, p2Card, p2Deck, winner) {
	gameResults.push([p1Card, p1Deck, p2Card, p2Deck, winner]);
}

function setupGame() {
	var officialDeck = createOfficialDeck();
	var shuffDeck = shuffleDeck(officialDeck);
	var sDecks = splitDecks(shuffDeck);
	var playerOneDeck = sDecks[0];	
	var playerTwoDeck = sDecks[1];
	playGame(playerOneDeck, playerTwoDeck);
}

// FRONT END FUNCTIONS

function displayGame(gameResults, round, playerName) {
	assignCardInfo(gameResults[round][0], 'p1');
	assignDeckInfo(gameResults[round][1], 'p1');
	assignCardInfo(gameResults[round][2], 'p2');
	assignDeckInfo(gameResults[round][3], 'p2');
	displayRoundWinner(gameResults[round][4], playerName);
}

// Gives card name and image to player hand div container
function assignCardInfo(card, id){
	document.getElementById(id + 'Hand').style.visibility = 'visible';
	document.getElementById(id + 'CurrentCard').src=assignCardImageLocation(card);
	document.getElementById(id + 'CardName').innerHTML = assignCardImageName(card);
}

// Gives card image file location
function assignCardImageLocation(card){
	var cardName = card[0][0];
	var cardImageLocation = './static/images/' + cardName + '.jpg';
	return cardImageLocation;
}

// Gives card image name		
function assignCardImageName(card){
	var cardName = card[0][0];
	var cardValue = card[0][1];
	var suit = cardName[cardName.length - 1];
	if (suit == 'C'){
		suit = 'Swords';
	} else if (suit == 'D'){
		suit = 'Wands';
	} else if (suit == 'H'){
		suit = 'Stars';
	} else if (suit == 'S'){
		suit = 'Shields';
	} else {
		suit = 'Error: No card suit detected.';
	}
	
	if ((cardValue > 1) && (cardValue < 11)){
		cardValue = cardValue.toString();
	} else if (cardValue == 1){
		cardValue = 'Ace';
	} else if (cardValue == 11){
		cardValue = 'Jack';
	} else if (cardValue == 12){
		cardValue = 'Queen';
	} else if (cardValue == 13){
		cardValue = 'King';
	} else {
		cardValue = 'Error: No card value detected.';
	}
	var imageName = cardValue + ' of ' + suit;
	return imageName;
}

// sets player and deck info to deck div
function assignDeckInfo(deck, id){
	document.getElementById(id + 'DeckDiv').style.visibility = 'visible';
	document.getElementById(id + 'DeckImage').src=assignDeckImageLocation(deck);;
	document.getElementById(id + 'CardCount').innerHTML = assignDeckCardCount(deck);
}

// Gives deck image file location -- yet to implement
function assignDeckImageLocation(deck){
	var deckSize = Object.keys(deck).length;
	var filePath = './static/images/';
	if (deckSize == 0) {
		filePath = filePath + 'emptyDeck.jpg';
	} else if ((deckSize >= 1) && (deckSize <= 9)){
		filePath = filePath + 'deck1-9.jpg';
	} else if ((deckSize >= 10) && (deckSize <= 18)){
		filePath = filePath + 'deck10-18.jpg';
	} else if ((deckSize >= 19) && (deckSize <= 27)){
		filePath = filePath + 'deck19-27.jpg';
	} else if ((deckSize >= 28) && (deckSize <= 36)){
		filePath = filePath + 'deck28-36.jpg';
	} else if ((deckSize >= 37) && (deckSize <= 45)){
		filePath = filePath + 'deck37-45.jpg';
	} else {
		filePath = filePath + 'deck46-54.jpg';
	}
	return filePath	
}

// Gives deck image name from count of cards
function assignDeckCardCount(deck){
	var cardsInDeck = Object.keys(deck).length;
	if (cardsInDeck == 1){
		return cardsInDeck + ' Card';
	} else {
		return cardsInDeck + ' Cards';
	}
}

// Chages display of game control buttons
function alterPlayButtons(){
	document.getElementById('playButton').style.visibility = 'hidden';
	document.getElementById('nextButton').style.visibility = 'visible';
	document.getElementById('fastForwardButton').style.visibility = 'visible';
}

// displays winner of each round in the winnerflag div
function displayRoundWinner(id, playerName){
	if (id == 'p1'){
		document.getElementById(id + 'WinnerFlag').innerHTML = playerName + " has won this Round!!!";
	} else if (id == 'p2'){
		document.getElementById(id + 'WinnerFlag').innerHTML = "The Computer has won this Round!!!";
	}
	document.getElementById(id + 'WinnerFlag').style.visibility = 'visible';
}

// clears the winner flag div
function clearRoundWinner(id){
	document.getElementById(id + 'WinnerFlag').style.visibility = 'hidden';
}

// Clears board and displays the winner
function displayGameWinner(id, playerName){
	if (id == 'p1'){
		document.getElementById('p1WinnerFlag').innerHTML = playerName + " has won the game!!!";
        clearRoundWinner('p2');
	} else if (id == 'p2'){
		document.getElementById('p2WinnerFlag').innerHTML = "The Computer has won the game!!!";
        clearRoundWinner('p1');
	} else {
		document.getElementById('winningPlayer').innerHTML = "Over 5000 rounds were played. This game has ended in a draw!!!";
        document.getElementById('winningPlayer').style.visibility = 'visible';
        clearRoundWinner('p1');
        clearRoundWinner('p2');
	}
    document.getElementById(id + 'WinnerFlag').style.visibility = 'visible';
}

// sets player name variable
function setPlayerName(){
	return document.getElementById('playerName').value;
}

document.querySelector('#restartGame')
	.addEventListener('click', function(){
	window.location=('index.html');
});
document.querySelector('#gitSource')
	.addEventListener('click', function(){
	window.open('https://github.com/rodu4835/CSPB_3308_Team_3');
});
document.querySelector('#about')
	.addEventListener('click', function(){
	window.location=('devInfo.html');
});

var playerName = '';
document.querySelector('#playButton')
	.addEventListener('click', function(){
    playerName = setPlayerName();
	if (!playerName) {
		document.getElementById('playerName').placeholder='Please Enter Your Name!';
		return;
	} else {
		alterPlayButtons();
		setupGame();
		displayGame(gameResults, 0, playerName);
		document.getElementById('playerName').style.visibility = 'hidden';
	}
});

var round = 0;
document.querySelector('#nextButton')
	.addEventListener('click', function(){
	clearRoundWinner('p1');
	clearRoundWinner('p2');
	round = round + 1;
	displayGame(gameResults, round, playerName);
	if (round == Object.keys(gameResults).length - 1) {
		displayGameWinner(warMaster, playerName);
		document.getElementById('nextButton').style.visibility = 'hidden';
		document.getElementById('fastForwardButton').style.visibility = 'hidden';
	}
});

document.querySelector('#fastForwardButton')
	.addEventListener('click', function(){
	document.getElementById('nextButton').style.visibility = 'hidden';
    document.getElementById('fastForwardButton').style.visibility = 'hidden';
	displayGame(gameResults, Object.keys(gameResults).length - 1, playerName);
    displayGameWinner(warMaster, playerName);
});










