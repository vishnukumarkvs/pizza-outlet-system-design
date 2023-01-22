import { useState,useEffect } from "react";
import { Maincard } from "./components/Maincard";
import axios from "axios";


function Home() {
    const [pizzaInfo, setPizzaInfo] = useState();

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://bo6kdqch4k.execute-api.us-east-1.amazonaws.com/prod/pizzatypes"
  //     )
  //     .then((response) => {
  //       setPizzaInfo(response.data.body);
  //     });
  // }, []);
  useEffect(()=>{
    setPizzaInfo(
      [{
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
  const change=(idx,flag)=>{
    let temp=[...pizzaInfo];
    if(flag) temp[idx].count++;
    else temp[idx].count--;
    setPizzaInfo(temp);
    console.log(idx,flag,temp)
  }
  return (
    
    <div className="Home">
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
    </div>
  );
}

export default Home