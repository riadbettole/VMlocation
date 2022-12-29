import Router, { useRouter } from "next/router";
import { prisma } from "../lib/prisma";
import { car, user, location } from "@prisma/client";
import { useContext, useState } from "react";
import React from "react";

export default function Location({ dataLoc }: any) {
  let filteredData: any = [];
  const [dataFilters, setDataFilters] = useState("");

  if (typeof dataFilters === "string") {
    dataLoc?.forEach((data) => {
      let dataRes =
        data.car.name +
        " " +
        data.car.marque +
        " " +
        data.user.firstname +
        " " +
        data.user.lastname;
        console.log(dataRes)
      if (dataRes.toLowerCase().indexOf(dataFilters.toLowerCase()) === -1) {
        return;
      }

      filteredData.push(data);
    });
  } else {
    filteredData = dataLoc;
  }

  return (
    <div>
      <div className="p-20 pt-28 pb-12 font-thin  bg-white text-6xl text-center">
      <input
          type="text"
          className="border rounded p-3 pr-10 w-[80vh] bg-white"
          value={dataFilters}
          placeholder="Search..."
          onChange={(e) =>
            setDataFilters(e.target.value)
          }
        />
      </div>
      <div className="px-16 bg-[#ebebeb]">
        <div className="flex flex-col hover:gap-y-6 duration-700 ease-in-out gap-y-2 py-10 font-thin text-gray-600 relative ">
          <div className="flex  relative hover:scale-105 duration-700 ease-in-out bg-white">
            <span className="flex-auto w-28">ID</span>
            <span className="flex-auto w-24">CAR NAME</span>
            <span className="flex-auto w-24">USER NAME</span>
            <span className="flex-auto w-24">DU</span>
            <span className="flex-auto w-24">AU</span>
          </div>
          {filteredData.map((data: any) => {
            return (
              <div
                key={data.loca.id}
                className="flex  relative hover:scale-105 duration-700 ease-in-out bg-white text-gray-400"
              >
                <span className="flex-auto w-28">{data.loca.id}</span>
                <span className="flex-auto w-24"> {data.car.name}</span>
                <span className="flex-auto w-24">
                  {" "}
                  {data.user.firstname} {data.user.lastname}
                </span>
                <span className="flex-auto w-24"> {data.loca.dateDu}</span>
                <span className="flex-auto w-24"> {data.loca.dateAu}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
