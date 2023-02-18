import Router, { useRouter } from "next/router";
import { user } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import React from "react";
import Link from "next/link";

function AddUser() {
  const [form, setForm] = useState<user>({
    id: "",
    firstname: "",
    lastname: "",
    tel: "",
    email: "",
    mdp: "",
    adresse: "",
    avatar: "",
    rank: "user",
    cin: "",
    verified: false,
  });

  // const router = useRouter()
  // const refreshData = () => {
  //     router.replace(router.asPath)
  //   }

  async function create(data: user) {
    try {
      fetch("http://localhost:3000/api/createUser", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        setForm({
          id: "",
          firstname: "",
          lastname: "",
          tel: "",
          email: "",
          mdp: "",
          adresse: "",
          avatar: "",
          rank: "user",
          cin: "",
          verified: false,
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  const router = useRouter();
  const handleSubmit = async (data: user) => {
    try {
      create(data);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   localStorage.setItem('prev',router.pathname)
  // })

  return (
    <>
      <div className="flex align-middle justify-center mt-12 mx-36 h-[75vh] relative">
        <div className="relative p-24 pb-24 w-[75vh] h-[90vh]  bg-[#e9e9e9] rounded-t-xl rounded-b-xl rounded-l-xl rounded-r-none shadow-xl shadow-gray-700">
        <form
          className=" flex flex-col gap-y-3 translate-y-[-3rem]"
          onSubmit={async (event) => {
            event.preventDefault();
            handleSubmit(form);
          }}
        >
          
          <label className="text-5xl mb-2 w-96 text-gray-400 font-thin">Inscription :</label>
          <input
            value={form.firstname}
            onChange={(e) => setForm({ ...form, firstname: e.target.value })}
            required
            type="text"
            id="fname"
            className="py-4 pl-3 rounded bg-white text-xl text-black"
            placeholder="first Name"
          ></input>
          <input
            value={form.lastname}
            onChange={(e) => setForm({ ...form, lastname: e.target.value })}
            required
            type="text"
            id="fname"
            className="py-4 pl-3 rounded bg-white text-xl text-black"
            placeholder="last Name"
          ></input>
          <input
            value={form.tel}
            onChange={(e) => setForm({ ...form, tel: e.target.value })}
            required
            type="text"
            id="fname"
            className="py-4 pl-3 rounded bg-white text-xl text-black"
            placeholder="06.."
          ></input>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            type="email"
            id="fname"
            className="py-4 pl-3 rounded bg-white text-xl text-black"
            placeholder="email"
          ></input>
          <input
            value={form.mdp}
            onChange={(e) => setForm({ ...form, mdp: e.target.value })}
            required
            type="password"
            id="fname"
            className="py-4 pl-3 rounded bg-white text-xl text-black"
            placeholder="mot de passe"
          ></input>
          <input
            value={form.adresse}
            onChange={(e) => setForm({ ...form, adresse: e.target.value })}
            required
            type="text"
            id="fname"
            className="py-4 pl-3 rounded bg-white text-xl text-black"
            placeholder="@adresse"
          ></input>
          {/* <input value={form.avatar} onChange={e => setForm({...form, avatar: e.target.value})} required type='text'   id="fname" className="py-4 pl-3 rounded bg-white text-xl text-black"  placeholder="link pic"></input>  */}
        

          <button type="submit" className="mt-4 py-3 bg-red-500  hover:bg-[#ff0101] duration-500 ease-in-out text-white ">
            Submit
          </button>
        </form>
                  <Link
            className="flex gap-x-4 absolute top-2 left-4 hover:text-[#badb57] duration-700 ease-in-out bg-transparent"
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="gray"
              className="w-10 h-10"
            >
              <path
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
        </div>
        <div className="w-[600px] h-[75vh] relative textLogin">
          <span className="absolute p-10 text-white text-5xl ">
            PREMIERE LOCATION
          </span>
          <span className="absolute p-10 top-20 left-10 text-white text-7xl ">
            REMISE 10%
          </span>
          <Link
            className="absolute p-10 bottom-0 right-0  text-8xl text-red-500 textSign   hover:text-[#ffffff] duration-700 ease-in-out bg-transparent"
            href="/login"
          >
            LOGIN
          </Link>
          <img
            src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iPb4k3zukNz4/v1/-1x-1.jpg"
            className="absolute z-[-1] object-fill blur-sm h-[80vh] scale-x-105 translate-y-5"
          />
        </div>
      </div>
    </>
  );
}

export default AddUser;
