const express= require("express");
const urlRoute= require("./Routes/url");
const {connectToMongoDb} = require("./connection");
const URL= require("./models/url");
const app= express();
const PORT=8000;

connectToMongoDb("mongodb://127.0.0.1:27017/urlShortner").then(()=> console.log(`MongoDb Connected!`));

app.use(express.json());

app.use("/url", urlRoute);


app.get("/:shortId", async (req,res)=>{
    const shortId= req.params.shortId;
    const entry= await URL.findOneAndUpdate({
        shortId,
    }, 
    { $push: 
        {
            visitHistory: {
                timestamp: Date.now(),
            }
        },
    }
);

res.redirect(entry.redirectURL);
});

app.listen(PORT, ()=> console.log(`server started at port number ${PORT}.`));
