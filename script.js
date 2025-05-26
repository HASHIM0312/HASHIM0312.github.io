function getQuote() {
  const apiUrl = "https://api.quotable.io/quotes/random?maxLength=50";
  const quoteElem = document.getElementById("quote");

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const quote = data[0].content;
      const author = data[0].author;
      quoteElem.innerHTML = `"${quote}"' - author;
    })
    .catch(error => {
      quoteElem.innerHTML = "Could not load quote. Please try again later." + error;
      console.error("Quote fetch error:", error);
    });
}

/* Update the quote every 5 minutes */
getQuote(); // Initial call to fetch a quote
setInterval(() => {
  getQuote();
  console.log("Quote updated");
}, 5 * 60 * 1000); // every 5 minutes