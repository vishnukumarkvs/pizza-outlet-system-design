import axios from "axios";
import { useEffect, useState } from "react";
import { Maincard } from "../components/Maincard";

interface Pizza {
  title: string;
  url: string;
  count:number;
}
interface Cart{
  title: string;
  count: number;
}

export default function Home() {
  const [pizzaInfo, setPizzaInfo] = useState<Pizza[]>();
  const [cartItems, setCartItems] = useState<Cart[]>([]);

  // const addToCart = (item:Cart) => {
  //   setCartItems([...cartItems, item]);
  // }
  


  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://bo6kdqch4k.execute-api.us-east-1.amazonaws.com/prod/pizzatypes"
  //     )
  //     .then((response) => {
  //       setPizzaInfo(response.data.body);
  //     });
  // }, []);
  // console.log(pizzaInfo);
  // console.log(cartItems);
  useEffect(()=>{
    setPizzaInfo([{
      "url": "https://pizzads.s3.amazonaws.com/bacon.jpg",
      "title": "Bacon",
      "count":0
  },
  {
    "url": "https://pizzads.s3.amazonaws.com/salami.jpg",
    "title": "Salami",
    "count":0
  }])
  },[])
  //   {
  //     "url": "https://pizzads.s3.amazonaws.com/bacon.jpg",
  //     "title": "Bacon"
  // },
  // {
  //   "url": "https://pizzads.s3.amazonaws.com/salami.jpg",
  //   "title": "Salami"
  // }
  const change=(idx:number,flag:boolean)=>{
    let temp=cartItems;
    if(flag) temp[idx].count+=1;
    else temp[idx].count-=1;
    setCartItems(temp);
  }
  return (
    <h1 className="bg-[#af2222] h-screen">
      <div>
        <p className="text-center m-4 p-4 font-bold text-4xl">
          {" "}
          You Pizza Choice?
        </p>
        <button onClick={()=>{console.log(pizzaInfo)}}>Cart</button>
      </div>
      <div className="grid grid-cols-3 gap-4 m-7">
        {pizzaInfo &&
          pizzaInfo.map((pizza, index) => (
            <Maincard key={index} idx={index} pizza={pizza} change={change} />
          ))}
      </div>
    </h1>
  );
}
