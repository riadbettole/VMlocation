import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {id ,  dateDu,  dateAu,  prolongation ,  livrer, chauffeur, voitureId,  locataireId} = req.body
    try {
        await prisma.location.create({
            data: {
                dateDu,  
                dateAu,  
                prolongation ,  
                livrer ,  
                chauffeur ,
                voitureId ,
                locataireId ,   
            }
        })
        res.status(200).json({message: 'Location Created'})
    }catch(err){
        console.log("Failure "+ err);
    }
}
