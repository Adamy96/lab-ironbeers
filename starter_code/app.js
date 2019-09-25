const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')


// ROUTES
app.get('/', (req, res, next) => {
  res.render('index', {title: 'Homepage', css: 'stylesheets/absolute.css'});
});

app.get('/beers', async (req, res) => {
  const data = await punkAPI.getBeers();
  
  try {
    res.render('beers', {data, css: 'stylesheets/normalFlow.css'});
    // res.send(data);
  } catch (error) {
    throw new Error(error);
  }
});

app.get('/random-beers', async (req, res, next) => {
  const beer = await punkAPI.getRandom();

  try {
    res.render("randomBeer", {
      beer: beer[0],
      css: 'stylesheets/absolute.css'
    });
  } catch(error) {
    throw new Error(error);
  }
});


app.listen(3000, () => console.log('Server online at port 3000.'));
