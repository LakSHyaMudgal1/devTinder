const adminAuth =(req,res,next)=>{
    console.log("admin auth is getting checked");
    const token="xyz";
    const isAdminAuthorized = token==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("unauthorized user ");

    }
    else{
        next();
    }  

};


module.exports={
    adminAuth,
}