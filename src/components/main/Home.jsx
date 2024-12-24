import React from "react";
import Landing from "./../main/Landing";
import HealthList from "../details/HealthList";

const Home = () => {
  return (
    <div className="w-full">
      <Landing />
      <div className="flex justify-center items-center">
        <div className="mt-44 mb-3 w-[90%] sm:w-[600px] lg:w-[800px] xl:w-[1100px] mx-auto">
          <div className="">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">건강정보</h2>
            <HealthList/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
