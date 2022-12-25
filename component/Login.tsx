import Router, { useRouter } from "next/router";
import { user } from "@prisma/client";
import { useState } from "react";
import React from "react";
import Link from "next/link";

interface props {
  users: user[];
}

export default function Login({ users }: props) {
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

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  let User: user;

  const handleSubmit = async (data: user) => {
    for (const u of users) {
      if (u.email === data.email && u.mdp === data.mdp) {
        User = u;
        return true;
      }
    }
    return false;
  };

  return (
    <div className="flex align-middle justify-center mt-12 mx-36 h-[75vh] relative">
      <form
        className="p-24 flex flex-col gap-y-3 bg-[#e9e9e9] rounded-t-xl rounded-b-xl rounded-l-xl rounded-r-none shadow-xl shadow-gray-700"
        onSubmit={async (event) => {
          event.preventDefault();
          if (await handleSubmit(form)) {
            window.localStorage.setItem("id", User.id);
            window.localStorage.setItem("email", form.email);
            window.localStorage.setItem("mdp", form.mdp);
            window.localStorage.setItem("rank", User.rank);
            Router.back();
          }
        }}
      >
        <label className="text-3xl text-gray-400">Info:</label>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          required
          id="fname"
          className="py-4 pl-3 rounded bg-white text-xl text-black"
          placeholder="Email"
        ></input>
        <input
          value={form.mdp}
          onChange={(e) => setForm({ ...form, mdp: e.target.value })}
          type="password"
          required
          id="fname"
          className="py-4 pl-3 rounded bg-white text-xl text-black"
          placeholder="Password"
        ></input>
      <button type="submit" className="py-3 bg-red-500 hover:bg-[#ff0101] duration-500 ease-in-out rounded text-white text-2xl"> Submit </button>
        <Link
          className="flex gap-x-4 absolute bottom-20 hover:text-[#badb57] duration-700 ease-in-out bg-transparent"
          href="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 translate-y-2"
          >
            <path
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span className="text-3xl text-center font-thin">Return home </span>
        </Link>
      </form>
      <div className="w-[600px] h-[75vh] relative">
          <span className="absolute p-10 text-[#ffffff] text-6xl textLogin">Nouveau à VM LOCATION ?</span>
          <Link
            className="absolute p-10 bottom-24 right-0 textSign text-8xl text-red-500 hover:text-[#ffffff] duration-700 ease-in-out bg-transparent"
            href="/signin"
          >SIGN IN</Link>
        <img
          src="https://i0.wp.com/propulsion5.com/wp-content/uploads/2020/04/cle-porsche.jpg?fit=770%2C572&ssl=1"
          className="absolute z-[-1] object-fill blur-sm h-[75vh]"
        />
      </div>
    </div>
  );
}
