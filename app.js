const express = require("express");
const path = require('path');
const app = express();
const mongoose = require('mongoose');
// const bodyparser = require('body-parser')
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const port = 8000;

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const contact = mongoose.model('contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


// ENDPOINTS
app.get('/', (req, res) => {

    res.status(200).render('home.pug');
})
app.get("/contact", (req, res) => {
    res.status(200).render('contact.pug');
});

app.post("/contact", (req, res) => {
    var MyData = new contact(req.body);
    MyData.save().then(() => {
       res.status(200).send(`<div style="display:flex;justify-content:center; align-items:center"><div style="text-align:center"><h1>Your Registration has been Completed.</h1>
                             <h1>Thank Your for Connecting us </h1></div></div>
        `)
    }).catch(() => {
        res.status(400).send(`<h1>Error in Registration</h1>`)
    });
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});