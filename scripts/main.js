const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
let cardsDealt = new Array();
let dealerCards = new Array();
let decision = false;
let playerHand = 0;
let dealerHand = 0;
const deck = getDeck()
const shuffled_deck = shuffle(deck)
// const card = dealCard(shuffled_deck)



function stand() {
    if (cardsDealt.length >= 2){
        const button = document.getElementById("newcard")
        button.disabled = true;
    }else {
        return;
    }
    
}


function getDeck()
{
    let deck = new Array();

    for (let i = 0; i< suits.length; i++)
    {
        for (let x = 0; x < values.length; x++)
        {
            let card = {Value: values[x], Suit: suits[i]};
            deck.push(card);
        }
    }

    return deck
}

function shuffle(deck)
{
    // this will take the value and deep copy the value into another variable
    // "Deep Copying" is taking the variable and copying the whole value into another variable with the orginail not being refrenced at all Ex: const shuffled_deck = JSON.parse(JSON.stringify(deck));
    // "Shallow Copying" Takes the variable and assigns the value to two variables and if you change one the other will be changed also" Ex: let x = {Name: Joe}; let y = x
    const shuffled_deck = JSON.parse(JSON.stringify(deck));

    // for 1000 turns
    // switch the values of two random cards
    for (let i=0; i < 1000; i++){
        let location1 = Math.floor((Math.random() * shuffled_deck.length));
        let location2 = Math.floor((Math.random() * shuffled_deck.length));
        let tmp = shuffled_deck[location1];

        shuffled_deck[location1] = shuffled_deck[location2];
        shuffled_deck[location2] = tmp;
    }


    return shuffled_deck
}

function dealCard(deck){
    const card = deck.pop();
    cardsDealt.push(card);
    console.log(cardsDealt)
    renderDealtCards(cardsDealt);
    return card;
}

function grabCard(deck) {
    random_card = Math.floor((Math.random() * shuffled_deck.length));
    return shuffled_deck[random_card]
}

function showCard() {
    const card = grabCard(shuffled_deck)
    renderCard(card);
    console.log("I was executed!");
    document.getElementById("card").innerHTML = `Your card number was:${card.Value} and the suit was:${card.Suit}`;
}


function dealPlayerCard() {
    const dealtCard = dealCard(shuffled_deck)
    const dealerCard = addDealerCards(shuffled_deck)
    const value = playerDeckValue(cardsDealt)
    const dealerValue = dealerDeckValue(dealerCards)
    // renderDealtCards(dealtCard) // renderCard(dealtCard)
    document.getElementById("dealtcard").innerHTML = `Your card number was:${dealtCard.Value} and the suit was:${dealtCard.Suit}`;
}


function renderCard(card) {
    document.getElementById("deck").innerHTML = "";

    let card1 = document.createElement("div");
    let value1 = document.createElement("div");
    let suit1 = document.createElement("div");

    card1.className = "card";
    value1.className = "value";
    suit1.className = "suit " + card.Suit;

    value1.innerHTML = card.Value;
    card1.appendChild(value1);
    card1.appendChild(suit1);

    document.getElementById("deck").appendChild(card1);
}

function renderDealtCards(array) {
    document.getElementById("deck").innerHTML = "";

    for (i=0; i < array.length; i++)
    {
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");

        card.className = "card";
        value.className = "value";
        suit.className = "suit " + array[i].Suit;

        value.innerHTML = array[i].Value;
        card.appendChild(value);
        card.appendChild(suit);

        document.getElementById("deck").appendChild(card);
    }
}

function renderDealerCards(array) {
    document.getElementById("dealer").innerHTML = "";

    for (i=0; i < array.length; i++)
    {
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");

        card.className = "card";
        value.className = "value";
        suit.className = "suit " + array[i].Suit;

        value.innerHTML = array[i].Value;
        card.appendChild(value);
        card.appendChild(suit);

        document.getElementById("dealer").appendChild(card);
    }
}

function addDealerCards(deck)
{
    if (dealerCards.length < 2 || decision === true) {
        const card = deck.pop();
        dealerCards.push(card);
        renderDealerCards(dealerCards)
        console.log(dealerCards);
        return card;
    } else if(dealerCards.length >= 2) {
        return;
    }
    
}

function playerDeckValue(deck)
{
    let aces = 0;
    let value = 0;
    for (let i = 0; i < cardsDealt.length; i++ ) {
        console.log(`The number the of aces ${aces}`)
        let number = cardsDealt[i].Value;
        console.log(`I am the number being added ${number}`)
        if (number === "K" || number === "Q" || number === "J" ) {
            number = 10;
        } else if (number === "A") {
            number = 11;
            aces += 1
        }else {
            number = parseInt(number)
        }
        
        value += number;
        console.log(value)
        console.log(`The number the of aces ${aces}`)
        if (value > 21 && aces === 1) {
            value -= 10;
        } else if (value > 21 && aces === 2) {
            value -= 20;
        }else if (value > 21 && aces === 3) {
            value -= 30;
        }else if (value > 21 && aces === 4) {
            value -= 40;
        }
        if (value === 21){
            stand()
            document.getElementById("card").innerHTML = "BLACKJACK!!!!!"
        }

        console.log(`I am the value ${value}`);
        
        

        playerHand = value;
        document.getElementById("playervalue").innerHTML = `Your Cards: ${playerHand}`;
        console.log(`I am the players hand Value: ${playerHand}`);
        if(value > 21) {
            document.getElementById("card").innerHTML = "BUSTED!!!!!"
            stand()
        }
    }
    
    
    // cardsDealt[i].Value // cardsDealt[i].Suit
    // return added Cards
}
function dealerDeckValue(deck)
{
    let aces = 0;
    let value = 0;
    for (let i = 0; i < dealerCards.length; i++ ) {
        
        let number = dealerCards[i].Value;
        console.log(`I am the number being added ${number}`)
        if (number === "K" || number === "Q" || number === "J" ) {
            number = 10;
        } else if (number === "A") {
            number = 11;
            aces += 1
        }else {
            number = parseInt(number)
        }
        value += number;
        if (value > 21 && aces === 1) {
            value -= 10;
        } else if (value > 21 && aces === 2) {
            value -= 20;
        }else if (value > 21 && aces === 3) {
            value -= 30;
        }else if (value > 21 && aces === 4) {
            value -= 40;
        }
        console.log(`I am the value ${value}`);
        dealerHand = value;
        document.getElementById("dealervalue").innerHTML = `Dealers Cards: ${dealerHand}`;
        console.log(`I am the dealers hand Value: ${dealerHand}`);
        
    }


// console.log(deck)
// console.log(shuffled_deck)
}