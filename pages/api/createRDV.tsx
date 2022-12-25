import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {id ,  name, tel, email, createdAt} = req.body
    try {
        await prisma.user.create({
            data: {
                name,   
                tel ,  
                email ,  
            }
        })
        res.status(200).json({message: 'Contact Created'})
    }catch(err){
        console.log("Failure "+ err);
    }
}
