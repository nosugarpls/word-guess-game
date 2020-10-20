const gameWeb = {
    gamePage: function(wordList, data) {
      return `
      <!doctype html>
      <html>
      <head>
          <title>Word Guess Game Page</title>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet">     
          <link rel="stylesheet" href="/static/game.css" />
      </head>
      <body>
      
          <!-- Scrollable Word List -->
          <h3>⛳️ Pick a guess from the following word list.</h3>
          <div class="container">
            <ul class="word-list">` + 
            wordList.map( word => `
                <li class="word-item">${word}</li>
            `).join('') + `    
            </ul>
          </div>
          
          <!-- Form to submit a guess to "/game" route -->
          <form action="/game" method="POST">
              <input placeholder="Enter Your Guess" type="text" name="guess">
              <button class="try-btn" type="submit">Try</button>
          </form>
      
          <!-- Show count of valid guess and all history guess -->
          <div class="history-guess">
              <h3>${data.turns} turns taken by now</h3>
              <h3>Guess History</h3>
              <div class="container">
                <ol class="guess-list">` +
                data.history.map( item => `
                    <li class="guess-item">${item}</li>
                `).join('') + `
                </ol>
              </div>
          </div>
          <a class="go-home" href="/" role="button">Go Home</a>

      </body>
      <footer>
          <p>Copyright ⓒ 2020</p>
      </footer>
      </html>
    `;
    },
};
  
module.exports = gameWeb;
  