// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express

// configuration =================

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img 

    
// application -------------------------------------------------------------/
// get all todos
app.get('/api/todos', function(req, res) {

  res.sendfile('./public/json.json');
    
});

// get all todos
app.get('/someUrlForGettingUsername', function(req, res) {

  res.json({"user": {"name": "Todd Motto", "id": "80138731"}});
    
});


app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});



// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
