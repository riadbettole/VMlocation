import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {name, marque,fuel, kilo, prix, dispo, ww, rating,image} = req.body
    try {
        await prisma.car.create({
            data: {
                name,
                marque,
                fuel,
                kilo,
                prix,
                dispo,
                ww,
                rating,
                image,
            }
        })
        res.status(200).json({message: 'Contact Created'})
    }catch(err){
        console.log("Failure "+ err);
    }
}
