const express= require("express");
const {HandleGenerateNewShortURL,HandleGetAnalytics,HandleGetShortId}= require("../controllers/url");
const router= express.Router();

router.post('/',HandleGenerateNewShortURL);

router.get('/analytics/:shortId', HandleGetAnalytics);

router.get('/:shortId', HandleGetShortId);



module.exports= router;
