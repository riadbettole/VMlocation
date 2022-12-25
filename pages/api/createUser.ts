import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {id ,  firstname,  lastname,  tel ,  email , mdp, verified,  adresse,   avatar,   rank ,  cin ,createdAt} = req.body
    try {
        await prisma.user.create({
            data: {
                firstname,  
                lastname,  
                tel ,  
                email ,  
                mdp ,
                verified ,
                adresse,   
                avatar, 
                cin ,
            }
        })
        res.status(200).json({message: 'Contact Created'})
    }catch(err){
        console.log("Failure "+ err);
    }
}
