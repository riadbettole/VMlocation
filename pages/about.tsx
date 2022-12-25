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
      <div className="grid justify-center mt-12 mx-36 ">
            <div className="p-24 flex flex-col gap-y-3 bg-slate-800 rounded-xl shadow-xl shadow-gray-700">
                    <span className='text-5xl'>VM LOCATION est une entreprise de gestion de location de voiture. </span>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut quos ut magni, deserunt molestias laudantium veritatis, eius temporibus pariatur consectetur excepturi doloremque molestiae sunt reiciendis deleniti a itaque? Fugit, vel! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat blanditiis perferendis quae, explicabo itaque tenetur nostrum, quasi veritatis ipsa, in sunt qui minima vero? Ab veritatis, consequatur eius inventore autem maxime eum minima officia tempore error libero doloribus animi! Quasi optio distinctio earum praesentium ad voluptates necessitatibus id voluptatum voluptatibus natus. Ut, at? Nam, expedita modi sit nesciunt et eaque reiciendis asperiores voluptas voluptatem rerum! Repudiandae nam commodi, harum, non saepe expedita, delectus aspernatur omnis rerum excepturi autem id. Magni ratione cum ullam ex. Consequuntur incidunt soluta id ut! Reiciendis vel pariatur veniam porro totam aspernatur inventore. Sit, sapiente doloribus.
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