/* 
A map storing gameid-data pair.
Each key-value pair follows the schema:
gameid: {
    username: login username,
    answer: a secret word,
    turns: count of valid turns  
    history: [
        guess1#countMatch1,  
        guess2#countMatch2,
        guess3#countMatch3,
        invalid guess,
        guess4#countMatch4,
        ...
    ]
} 
*/
const answers = {};

function add(gameid, data) {
    answers[gameid] = data;
}

function update(gameid, data) {
    if(!answers[gameid]) {
        return;
    }
    answers[gameid] = data;
}

function isValidId(gameid) {
    if(!answers[gameid]) {
        return false;
    }
    return true;
}

const answerdb = {
    answers,
    add,
    update,
    isValidId
}

module.exports = answerdb;