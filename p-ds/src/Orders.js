import React from 'react';
import axios from 'axios';
import { useState,useEffect } from "react";
import Orderscard from './components/Orderscard';

function Orders() {
    const [orderInfo,setOrderInfo] = useState([]);
    const temp=[...orderInfo]
    useEffect(() => {
        axios
        .get(
            "https://2q6vwbxve5.execute-api.us-east-1.amazonaws.com/prod/queuePoll"
        )
        .then((response) => {
            setOrderInfo(response.data.body[0]);
        });
    }, []);
    console.log("orderifoooo",orderInfo);
  return (
    <div>
        <Orderscard orderInfo={temp}/>
    </div>
  )
}

export default Orders;