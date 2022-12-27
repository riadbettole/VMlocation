import React, { useState } from "react";
import { car } from "@prisma/client";
import Link from "next/link";
import { Switch } from "@headlessui/react";
import Slider from '@mui/material/Slider';

interface filters {
  filterText: string;
  Dispo: boolean;
  Carbu: boolean;
  ww: boolean;
}

interface States {
  type?: string;
  cars?: car[];
  carFilters?: filters;
  slider?: number[];
  onFilterChange?: (e: filters) => void;
  onSetSlider?: (e: number[]) => void;
}

function InputSlider({slider,onSetSlider}:States){
  const marks = [
    {
      value: 0,
      label: '0DHS',
    },
    {
      value: 2000,
      label: '2000DHS',
    },
  ];

    
  
    const handleChange = (event: Event, newValue: number | number[]) => {
      onSetSlider!(newValue as number[]);
    };
  
    return (
      <div className="w-96">
        <Slider
          slotProps={{
            root: { className: ' w-full inline-block h-2 cursor-pointer' },
            thumb: { className: ' ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute' },
            // rail: { className: 'bg-slate-100 dark:bg-slate-700 h-2 w-full rounded-full block absolute' },
            // track: { className: 'bg-cyan-500 dark:bg-cyan-400 h-2 block rounded-full' }
          }}
          value={slider}
          onChange={handleChange}
          valueLabelDisplay="auto"
          marks={marks}
          min={0}
          max={2000}
        />
      </div>
    );
  }


function FilterCars({ slider, onSetSlider, carFilters, onFilterChange }: States) {

  return (
    <form className="bg-[#fafafa] p-10 w-screen space-y-7 flex flex-col justify-center items-center">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="gray"
          className="w-6 h-6"
          id="filter"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      <div className=" flex text-xl gap-x-10 space-x-5 bg-transparent">
        <label className="text-2xl bg-transparent">Marque : </label>
        <input
          type="text"
          className="border rounded p-3 pr-10"
          value={carFilters!.filterText}
          placeholder="Search..."
          onChange={(e) =>
            onFilterChange!({ ...carFilters!, filterText: e.target.value })
          }
        />
        <InputSlider slider={slider} onSetSlider={onSetSlider}/>

        <div>
            <Switch
              checked={carFilters!.Dispo}
              onChange={(e: boolean) => {
                onFilterChange!({ ...carFilters!, Dispo: e });
              }}
              className={`${
                carFilters!.Dispo ? "bg-[#5d8de7]" : "bg-gray-200"
              }  inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  carFilters!.Dispo ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>

            <label className="bg-inherit">Dispo uniquement</label>
        </div>
        <div>
            <Switch
              checked={carFilters!.ww}
              onChange={(e: boolean) => {
                onFilterChange!({ ...carFilters!, ww: e });
              }}
              className={`${
                carFilters!.ww ? "bg-[#5d8de7]" : "bg-gray-200"
              }  inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  carFilters!.ww ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <label className="bg-inherit">WW uniquement</label>
        </div>
      </div>
    </form>
  );
}

function FilteredCarsTable({ slider, carFilters, cars }: States) {
  let filteredCars: any = [];
  console.log("meow")
  console.log(slider)


  if (typeof carFilters!.filterText !== "string") return <></>;

  cars?.forEach((car) => {
    let carF = car.name + " " + car.marque 
    if (
      carF.toLowerCase().indexOf(carFilters!.filterText.toLowerCase()) === -1
    ) {
      return <></>;
    }
    if (carFilters!.Dispo && !car.dispo) {
      return <></>;
    }
    if (carFilters!.ww && !car.ww) return <></>;
    
    if (car.prix > slider![1]) return <></>;
    if (car.prix < slider![0]) return <></>;

    filteredCars.push(car);
  });

  if (filteredCars.length !== 0)
    return (
      <div className="px-16 bg-[#ebebeb]">
        <div className="flex flex-col hover:gap-y-6 duration-700 ease-in-out gap-y-2 py-10 font-thin text-gray-400 relative">
          {filteredCars.map((car: car) => {
            return (
              <div key={car.id} className="relative hover:scale-105 duration-700 ease-in-out">
              <Link
                href={`/cars/${car.id}`}
                key={car.id}
                className="flex rounded p-2 shadow-md bg-[#ffffff] "
              >
                <img
                  src={car.image}
                  className="object-fill h-[400px] w-[600px] rounded  "
                />
                <div className="flex flex-col p-6">
                  <span className="font-semibold uppercase text-[#3d3d3d]">{car.name} {car.marque}</span>
                  <span className="mt-56">
                    <span className="text-[#7dff13]">{car.prix} dhs</span>
                    /jour
                  </span>
                </div>
              </Link>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12  fleche top-5 right-5 " fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
            </svg>
            </div>
            );
          })}
        </div>
      </div>
    );
  return <div className="p-24 text-3xl flex align-items justify-center text-center "> Pas de voiture pour le moment</div>;
}

function DisplayCars({ slider, cars, carFilters }: States) {
  return (
    <>
      <FilteredCarsTable slider={slider} cars={cars} carFilters={carFilters} />
    </>
  );
}

function App({ cars }: States) {
  const [filters, setFilters] = useState<filters>({
    filterText: "",
    Dispo: true,
    Carbu: false,
    ww: false,
  });
  const [slider, setSlider] = useState<number[]>([0, 2000]);
  return (
    <div>
      <FilterCars slider={slider} onSetSlider={setSlider} carFilters={filters} onFilterChange={setFilters} />
      <DisplayCars slider={slider} cars={cars} carFilters={filters} />
    </div>
  );
}

export default App;
