import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { cardActionAreaClasses } from "@mui/material";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const noteId = req.query.id
    if(req.method === 'DELETE') {
        const note = await prisma.car.delete({
            where: {
                id: noteId
            }
        })
        res.json(note)
    }else{
        console.log("MEOW");
    }
}
