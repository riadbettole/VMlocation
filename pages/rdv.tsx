import NavBar from "./NavBar";
import CarsApp from "../component/Cars";
import { car } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { useState } from "react";

interface props {
  cars: car[];
}

function Succes({succes}:props){
  if(succes)
  return(
      <span id='succes' className="text-center  bg-amber-500 text-white border p-3"> Rendez vous pris !</span>
  )
  return <></>;
}

export default function Home() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    tel: "",
    email: "",
  });
  const [succesAdd,setSucces] = useState(false);
  


  const handleSubmit = async () => {
    try {
      fetch("http://localhost:3000/api/createRDV", {
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        setForm({
          id: "",
          name: "",
          tel: "",
          email: "",
        });
        setSucces(true)
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="text-3xl bodyIndex mySvg3 h-[100vh]">
      <NavBar />
      <div className="grid justify-center pt-24 mx-36 ">
      <Succes succes={succesAdd}/>
        <div className="p-24 flex flex-col gap-y-3 shadow-xl bg-white">
          <span className="text-5xl font-thin text-center">
            Reserver un rendez-vous
          </span>
            <form className="flex flex-col gap-y-4"
            onSubmit={async (event) => {
              event.preventDefault();
              handleSubmit(form);
            }}>
          <div className="flex gap-x-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            type="text"
            id="fname"
            className="py-4 pl-3 rounded text-xl text-black flex-auto bg-gray-100"
            placeholder="Name.."
          ></input>

          <input
            value={form.tel}
            onChange={(e) => setForm({ ...form, tel: e.target.value })}
            required
            type="tel"
            id="fname"
            className="py-4 pl-3 rounded bg-gray-100 text-xl text-black flex-auto "
            placeholder="06.."
          ></input>
            </div>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            type="email"
            id="fname"
            className="py-4 pl-3 rounded bg-gray-100 text-xl text-black text-center"
            placeholder="Email.."
          ></input>
          <button type="submit" className="py-3 bg-red-500 hover:bg-[#ff0101] duration-500 ease-in-out text-white rounded">
            Submit
          </button>
          </form>
        </div>
        <div className="p-24 flex flex-col gap-y-3 shadow-xl bg-white border-t-2 border-[#b8b8b8] pt-10">
          <span className="text-3xl font-thin">
            {" "}
            Contacter VM LOCATION pour plus d'information{" "}
          </span>
          <span className="text-center text-5xl mt-5"> +212522696969 </span>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const cars: car[] = await prisma.car.findMany();
  return {
    props: { cars },
  };
}
