var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');

var restaurant;

var connection = mysql.createConnection({
  host: 'cis550project.chvnr3kzizz0.us-east-1.rds.amazonaws.com',
  user: 'cis550project',
  password: 'cis550projectkey',
  port: '1521',
  database: 'cis550project',
});

connection.connect(function(err) {
  if (err) {
    console.log("Error Connection to DB" + err);
    return;
  }
  console.log("Connection established...");
});

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
});

router.get('/search', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'search.html'));
});
router.get('/result', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'result.html'));
});
<<<<<<< HEAD
=======

>>>>>>> 9f34e0c51029c820abe1d8f741ebbdabfefd284b

router.get('/recommend', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'recommend.html'));
});
router.get('/contact', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'contact.html'));
});



router.get('/posters', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'posters.html'));
});
// To add a new page, use the templete below
/*
router.get('/routeName', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'fileName.html'));
});
*/

// Login uses POST request
router.post('/login', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username

  var query = "INSERT IGNORE INTO User VALUES ('"+req.body.username+"','"+req.body.password+"');"; /* Write your query here and uncomment line 21 in javascripts/app.js*/
  connection.query(query, function(err, rows, fields) {
    console.log(req.body.username);
    // console.log("rows", rows);
    // console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success'
      });
    }
  });
});

router.post('/search', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username
  // var query = "SELECT * FROM Business WHERE business_name = ('"+req.body.restaurantname+"');"; /* Write your query here and uncomment line 21 in javascripts/app.js*/
  // connection.query(query, function(err, rows, fields) {
  //   console.log(req.body.restaurantname);
  //   // console.log("fields", fields);
  //   if (err) console.log('error: ', err);
  //   else {
  //     res.json({
  //       result: 'success'
  //     });
  //   }
  // });
  restaurant = req.body.restaurantname;
  res.json({
    result: 'success'
  });
});

router.post('/result', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username
  var query = "SELECT * FROM Business WHERE business_name = ('"+restaurant+"');"; /* Write your query here and uncomment line 21 in javascripts/app.js*/
  connection.query(query, function(err, rows, fields) {
if (err) console.log('error: ', err);
    else {
      res.json(rows);
    }
  });
});


router.get('/userList', function(req, res) {
  var query = "SELECT * FROM User;"; 
  connection.query(query, function(err, rows, fields) {
    if (err) console.log('get user info error: ', err);
    else {
      res.json(rows);
    }
  });
});


router.get('/genres', function(req, res) {
  var query = "SELECT DISTINCT genre FROM Genres;"; 
  connection.query(query, function(err, rows, fields) {
    if (err) console.log('get user info error: ', err);
    else {
      res.json(rows);
    }
  });
});


router.get('/topMovies/:genre', function(req, res) {
  var query = "SELECT title, rating, vote_count FROM Genres JOIN Movies ON movie_id = id WHERE genre = '"+req.params.genre+"' ORDER BY rating DESC, vote_count DESC LIMIT 10;"; 
  connection.query(query, function(err, rows, fields) {
    if (err) console.log('get user info error: ', err);
    else {
      res.json(rows);
    }
  });
});




router.get('/Recommendations/:movieId', function(req, res) {
  console.log(req.params.movieId);
  var query = "SELECT DISTINCT genre FROM Genres WHERE movie_id = '"+req.params.movieId+"'"; 
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log('get recommendations error: ', err);
    }
    else {
      //console.log(rows);
      var results = [];
      var titleList = [];
      var genreList = [];
      var total = 10;
      var genreNum = rows.length;
      var newQuery = "SELECT DISTINCT title, genre FROM Movies, (SELECT DISTINCT movie_id,genre FROM Genres WHERE genre IN ("+ query +")) G WHERE id = movie_id LIMIT 100;"; 
      connection.query(newQuery, function(err, rows, fields) {
        if (err) console.log('Query error: ', err);
        else {
          for(var i in rows){
            //console.log("rows "+i+rows[i].title);
            if(results.length < genreNum){
              console.log("rows "+i+rows[i].title);
              if(!genreList.includes(rows[i].genre) && !titleList.includes(rows[i].title)){
                results.push({"title": rows[i].title, "genre": rows[i].genre});
                titleList.push(rows[i].title);
                genreList.push(rows[i].genre);
                console.log(titleList);
              }
              if(results.length == total){
                break;
              } 
            }
            else{    
              if(!titleList.includes(rows[i].title)){
                results.push({"title": rows[i].title, "genre": rows[i].genre});
                titleList.push(rows[i].title);
                //console.log(titleList);
              }
              if(results.length == total){
                break;
              }
            }
          }
          console.log(results);
          res.json(results);
        }
      });
    }
  });
});

//Movies (id, title, imdb_id, rating, release_year, vote_count)
//Genres (movie_id, genre)
router.get('/BestOf/:years', function(req, res) {
  var query = "SELECT M.title title, G.genre genre, M.vote_count votes "+ 
              "FROM Movies M JOIN Genres G ON M.id = G.movie_id "+
              "JOIN (SELECT genre, MAX(vote_count) vote_count "+ 
              "  FROM Movies JOIN Genres ON id = movie_id "+ 
              "  WHERE release_year = '"+req.params.years+ "'"+
              "  GROUP BY genre) Q "+
              "ON G.genre = Q.genre "+
              "WHERE M.vote_count = Q.vote_count "+
              "ORDER BY G.genre;";
console.log(req.params.years); 
  connection.query(query, function(err, rows, fields) {
    if (err) console.log('query error: ', err);
    else {
      var results = [];
      var genreList = [];
      for(var i in rows){
        if(!genreList.includes(rows[i].genre)){
          results.push({"title": rows[i].title, "genre": rows[i].genre, "votes": rows[i].votes});
          genreList.push(rows[i].genre);
        }
      }
      res.json(results);
    }
  });
});



router.get('/posterLists', function(req, res) {
  var randomNumber = Math.floor(Math.random()*(15-10+1))+10;
  console.log(randomNumber);
  var query = "SELECT title, imdb_id FROM Movies ORDER BY RAND() LIMIT "+ randomNumber+";";

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      //console.log(rows);
      res.json(rows);
    }
  });
});






// template for GET requests
/*
router.get('/routeName/:customParameter', function(req, res) {

  var myData = req.params.customParameter;    // if you have a custom parameter
  var query = '';

  // console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});
*/

module.exports = router;
