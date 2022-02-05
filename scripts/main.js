const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
let cardsDealt = new Array();
const deck = getDeck()
const shuffled_deck = shuffle(deck)
// const card = dealCard(shuffled_deck)




function getDeck()
{
    let deck = new Array();

    for (let i =0; i< suits.length; i++)
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
    const card = shuffled_deck.pop();
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
    const dealtCard = dealCard(shuffled_deck,cardsDealt)
    renderCard(dealtCard)
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




// console.log(deck)
// console.log(shuffled_deck)