require('dotenv').config()
const EXPRESS = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = EXPRESS();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(EXPRESS.static("public"));
//creates a connection to the mySQL database
let connection = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });


app.get('/', (req, res) => {
  // find number of users
  const query = 'SELECT COUNT(*) AS count FROM users';
  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    const numUsers = results[0].count;
    // Respond with total
    res.render('home', { numUsers });
  })
})

app.post('/register', (req, res) => {
  // creates a new person with the provided email
  let person = { email: req.body.email };
  // inserts the person into the users setting values to be matching
  connection.query('INSERT INTO users SET ?', person, (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
})


app.listen(8000, () => {
  console.log("App is listening on 8000");
})