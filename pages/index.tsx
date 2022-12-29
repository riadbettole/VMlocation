import NavBar from './NavBar'
import Welcome from '../component/Welcome'
import Footer from '../component/Footer'
import Rdv from '../component/Rdv'
import Map from '../component/Map'
import CarsApp from '../component/Cars'
import { car } from "@prisma/client";
import {prisma } from "../lib/prisma"


interface props {
  cars: car[];
}

export default function Home({cars}:props) {
  
  return (
    <div className='text-3xl bodyIndex scroll-smooth overflow-y-hidden '>
      <NavBar/>
      <Welcome/>
      <Rdv/>
      <Map/>
      <CarsApp cars={cars}/>
      <Footer/>
    </div>
  )
}

export async function getStaticProps(){
  const cars: car[] = await prisma.car.findMany();
  return {
    props: {cars}
  }
}