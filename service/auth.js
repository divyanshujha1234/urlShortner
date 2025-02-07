const sessionIdToUserMap= new Map(); //jitni baar me server restart krunga utni 
                                     //baar map khali ho jaega or hrr baar new login krna pdega 
                                     //kyoki uid hrr baar nayi genrate hogi .
function setUser(id,user)
{
    sessionIdToUserMap.set(id,user);
};

function getUser(id)
{
   return sessionIdToUserMap.get(id);
};

module.exports=
{
    setUser,
    getUser,
};