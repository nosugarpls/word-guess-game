const PORT = 3000;

const express = require("express");
const wordList = require("./words");
const answerdb = require("./answerdb");
const userdb = require("./userdb");
const gameWeb = require("./game-web");
const compare = require("./compare");
const uuidv4 = require("uuid").v4;
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('./public'));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/howtoplay", (req, res) => {
    res.sendFile(__dirname + "/howtoplay.html");
});

app.get("/congrats", (req, res) => {
    res.sendFile(__dirname + "/congrats.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html");
})

.post("/register", (req, res) => {
    const username = req.body.username;
    if(username.length === 0 || userdb.find(username)) {
        res.redirect("/register-failure");
    } else {
        userdb.add(username);
        res.redirect("/login");
    }
});

app.get("/register-failure", (req, res) => {
    res.sendFile(__dirname + "/register-failure.html");
})
  
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
})

.post("/login", (req, res) => {
    const username = req.body.username;
    if(userdb.find(username)) {
        // auth success
        const gameid = uuidv4();
        res.cookie("gameid", gameid, {maxAge: 1000000000});

        const randomIndex = Math.floor(Math.random() * wordList.length);
        const answer = wordList[randomIndex];
        const data = { username: username,
                       answer: answer,
                       turns: 0,
                       history: []
                     };
        answerdb.add(gameid, data);
        console.log("The secret word is " + answer + "; gameid: " + gameid);
        res.redirect("/game");
    } else {
        res.redirect("/login-failure");
    }
});

app.get("/login-failure", (req, res) => {
    res.sendFile(__dirname + "/login-failure.html");
})

app.get("/game", (req, res) => {
    const gameid = req.cookies.gameid;
    if(!gameid || !answerdb.isValidId(gameid)) { 
        res.clearCookie("gameid");
        res.sendStatus(401);
        return;
    }
    const data = answerdb.answers[gameid];
    res.send(gameWeb.gamePage(wordList, data));
})

.post("/game", (req, res) => {
    const guess = req.body.guess;
    const gameid = req.cookies.gameid;
    if(!gameid || !answerdb.isValidId(gameid)) { 
        res.clearCookie("gameid");
        res.sendStatus(401);
        return;
    }
      
    const data = answerdb.answers[gameid];
    let isValidGuess = false;
    const length = wordList.length;
    for(let i = 0; i < length; i++) {
        if(wordList[i].toLowerCase() === guess.toLowerCase()) {
            isValidGuess = true;
            break;
        }
    }    
    if(!isValidGuess) {
        data.history.push("invalid guess");
        answerdb.update(gameid, data);
        res.redirect("/game");
        return;
    }

    const answer = data.answer;
    if(guess.toLowerCase() === answer.toLowerCase()) {
        res.clearCookie("gameid");
        res.redirect("./congrats");
    } else {
        const countMatch = compare(answer, guess);
        data.history.push(guess + "#" + countMatch + "letter(s) matched");
        data.turns++;
        answerdb.update(gameid, data);
        res.redirect("/game");
    }
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
