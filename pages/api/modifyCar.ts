import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {name, marque,fuel, kilo, prix, dispo, ww, rating,image} = req.body
    try {
        await prisma.car.update({
            where: {
                id : req.body.id,
            },
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
        res.status(200).json({message: 'Car Updated'})
    }catch(err){
        console.log("Failure "+ err);
    }
}
