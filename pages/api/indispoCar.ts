import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function indispo(req:NextApiRequest,res:NextApiResponse){
    const {id} = req.body
    try {
        await prisma.car.update({
            where: {
                id
            },
            data: {
                dispo: false
            }
        })
    }catch(err){
        console.log("Failure "+ err);
    }
}
