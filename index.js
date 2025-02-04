const express= require("express");
const path = require("path"); // Path of views
const urlRoute= require("./Routes/url");
const {connectToMongoDb} = require("./connection");
const URL= require("./models/url");
const app= express();
const PORT=8000;

connectToMongoDb("mongodb://127.0.0.1:27017/urlShortner").then(()=> console.log(`MongoDb Connected!`));

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());

app.use("/url", urlRoute);

app.get('/test',async(req,res)=> {

    const allUrls= await URL.find({});
    return res.render('home.ejs',
        {
            urls: allUrls,
        }
    );

});


app.listen(PORT, ()=> console.log(`server started at port number ${PORT}.`));


//We will use EJS for server side rendering.
