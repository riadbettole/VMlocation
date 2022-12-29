import { loadStripe } from "@stripe/stripe-js";
import { getStaticProps } from "..";
import { prisma } from "../../lib/prisma";

export async function checkout(data: any, car: any, locatId:any) {
  let stripePromise: any = null
  const getStrip = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        "pk_test_51MJNe6CgnwrlCMdcqKnO25ppiSnbv6aULlWvYPZjPdtaiEwiT9P1k15cY6jldr2ORhNMkXNReUw0dFpWzKQdgJNu00kwVdAu37"
      );
    }
    return stripePromise;
  };
  const stripe = await getStrip();

  let dateDu = parseInt(data.dateDu.slice(8, 10));
  let dateAu = parseInt(data.dateAu.slice(8, 10));
  let quantiLoca = dateAu - dateDu + 1;

  const lineItems = [{ price: car.priceid, quantity: quantiLoca }];
  data.locataireId = locatId
  console.log(locatId)
  try {
    fetch("http://localhost:3000/api/createLocation", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  } catch (err) {
    console.log(err);
  }

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: "http://localhost:3000/myCars",
    cancelUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  });

  
  //rej3o indispo
}