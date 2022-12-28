import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { ImageList } from "@mui/material";


async function createProdStripe(data:any) {
  const stripe = require("stripe")(
    "sk_test_51MJNe6CgnwrlCMdcNRVceFh8IECp4kXYuT18ccNUAyG1Y39zNddrZmrzxGdR4VNag9kk965QF1bJYEZkMMKOknkU000eldDvli"
  );

  try {
    return await stripe.products
      .create({
        id: data.id,
        name: data.name,
        images: [data.image],
      })
      .then(async () => {
        const price = await stripe.prices.create({
          unit_amount: data.prix*100 ,
          currency: "mad",
          product: data.id,
        });
        return price.id;
      });
  } catch (err) {
    console.log(err);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, marque, fuel, kilo, prix, dispo, ww, rating, image } = req.body;
  let priceid:any = "vide";
  try {
    const createdCar = await prisma.car.create({
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
        priceid,
      },
    });
    const priceId = await createProdStripe(createdCar);
    await prisma.car.update({
      where:{
        id: createdCar.id
      },
      data:{
        priceid: priceId,
      }
    })
    res.status(200).json({ message: "Car Created" });
  } catch (err) {
    console.log("Failure " + err);
  }
}
