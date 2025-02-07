const {v4: uuidv4}= require("uuid");
const User= require("../models/user");
const {setUser}= require("../service/auth");
async function HandleUserSignUp(req,res) {
    const {name,email,Password}= req.body;
    await User.create({
        name,
        email,
        Password,
    });
    return res.redirect('/');
    
}

async function HandleUserLogin(req,res) {
    const {email,Password}= req.body;
    const user=await User.findOne({email,Password});
    if(!user)
    {
        return res.render("login",{
            error: "Invalid Username or Password",
        });
    }
    const sessionId= uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    return res.redirect('/');
    
}



module.exports= {
    HandleUserSignUp,
    HandleUserLogin,

};