import Router, { useRouter } from "next/router";
import { prisma } from "../lib/prisma";
import { car, user, location } from "@prisma/client";
import { useContext, useState } from "react";
import React from "react";

interface dataLoc{
    dataLoc : any,
    car : car,
    user: user,
    loca: location,
}

export default function Location({ dataLoc }:dataLoc) {
  return (
    <div>
      <div className="py-24 bg-white">Locations</div>
      <div className="px-16 bg-[#ebebeb]">
        <div className="flex flex-col hover:gap-y-6 duration-700 ease-in-out gap-y-2 py-10 font-thin text-gray-400 relative">
          {dataLoc.map((data) => {
            return (
              <div
                key={data.loca.id}
                className="border border-black relative hover:scale-105 duration-700 ease-in-out"
              >
                {data.loca.id} {data.car.name} {data.user.firstname}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
