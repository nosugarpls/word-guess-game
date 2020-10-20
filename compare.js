/* 
Compare 2 words of the same length 
and return the count of common letters
regardless of case and position.
*/
function compare( word, guess ) {  
  const length = word.length;
  const lowerWord= word.toLowerCase();
  const lowerGuess = guess.toLowerCase();
  let wordCount = [];
  let guessCount = [];
  for(let index = 0; index < 26; index++) {
    wordCount.push(0); 
    guessCount.push(0);
  }

  for(let index = 0; index < length; index++) {
    wordCount[lowerWord.charCodeAt(index) - 97]++;
    guessCount[lowerGuess.charCodeAt(index) - 97]++;
  }
  let countCommon = 0;
  for(let index = 0; index < 26; index++) {
    countCommon += Math.min(wordCount[index], guessCount[index]);
  }
  return countCommon; 
}

module.exports = compare; 