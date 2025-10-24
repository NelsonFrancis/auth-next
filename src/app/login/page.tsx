"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const onLogin = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            router.push("/profile")
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="container">
            <form onSubmit={onLogin}>
                <h1>Login</h1>
                <input type="email" placeholder="Enter email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
                <input type="password" placeholder="Enter password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} />
                <button type="submit">Submit</button>
            </form>
            <div className="login_links">
                <Link className="back_link" href="/signup">Back to signup</Link>
                <Link className="back_link" href="/forgotpassword">Forgot password?</Link>
            </div>
        </div>
    )
}