import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function createProdStripe(data) {
    try {
    fetch("https://api.stripe.com/v1/products", {
        body: `name=${data.name}&id=${data.id}&images=${data.image}`,
        headers: {
        Authorization: "Basic c2tfdGVzdF81MU1KTmU2Q2dud3JsQ01kY05SVmNlRmg4SUVDcDRrWFl1VDE4Y2NOVUF5RzFZMzl6TmRkclptcnp4R2RSNFZOYWc5a2s5NjVRRjFiSllFWmtNTUtPa25rVTAwMGVsZER2bGk=",
        "Content-Type": "application/x-www-form-urlencoded",
        },
    method: "POST",
    }).then();
  } catch (err) {
    console.log(err);
  }
}


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    const {name, marque,fuel, kilo, prix, dispo, ww, rating,image} = req.body
    
    createProdStripe(req.body)


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
        res.status(200).json({message: 'Car Created'})
    }catch(err){
        console.log("Failure "+ err);
    }
}
