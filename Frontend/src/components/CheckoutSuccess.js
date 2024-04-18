import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";


const token = localStorage.getItem('token')

export default function Test() {

    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true)
    console.log(searchParams.get("session_id"))

    async function createOrder(){
        let data = {
            session_id: searchParams.get("session_id"),
            user_id: searchParams.get("user_id")
        }
        let res = await fetch(
            `/api/v1/order/checkout-success`,
            {
                    method: 'POST',
                    headers: {'Authorization': `Bearer ${token}`, "Content-Type" : "application/json"},
                    body: JSON.stringify(data)
            }
        )

        if(res.ok){
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(searchParams.get("session_id")){
            createOrder()
        }
    }, [])

    return (
        <>
            <div>
                {!isLoading ?
                    <h1>Order Placed !</h1>
                    :
                    <div className="spinner-border m-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }
            </div>
        </>
    );
  }