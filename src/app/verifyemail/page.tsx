"use client"
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmail(){
    const searchParams = useSearchParams();
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
        } catch (error: any) {
            console.log(error);
            setError(error);
        }
    }

    useEffect(() => {
        const urlToken = searchParams.get("token") || "";
        console.log(urlToken);
        setToken(urlToken);
    },[])

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail();
        }
    },[token])

    return(
        <>
            <h1>User verification page</h1>
            {verified && <p>User verified</p>}
        </>
    )
}