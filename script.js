const maxElements = 5;
let quoteArray = [];

class quoteClass {
  constructor(quote, author){
    this.quote = quote;
    this.author = author;
  }
}

//TO DO: Error 404, cannot fetch the quote

function getQuote(index) {
  
  const apiUrl = "https://api.quotable.io/quotes/random?maxLength=50";
  

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const quote = data[0].content;
      const author = data[0].author;
      
      const newQuote = new quoteClass(quote, author);
      return newQuote;
    })
    .catch(error => {

        const quoteElem = document.getElementById("quote");
      quoteElem.innerHTML = "Could not load quote. Please try again later." + error;
      console.error("Quote fetch error:", error);
    });
}

function populateQuoteArray(newQuote){
  quoteArray.push(newQuote);
  if (quoteArray.length > maxElements){
    quoteArray.shift();
  }
}

function UpdateHTMLQuote(index){
  const quoteElem = document.getElementById("quote");
  quoteElem.innerHTML = quoteArray[index].quote + " - " +  quoteArray[index].author;
}


let index = 0;
getQuote().then(newQuote => 
{
  populateQuoteArray(newQuote);
  UpdateHTMLQuote(index);
}
);



function onLeftClick() {
    if (index != 0){
        index--;
    }

    UpdateHTMLQuote(index);
}

function onRightClick() {
    index++;
    if (index >= quoteArray.length){
        getQuote().then(newQuote => 
{
  populateQuoteArray(newQuote);
  index = quoteArray.length - 1;
  UpdateHTMLQuote(index);
}
);

    }
    else{
      UpdateHTMLQuote(index);
    }

}