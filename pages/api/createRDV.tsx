import { prisma } from "../../lib/prisma";
import { rendezvous } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {id ,  name, tel, email} = req.body
    try {
        await prisma.rendezvous.create({
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
