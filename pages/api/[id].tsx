import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const noteId = req.query.id
    console.log("HEEEEEERE")
    console.log(noteId)
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
