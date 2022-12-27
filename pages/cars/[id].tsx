import { prisma } from "../../lib/prisma";
import NavBar from "../NavBar";
import Footer from "../../component/Footer";
import { car, user, location } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

interface props {
  car: car;
  params: any;
  succesAdd: boolean;
}

export default function App({ car }: props) {
  const voitId = car.id;

  const router = useRouter();

  const [isManager, setIsManager] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [locatId,setLocatId] = useState("")


  useEffect(() => {
    const localRank = localStorage.getItem("rank");

    if (
      localRank !== "user" &&
      localRank !== "manager" &&
      localRank !== "undefined"
    )
      router.push("/login");
    if (localRank === "user" ) setIsUser(true)
    if (localRank === "manager") setIsManager(true);
  });


  const [loca, setLoca] = useState<location>({
    id: "",
    dateDu: "",
    dateAu: "",
    prolongation: false,
    livrer: false,
    chauffeur: false,
    voitureId: voitId,
    locataireId: "",
  });

  const [succesAdd, setSucces] = useState(false);

  useEffect(()=>{
     setLocatId( localStorage.getItem('id')!)
  })
  async function create(data: location) {
    data.id =  locatId;
    
    try {
      fetch("http://localhost:3000/api/createLocation", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        setLoca({
          id: "",
          dateDu: "",
          dateAu: "",
          prolongation: false,
          livrer: false,
          chauffeur: false,
          voitureId: car.id,
          locataireId: "",
        });
        setSucces(true);
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (data: location) => {
    try {
      create(data);
    } catch (error) {
      console.log(error);
    }
  };

  function Succes(succesAdd: boolean) {
    if (succesAdd)
      return (
        <span
          id="succes"
          className="text-center font-bold w-full h-[7vh] bg-green-500 text-white  p-3"
        >
          REQUETE ENVOYER
        </span>
      );
    return <></>;
  }


  async function deleteContact(id: string) {
    try {
      fetch(`http://localhost:3000/api/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(() => {
        router.push("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  const [isUpdate, setIsUpdate] = useState(false); //STATE
  function toInput() {
    setIsUpdate(true);
  }

  let readOrUpdate;

  const [form, setForm] = useState<car>({
    id: car.id,
    name: car.name,
    marque: car.marque,
    fuel: car.fuel,
    kilo: car.kilo,
    prix: car.prix,
    dispo: car.dispo,
    ww: car.ww,
    rating: car.rating,
    image: car.image,
  });

  const handleSubmitCar = async (data: car) => {
    try {
      update(data);
    } catch (error) {
      console.log(error);
    }
  };

  async function update(data: car) {
    try {
      fetch("http://localhost:3000/api/modifyCar", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      }).then(() => {
        router.reload()
        setForm({
          id: car.id,
          name: car.name,
          marque: car.marque,
          fuel: car.fuel,
          kilo: car.kilo,
          prix: car.prix,
          dispo: car.dispo,
          ww: car.ww,
          rating: car.rating,
          image: car.image,
        });
        //setSucces(true);
      });
    } catch (err) {
      console.log(err);
    }
  }

  let deleteCar = <></>;
  let updateCar = <></>;

  if (isManager) {
    updateCar = (
      <button
        onClick={() => toInput()}
        className="bg-blue-600 text-white px-2 rounded"
      >
        MODIFIER LE VEHICULE
      </button>
    );
    deleteCar = (
      <button
        onClick={() => deleteContact(car.id)}
        className="bg-red-600 text-white px-2 rounded"
      >
        SUPPRIMER LE VEHICULE
      </button>
    );
  }

  if (isUpdate) {
    updateCar = <></>;
    readOrUpdate = (
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          handleSubmitCar(form);
        }}
      >
        <div className="flex gap-x-10 mb-2 text-white">
          <button
            type="submit"
            className="bg-blue-300 p-1 rounded-sm flex-grow hover:bg-blue-500 duration-300"
          >
            Confirm
          </button>
          <button onClick={()=>{router.reload()}} className="bg-red-300 p-1 rounded-sm flex-grow hover:bg-red-500 duration-300">
            Cancel
          </button>
        </div>

        <img className="w-[120vh] mt-4" src={car.image} />
        <div className="flex gap-x-6">
          <span className="flex flex-col border-b-2 border-dotted flex-[50%] hover:text-[#badb57] duration-700 ease-in-out bg-transparent">
            <span>-&#62; Nom : </span>{" "}
            <input
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              value={form.name}
              className="font-bold p-4"
            />
          </span>
          <span className=" flex flex-col border-b-2 border-dotted flex-[50%] hover:text-[#badb57] duration-700 ease-in-out bg-transparent">
            <span>-&#62;Marque :</span>{" "}
            <input
              onChange={(e) => setForm({ ...form, marque: e.target.value })}
              value={form.marque}
              className="font-bold p-4"
            />
          </span>
        </div>
        <div className="flex gap-x-6">
          <span className="flex flex-col border-b-2 border-dotted flex-[50%] hover:text-[#badb57] duration-700 ease-in-out bg-transparent">
            <span>-&#62;Carbuarant :</span>
            <input
              onChange={(e) => setForm({ ...form, fuel: e.target.value })}
              value={form.fuel}
              className="font-bold p-4"
            />
          </span>
          <span className=" flex flex-col border-b-2 border-dotted flex-[50%] hover:text-[#badb57] duration-700 ease-in-out bg-transparent">
            <span>-&#62;KM :</span>{" "}
            <input
              onChange={(e) =>
                setForm({ ...form, kilo: e.target.valueAsNumber })
              }
              value={form.kilo}
              className="font-bold p-4"
            />
          </span>
        </div>
        <div className="flex gap-x-6">
          <span className="p-4 pl-0 border-b-2 border-dotted flex-[50%] hover:text-[#badb57] duration-700 ease-in-out bg-transparent">
            <span>-&#62;Disponible </span>:{" "}
            <input
              onChange={(e) => setForm({ ...form, dispo: e.target.checked })}
              type="checkbox"
              checked={form.dispo}
              className="font-bold p-4"
            />
          </span>
          <span className="p-4 pl-0 border-b-2 border-dotted flex-[50%] hover:text-[#badb57] duration-700 ease-in-out bg-transparent">
            <span>-&#62; WW : </span>
            <input
              onChange={(e) => setForm({ ...form, ww: e.target.checked })}
              type="checkbox"
              checked={form.ww}
              className="font-bold p-4"
            />
          </span>
        </div>
        <div className="p-4 flex gap-x-6">
          <input
            onChange={(e) => setForm({ ...form, prix: e.target.valueAsNumber })}
            value={form.prix}
            className=" w-24 border-b-2 text-3xl text-[#373a2f] border-dotted flex-[50%] font-bold hover:text-[#badb57] duration-700 ease-in-out bg-transparent"
          />
          DHS/jour
        </div>
      </form>
    );
  } else {
    readOrUpdate = (
      <div className="scale-125 translate-y-10">
        <img className="w-[120vh]" src={car.image} />

        <div className="flex gap-x-6 mt-8">
          <span className=" border-b-2 border-dotted flex-[50%] hover:text-[#badb57] duration-700 ease-in-out bg-transparent">
            <span>-&#62; Nom : </span>{" "}
            <span className="font-bold"> {car.name}</span>
          </span>
          <span className=" border-b-2 border-dotted flex-[50%] hover:text-[#badb57] duration-700 ease-in-out bg-transparent">
            <span>-&#62;Marque :</span>{" "}
            <span className="font-bold">{car.marque}</span>
          </span>
        </div>
        <div className="flex gap-x-6 mt-8">
          <span className=" border-b-2 border-dotted flex-[50%] hover:text-[#badb57] duration-700 ease-in-out bg-transparent">
            <span>-&#62;Carbuarant :</span>{" "}
            <span className="font-bold">{car.fuel}</span>
          </span>
          <span className=" border-b-2 border-dotted flex-[50%] hover:text-[#badb57] duration-700 ease-in-out bg-transparent">
            <span>-&#62;KM :</span>{" "}
            <span className="font-bold">{car.kilo}</span>
          </span>
        </div>
        <div className="flex gap-x-6 mt-8">
          <span className=" border-b-2 border-dotted flex-[50%] hover:text-[#badb57] duration-700 ease-in-out bg-transparent">
            <span>-&#62;Disponible </span>:{" "}
            <span className="font-bold">{car.dispo ? "oui" : "non"}</span>
          </span>
          <span className=" border-b-2 border-dotted flex-[50%] hover:text-[#badb57] duration-700 ease-in-out bg-transparent">
            <span>-&#62; WW : </span>
            <span className="font-bold">{car.ww ? "oui" : "non"}</span>
          </span>
        </div>
        <div className="flex gap-x-6 mt-8">
          <span className=" border-b-2 text-3xl text-[#373a2f] border-dotted flex-[50%] font-bold hover:text-[#badb57] duration-700 ease-in-out bg-transparent">
            {car.prix} DHS/jour
          </span>
          <Rating
            name="read-only"
            className="flex-[50%]"
            value={car.rating}
            readOnly
          />
        </div>
      </div>
    );
  }

  if ((isManager || isUser) )
    return (
      <>
        <NavBar />

        <div className="flex gap-y-10 p-20 pt-8 pb-8 overflow-y-hidden text-gray-500 bg-gray-100">
          <div className="px-36 mx-16 flex flex-col pt-24 mt-20 gap-y-4 border border-gray-200 bg-white shadow-sm">
            {updateCar}
            {deleteCar}
            {readOrUpdate}
          </div>
          <div className="flex-col">
            <form
              className="p-24 mt-20 px-36 flex flex-[40%] flex-col gap-y-8  h-fit  border  bg-white shadow-sm"
              onSubmit={async (event) => {
                event.preventDefault();
                handleSubmit(loca);
              }}
            >
              
              <span className="flex text-4xl gap-x-3">
                <label>REMPLIR</label>
                <label className="text-red-500"> FORMULAIRE</label>
              </span>
              <span className="flex gap-x-3">
                <label className="flex-[25%]">Du</label>
                <input
                  value={loca.dateDu}
                  onChange={(e) => setLoca({ ...loca, dateDu: e.target.value })}
                  type="date"
                  min="2022-12-15"
                  id="fname"
                  className="flex-[25%] py-4 pl-3 rounded bg-white text-xl text-black"
                  required
                />
                <label className="flex-[25%]">Au</label>
                <input
                  value={loca.dateAu}
                  onChange={(e) => setLoca({ ...loca, dateAu: e.target.value })}
                  type="date"
                  min="2022-12-16"
                  id="fname"
                  className="flex-[25%] py-4 pl-3 rounded bg-white text-xl text-black"
                  required
                />
              </span>
              <span className="flex">
                <label className="flex-[50%]">Livrer a domicile</label>
                <input
                  checked={loca.livrer}
                  onChange={(e) =>
                    setLoca({ ...loca, livrer: e.target.checked })
                  }
                  type="checkbox"
                  id="fname"
                  className="w-8 py-4 pl-3 rounded bg-white text-xl text-black"
                />
              </span>
              <span className="flex">
                <label className="flex-[50%]">Avec Chauffeur</label>
                <input
                  checked={loca.chauffeur}
                  onChange={(e) =>
                    setLoca({ ...loca, chauffeur: e.target.checked })
                  }
                  type="checkbox"
                  id="fname"
                  className="w-8 py-4 pl-3 rounded bg-white text-xl text-black"
                />
              </span>
              <span className="flex">
                <label className="flex-[50%]">Prolongation possible</label>
                <input
                  checked={loca.prolongation}
                  type="checkbox"
                  onChange={(e) =>
                    setLoca({ ...loca, prolongation: e.target.checked })
                  }
                  id="fname"
                  className="w-8 py-4 pl-3 rounded bg-white text-xl text-black"
                />
              </span>
              <span className="flex">
                <label className="flex-[25%]">Code Promo :</label>
                <input
                  type="text"
                  id="fname"
                  className="border flex-[70%] py-4 pl-3 rounded bg-white text-xl text-black"
                  placeholder="#aoieu"
                />
              </span>
              <button
                type="submit"
                className="py-3 bg-[#5d8de7] rounded text-white font-bold"
              >
                Louer
              </button>
              {Succes(succesAdd)}
            </form>
            <div className="p-24 mt-20 px-36 font-bold  border  bg-white shadow-sm">
              Pour plus d'information, veuillez prendre un rendez vous au
              ShowRoom, ou contacter l'agence VM location.
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}

export async function getStaticProps({ params }: props) {
  const carId = params.id;

  

  const car = await prisma.car.findUnique({
    where: {
      id: carId,
    },
  });
  return {
    props: {
      car,
      
    },
  };
}

export async function getStaticPaths() {
  const cars = await prisma.car.findMany();
  let idcars = [];
  for (let m of cars) {
    idcars.push({ params: { id: m.id } });
  }

  return {
    paths: idcars,
    fallback: false,
  };
}
