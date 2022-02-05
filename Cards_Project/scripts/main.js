const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const deck = getDeck()
const shuffled_deck = shuffle(deck)




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
    return deck.pop();
}

console.log(deck)
console.log(shuffled_deck)