class Users {
    constructor(fName, lName, age, occupation) {
        this.fName = fName;
        this.lName = lName;
        this.age = age;
        this.occupation = occupation;
    };
}


const user_1 = new Users('Manuel', 'Ortiz', 22, 'MMA Fighter');
const user_2 = new Users('Jim', 'San', 42, 'Plumer');
const user_3 = new Users('Eddie', 'Hall', 32, 'Strongman');
const user_4 = new Users('Ricardo', 'Arjona', 62, 'Singer');
const user_5 = new Users('Alfredo', 'Smith', 82, 'Survivor');

const users_array = [user_1, user_2, user_3, user_4, user_5]

var express = require('express');
var app = express();

app.get('/users', (req, res) => {
    console.log('Incoming ' + req.method + ' request........');
    res.send(JSON.stringify(users_array));
    res.end();
});


app.put('/users/users.json', (req, res) => {
   console.log('Incoming ' + req.method + ' request..........');
   var user_6 = new Users('Alex', 'Clark', 34, 'programmer');
   users_array.push(user_6);
   res.send('User created.');
   res.end(); 
});

app.listen(3000, (err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('Listening at port 3000........');
})