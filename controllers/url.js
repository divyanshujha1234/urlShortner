 const {nanoid}= require("nanoid")
 const URL= require("../models/url");
async function  HandleGenerateNewShortURL(req,res) {
      const body = req.body;
      if(!body.url)
      {
        return res.status(400).json({"ERROR" : "URL is Required"});
      }
      const existingUrl = await URL.findOne({ redirectURL: body.url });
      if (existingUrl) {
          return res.status(400).json({ "msg": "URL Already Exists!!", "shortId": existingUrl.shortId });
      }
      const shortID= nanoid(8);
      await URL.create(
        {
           shortId: shortID,
           redirectURL: body.url,
           visitHistory: [],
           createdBy: req.user._id,
           
        }
      );
      res.render('home',{
        id: shortID,
      });
      //return res.json({id: shortID});

    
};

async function HandleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result=await URL.findOne({shortId});
    const clicks=result.visitHistory.length;
    return res.json({"totalClicks": clicks, "analytics": result.visitHistory});

    
};

async function HandleGetShortId(req,res) {
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
  
};

module.exports= 
{
   HandleGenerateNewShortURL,
   HandleGetAnalytics,
   HandleGetShortId,
   
};











