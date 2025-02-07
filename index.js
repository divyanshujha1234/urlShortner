const express= require("express");
const path = require("path"); // Path of views
const cookieParser = require("cookie-parser");
const {connectToMongoDb} = require("./connection");
const {restrictToLoggedInUserOnly,checkAuth}=require("./middlewares/auth")
const URL= require("./models/url");
const app= express();
const PORT=8000;

const urlRoute= require("./Routes/url");
const staticRoute= require("./Routes/staticRouter");
const userRoute= require("./Routes/user");

connectToMongoDb("mongodb://127.0.0.1:27017/urlShortner").then(()=> console.log(`MongoDb Connected!`));

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));
// app.get('/test',async(req,res)=> {

//     const allUrls= await URL.find({});
//     return res.render('home.ejs',
//         {
//             urls: allUrls,
//         }
//     );

// });

app.use(express.json());
app.use(express.urlencoded({extended:false})); // To parse form data
app.use(cookieParser());

app.use("/url",restrictToLoggedInUserOnly, urlRoute);
app.use('/',checkAuth,staticRoute);
app.use('/user',userRoute);



app.listen(PORT, ()=> console.log(`server started at port number ${PORT}.`));


//We will use EJS for server side rendering.
