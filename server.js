const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000; // Process has all the environment variables for our app.

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); //Directory where all the static files are placed

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to log to the file,');
        }
    });
   next();
});

// app.use((req, res, next) => {
//    res.render('maintenence.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Deepaks Home Page',
        pageTitle : 'Welcome to Deepak\'s home',
        siteInformation:'This is the page where the greatness will happen',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle:'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/Projects', (req, res) => {
    res.render('projects.hbs', {
        title: 'Deepaks Projects Page',
        pageTitle : 'Welcome to Deepak\'s home',
        siteInformation:'All Projects',
    });
});

app.listen(port, () => {
    console.log(`Server is up @ ${port}`);
});