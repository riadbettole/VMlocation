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
            <div className="p-24 flex flex-col gap-y-3 shadow-xl">
                    {
                     loca.map((l:any)=>{
                        if(l.locataireId === userId)

                            return(
                                car.map((c:any)=>{
                                if(c.id === l.voitureId )
                                return(
                                    <div>{c.name}</div>
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



