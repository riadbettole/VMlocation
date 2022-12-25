import React from "react";


export default function Home() {
  return (
    <div className="w-screen text-3xl bodyIndex ">
      <div className="grid justify-center mt-12  ">
          <span className="text-center py-2">LOCALISATION</span>
        <div className="w-screen h-[600px]  flex flex-col gap-y-3 bg-[#d1cbc1]   shadow-gray-700">
          <iframe
            className="h-[75vh]"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13294.524831128008!2d-7.6051986!3d33.5889234!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf9b8c0263f4788f2!2sEmsi%20-%20Ecole%20Marocaine%20Des%20Sciences%20De%20L&#39;ing%C3%A9nieur%20Centre%201!5e0!3m2!1sfr!2sma!4v1671667730938!5m2!1sfr!2sma"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
