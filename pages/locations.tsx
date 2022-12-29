
import { prisma } from '../lib/prisma'
import NavBar from './NavBar'
import Footer from '../component/Footer'
import { car, location } from "@prisma/client";
import Location from "../component/Location"
import { Data } from '@react-google-maps/api';

export default function Home({dataLoc}:any) {
    return (
    <div className='text-3xl h-[100vh] '>
        <NavBar/>
        <Location dataLoc={dataLoc}/>
        <div className='p-20'></div>
        <Footer/>
    </div>
  )
}


export async function getStaticProps(){
    const locations: location[] = await prisma.location.findMany();
    
    let dataLoc = []
    for (const location of locations) {
        const carLoc = await prisma.car.findUnique({
            where: {id: location.voitureId},
        })
        const userLoc = await prisma.user.findUnique({
            where: {id: location.locataireId},
        })
        const data = {
            car : carLoc,
            user : userLoc,
            loca : location
        }
        dataLoc.push(data)
    }
    console.log(dataLoc)
    return {
      props: {dataLoc}
    }
  }