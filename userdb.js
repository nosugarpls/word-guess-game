/*
An array storing all registered users.
*/
const users = ["Ashley", "Jacob"];

function find(username) {
    if(!username) return false;
    for(let i = 0; i < users.length; i++) {
        if(username === users[i]) {
            return true;
        }
    }
    return false;
}

function add(username) {
    users.push(username);
}

const userdb = {
  users,
  find,
  add
};

module.exports = userdb;

