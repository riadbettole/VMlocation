import { useEffect, useState } from "react"
import {prisma } from "../../lib/prisma"

export default function MyCars({loca,car}){
    const [userId,setUserId] = useState("")
    useEffect(()=>{
        setUserId(localStorage.getItem('id')!)
    })
    console.log(loca)
    return(
        <div className="grid justify-center pt-24 mx-36 "> 
            <div className="p-24 py-12 flex flex-col gap-y-3 shadow-xl bg-white hover:gap-y-4 duration-700 ease-in-out">
                <span className="text-6xl font-thin mb-8 text-[#7a7a7a] ">VOITURE : </span>
                    {
                     loca.map((l:any)=>{
                        if(l.locataireId === userId)

                            return(
                                car.map((c:any)=>{
                                if(c.id === l.voitureId )
                                return(
                                    <div key={c.id} className="p-12  flex font-bold shadow-md  hover:scale-105 duration-700 ease-in-out relative">
                                        <img src={c.image} className="flex w-96 mr-6"></img>
                                        <div className="flex flex-col mr-36">
                                            <span>{c.name} {c.marque}</span>
                                            <span className="font-extralight text-gray-400">{l.dateDu}</span>
                                            <span className="font-extralight text-gray-400">{l.dateAu}</span>
                                            <svg className=" absolute right-8 bottom-8 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
</svg>

                                        </div>
                                    </div>
                                )
                            }))
                     })
                    }
            </div>
            <div>

            </div>
        </div>
    )
}



