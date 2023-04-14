import jwt from "jsonwebtoken";

export const setcookie=(user,res,status=201,massage)=>{
    const token=jwt.sign({_id:user._id},process.env.JWE_SCRT);
res.status(status).cookie("tokken",token,{
    httpOnly:true,
    maxAge:15*60*1000,
    SameSite:process.env.NODE_ENV==="Development"?"lex":"none",
    secure:process.env.NODE_ENV==="Development"?false:true,
}).json({
    success:true,
    massage,
})

}