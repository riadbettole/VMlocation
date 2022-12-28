import NavBar from './NavBar'
import MyCars from './cars/Mycars'
import CarsApp from '../component/Cars'
import { car } from "@prisma/client";
import {prisma } from "../lib/prisma"
import { useEffect, useState } from 'react';

export default function Home({loca, car}:any) {
  return (
    <div className='text-3xl bodyIndex'>
      <NavBar/>
      <MyCars loca={loca} car={car}/>
    </div>
  )
}


export async function getServerSideProps(){
    const loca = await prisma.location.findMany()
    const car = await prisma.car.findMany()
    return {
      props: {loca, car}
    }
  }