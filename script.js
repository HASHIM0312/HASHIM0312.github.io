function getQuote() {
  const apiUrl = "https://api.quotable.io/quotes/random?maxLength=50";

  fetch(apiUrl)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const quote = data[0].content;
      const author = data[0].author;
      document.getElementById("quote").innerHTML = `"${quote} - ${author}"`;
    });
}

/* Update the quote every 5 minutes */
getQuote(); // Initial call to fetch a quote
setInterval(() => {
  getQuote();
  console.log("Quote updated");
  
},  5 * 60 * 1000); //every 5 minutes 

