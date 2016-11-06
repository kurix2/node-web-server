const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append to server.log.');
    }
  });
  next();// this function says when the middle-ware is finished
})

//Uncomment when in maintenance.
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); //use express middle-ware



hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
}); // hbs helper

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
}) // lets use run javascript code from inside of our handlebars templates


// get an http request
app.get('/', (req, res)=>{  // '/' this is the root
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Chris',
  //   likes: [
  //     'Weightlifting',
  //     'Movies',
  //   ]
  // })

  res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to my website',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request',
  });
});

app.listen(3000, ()=> {
  console.log('Server is up on port 3000');
}); // listen on port 3000
