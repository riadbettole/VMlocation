import NavBar from './NavBar'
import CarsApp from '../component/Cars'
import { car } from "@prisma/client";
import {prisma } from "../lib/prisma"


interface props {
  cars: car[];
}

export default function Home({cars}:props) {
  
  return (
    <div className='text-3xl bodyIndex'>
      <NavBar/>
      <div className="grid justify-center pt-24 mx-36 ">
            <div className="p-24 flex flex-col gap-y-3 shadow-xl">
                    <span className='text-3xl font-thin'> Contacter VM LOCATION pour plus d'information </span>
                    <span className='text-center text-5xl mt-5'> +212522696969 </span>
            </div>
            <div>

            </div>
        </div>
    </div>
  )
}

export async function getStaticProps(){
  const cars: car[] = await prisma.car.findMany();
  return {
    props: {cars}
  }
}