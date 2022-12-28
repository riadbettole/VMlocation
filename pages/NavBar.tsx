import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";

function App() {
  const router = useRouter();
  const refreshData = () => {
    router.reload();
  };

  let available;
  let signout = (
    <svg
      className="cursor-pointer hover:text-[#badb57] duration-700 ease-in-out bg-transparent"
      onClick={() => {
        window.localStorage.clear();
        refreshData();
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="gray"
    >
      <path d="M10 2v2h12v16h-12v2h14v-20h-14zm0 7.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7z" />
    </svg>
  );

  const [rank, setRank] = useState("");

  useEffect(() => {
    const localRank = localStorage.getItem("rank");
    if (localRank !== null) setRank(localRank);
  });

  let search = <></>;
  if (router.asPath === "/" || router.asPath === "/#filter")
    search = (
      <Link href="#filter" scroll={false}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </Link>
    );

  if (rank === "user") {
    available = <>
    <Link
          className="hover:text-[#badb57] text-orange-300 duration-700 ease-in-out bg-transparent"
          href="/myCars"
        >
          My cars
        </Link>
    {signout}</>;
  } else if (rank === "manager") {
    available = (
      <>
      <Link
          className="hover:text-[#badb57] text-orange-300 duration-700 ease-in-out bg-transparent"
          href="/myCars"
        >
          My cars
        </Link>
        <Link
          className="hover:text-[#badb57] text-red-600 duration-700 ease-in-out bg-transparent"
          href="/addcar"
        >
          Add car
        </Link>
        <Link
          className="hover:text-[#badb57] text-red-600 duration-700 ease-in-out bg-transparent"
          href="/locations"
        >
          Locations
        </Link>
        {signout}
      </>
    );
  } else
    available = (
      <>
        <Link
          className="hover:text-[#badb57] duration-700 ease-in-out bg-transparent"
          href="/login"
        >
          Login
        </Link>
      </>
    );
  return (
    <>
      <div className="bg-white text-gray-500 flex text-3xl justify-center items-center space-x-10 p-10 w-full h-10 fixed z-10 shadow-[0_4px_14px_0_rgba(50,50,50,0.3)] ">
        <Link
          className="hover:text-[#badb57] duration-700 ease-in-out bg-transparent"
          href="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>
        {search}
        
        {/* <Link
          className="hover:text-[#badb57] duration-700 ease-in-out bg-transparent"
          href="/about"
        >
          About
        </Link> */}
        <Link
          className="hover:text-[#badb57] duration-700 ease-in-out bg-transparent"
          href="/rdv"
        >
          RDV
        </Link>
        
        {available}
      </div>
    </>
  );
}

export default App;
