"use client"
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
// import { useRouter } from "next/navigation";

export default function ForgotPassword(){
    // const router = useRouter();
    const [email, setEmail] = useState("");

    const onForgotPassword = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/users/forgotpassword", {email});
            console.log(res);
            // router.push("/resetpassword");
        } catch (error) {
            console.log(error);
        }
    }
    return(
         <div className="container">
            <form onSubmit={onForgotPassword}>
                <h1>Forgot password</h1>
                <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            <Link className="back_link" href="/login">Back to login</Link>
        </div>
    )
}