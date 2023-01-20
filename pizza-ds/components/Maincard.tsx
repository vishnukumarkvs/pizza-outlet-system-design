import React, { useEffect, useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

interface Cart {
  title: string;
  count: number;
}

interface IMaincardProps {
  pizza: any;
  change: any;
  idx:any;
}

export const Maincard: React.FC<IMaincardProps> = (props) => {
  const [count,setCount]=useState(props.pizza.count);
  return (
    <div className="bg-[#fdfdfd] rounded-md shadow-lg w-[450px]">
      <div className="flex flex-col m-2">
        <p className="text-2xl font-bold text-center p-2">
          {props.pizza.title}
        </p>
        <div className="flex flex-wrap justify-center">
          <div className="w-full px-4">
            <img
              src={props.pizza.url}
              alt="..."
              className="shadow rounded max-w-full h-[300px] align-middle border-none object-cover"
            />
          </div>
        </div>
        <div className="flex flex-row justify-around border-2 m-3 p-1">
          <MinusIcon
            onClick={() => {
              props.change(props.idx,0);
            }}
            className="bg-emerald-200 border-2 w-full text-center h-6"
          />
          <h3 className="border-2 w-full text-center font-semibold h-6">
            {count}
          </h3>
          <PlusIcon
            onClick={() => {
             props.change(props.idx,1);
            }}
            className="bg-emerald-200 border-2 w-full text-center h-6"
          />
        </div>
      </div>
    </div>
  );
};
