"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const onSignUp = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/users/signup", user);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    } 

    return(
        <div className="container">
            <form onSubmit={onSignUp}>
                <h1>Sign up</h1>
                <input type="text" placeholder="Enter username" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} />
                <input type="email" placeholder="Enter email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
                <input type="password" placeholder="Enter password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} />
                <button type="submit">Submit</button>
            </form>
            <Link className="back_link" href="/login">Back to login</Link>
        </div>
    )
}