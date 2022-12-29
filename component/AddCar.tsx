import Router, { useRouter } from "next/router";
import { prisma } from '../lib/prisma'
import { car } from "@prisma/client"
import { useContext, useState } from 'react'
import React from 'react'

interface props{
    succes:boolean;
}

function Succes({succes}:props){
    if(succes)
    return(
        <span id='succes' className="text-center w-96 bg-green-500 text-white border  p-3"> Ajout avec succes</span>
    )
    return <></>;
}

function AddCar(){
    const [form, setForm] = useState<car>({
        id: '',
        name: '',
        marque: '',
        fuel: '',
        kilo: 0,
        prix: 0,
        dispo: true,
        ww: true,
        rating: 0,
        image: '',
        priceid: ''
    })

    
const router = useRouter()
const refreshData = () => {
    router.replace(router.asPath)
  }
const [succesAdd,setSucces] = useState(false);

async function create(data: car){
    try{
        fetch('http://localhost:3000/api/create',{
        body: JSON.stringify(data),
        headers: {
            'Content-Type':  'application/json'
        },
        method: 'POST'
        }).then(()=> {
            setForm({id:'', name:'', marque:'',fuel:'', kilo:0, prix:0, dispo:true, ww:true,rating:0,image:'',priceid: ''})
            setSucces(true)
        });
    }catch(err){
        console.log(err);
    }
}

const handleSubmit = async(data: car) => {
    try {
      create(data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="grid justify-center pt-24 mx-36 ">
            <form className="p-24 flex flex-col gap-y-3 shadow-xl bg-white" onSubmit={
                async (event) => {
                event.preventDefault()
                handleSubmit(form)
            }
            }>
                <Succes succes={succesAdd}/>
                <label className="text-5xl font-thin ">Ajouter voiture</label> 
                <input  value={form.name} onChange={e => setForm({...form, name : e.target.value})} type='text'   id="fname" className="w-96 py-4 pl-3 rounded bg-white text-xl text-black"  placeholder="Name"></input> 
                <input  value={form.marque} onChange={e => setForm({...form, marque : e.target.value})} type='text'   id="fname" className="py-4 pl-3 rounded bg-white text-xl text-black"  placeholder="Marque"></input> 
                <input  value={form.fuel} onChange={e => setForm({...form, fuel : e.target.value})} type='text'   id="fname" className="py-4 pl-3 rounded bg-white text-xl text-black"  placeholder="Carburant"></input> 
                <input  value={form.kilo} onChange={e => setForm({...form, kilo : e.target.valueAsNumber})} type='number'   id="fname" className="py-4 pl-3 rounded bg-white text-xl text-black"  placeholder="Kilometrage"></input> 
                <input  value={form.prix} onChange={e => setForm({...form, prix : e.target.valueAsNumber})} type='number'   id="fname" className="py-4 pl-3 rounded bg-white text-xl text-black"  placeholder="Prix dhs"></input> 
                <input  value={form.image} onChange={e => setForm({...form, image : e.target.value})} type='text'   id="fname" className="py-4 pl-3 rounded bg-white text-xl text-black"  placeholder="Url image"></input> 
                <div className="flex gap-x-6">
                    <span className="flex gap-x-2">
                    <label className='text-xl'>dispo</label>
                    <input  checked={form.dispo} onChange={e => setForm({...form, dispo : e.target.checked})} type='checkbox'   id="fname" className="py-4 pl-3 rounded bg-white text-xl text-black" ></input> 
                    </span>
                    <span className="flex gap-x-2">
                    <label className='text-xl'>ww</label>
                    <input  checked={form.ww}  onChange={e => setForm({...form, ww : e.target.checked})} type='checkbox'   id="lname" className="py-4 pl-3 rounded bg-white text-xl text-black" ></input> 
                    </span>
                </div>
                <button type="submit"  className="py-3 mt-3 bg-blue-600 rounded" > Submit </button> 
            </form>
    </div>
  )
}


export default AddCar