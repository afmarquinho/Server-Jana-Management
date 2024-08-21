import jwt from "jsonwebtoken"

type userPayload ={
    id:number,
    name: string,
    lastName : string,
    active: boolean,
    role: string,
    profilePicture: string | null
}

export const generateJWT = (payload: userPayload)=>{
 
    const token = jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: "1d"
    })
    return token
}