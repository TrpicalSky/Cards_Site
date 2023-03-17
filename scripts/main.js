const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
let cardsDealt = new Array();
let dealerCards = new Array();
let decision = false;
let playerHand = 0;
let dealerHand = 0;
let playerBusted = false;
let dealerBusted = false;
const deck = getDeck()
const shuffled_deck = shuffle(deck)
// const card = dealCard(shuffled_deck)

// REMINDER FIX ACES BREAKING VALUE AFTER ONE BEING ADDED AND THEN ANOTHER CARD BEING ADDED BREAKS VALUE (Half Fixed)


function restartFunc() {
    let newDeck = getDeck();
    let newShuffledDeck = shuffle(newDeck);
    cardsDealt = [];
    dealerCards = [];
    playerBusted = false;
    dealerBusted = false;
    playerHand = 0;
    dealerHand = 0;
    decision = false;
    document.getElementById("deck").innerHTML = "";
    document.getElementById("dealer").innerHTML = "";
    document.getElementById("playervalue").innerHTML = `Your Cards: ${playerHand}`;
    document.getElementById("dealervalue").innerHTML = `Your Cards: ${dealerHand}`;
    let newCardButton = document.getElementById("newcard");
    document.getElementById("card").innerHTML = "";
    let standButton = document.getElementById("stand");
    newCardButton.disabled = false;
    standButton.disabled = false;

}


function afterStand() {
    while(dealerHand < 17) {
        const dealerValue = dealerDeckValue(dealerCards)
        const card = deck.pop();
        dealerCards.push(card);
        renderDealerCards(dealerCards)
        console.log(dealerCards);
    }
    if (dealerHand > playerHand && dealerBusted !== true) {
        document.getElementById("card").innerHTML = "Dealer has a Bigger hand. You LOSE!!!!!"
    } else if (dealerHand < playerHand) {
        document.getElementById("card").innerHTML = "Dealer has a smaller hand. You WINNNNN!!!"
    } else if (dealerHand === playerHand) {
        document.getElementById("card").innerHTML = "YOU TIE!!!!"
    }
}

function stand() {
    if (decision) {
        afterStand();
    }
    
}

function Buttonstand() {
    if (cardsDealt.length >= 2){
        const button = document.getElementById("newcard")
        const standButton = document.getElementById("stand");
        standButton.disabled = true;
        button.disabled = true;
        decision = true;
        afterStand();
    //     if (decision) {
    //         afterStand()
    //     }
    // }else {
    //     return;
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
    if (dealerCards.length < 2 ) {
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
    if (!playerBusted) {
        let removed = false;
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
        // if (value > 21 && aces === 1) {
        //     value -= 10;
        // } else if (value > 21 && aces === 2) {
        //     value -= 20;
        // }else if (value > 21 && aces === 3) {
        //     value -= 30;
        // }else if (value > 21 && aces === 4) {
        //     value -= 40;
        // }
        playerHand = value;
        document.getElementById("playervalue").innerHTML = `Your Cards: ${playerHand}`;
        if (value === 21){
            Buttonstand()
            document.getElementById("card").innerHTML = "BLACKJACK!!!!!"
            return;
        }

        console.log(`I am the value ${value}`);
        
        

        // playerHand = value;
        // document.getElementById("playervalue").innerHTML = `Your Cards: ${playerHand}`;
        console.log(`I am the players hand Value: ${playerHand}`);
        console.log(`The Value for the Player is ${value}`)
        
    }
    if(value > 21){
        if(aces > 0 && removed === false) {
            console.log("Removed More 10")
            removed = true;
            value -= 10
            playerHand -=10
            document.getElementById("playervalue").innerHTML = `Your Cards: ${playerHand}`;
        } else if(value > 21) {
        const button = document.getElementById("newcard")
        const standButton = document.getElementById("stand")
        standButton.disabled = true;
        button.disabled = true;
        playerBusted = true;
        document.getElementById("card").innerHTML = "BUSTED!!!!!"
        stand()
    }
    }
    
    
    // cardsDealt[i].Value // cardsDealt[i].Suit
    // return added Cards
}
}
function dealerDeckValue(deck)
{
    if (!dealerBusted) {
        let removed = false;
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
        // if (value > 21 && aces === 1) {
        //     value -= 10;
        // } else if (value > 21 && aces === 2) {
        //     value -= 20;
        // }else if (value > 21 && aces === 3) {
        //     value -= 30;
        // }else if (value > 21 && aces === 4) {
        //     value -= 40;
        // }
        console.log(`I am the value ${value}`);
        dealerHand = value;
        document.getElementById("dealervalue").innerHTML = `Dealers Cards: ${dealerHand}`;
        console.log(`I am the dealers hand Value: ${dealerHand}`);
        if (value === 21){
            stand()
            document.getElementById("card").innerHTML = "You lost the dealer hit a blackjack"
            return;
        }
        
        if(value > 21){
            if(aces > 0 && removed === false) {
                console.log("Removed More 10")
                removed = true;
                value -= 10
                dealerHand -=10
                document.getElementById("playervalue").innerHTML = `Your Cards: ${dealerHand}`;
            } else if(value > 21) {
            document.getElementById("card").innerHTML = "Dealer Busted You WINNNNN!!!"
            document.getElementById("dealervalue").innerHTML = `Dealers Cards : ${dealerValue}`
            busted = true;
            // stand()
        }
    
    }
    // if(aces > 0 && removed === false) {
    //     console.log("Removed More 10")
    //     removed = true;
    //     value -= 10
    //     playerHand -=10
    //     document.getElementById("playervalue").innerHTML = `Your Cards: ${playerHand}`;
    // }
    // if(value > 21) {
    //     document.getElementById("card").innerHTML = "Dealer Busted You WINNNNN!!!"
    //     stand()
    // }
    

// console.log(deck)
// console.log(shuffled_deck)
    }
}
}