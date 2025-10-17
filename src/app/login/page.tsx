"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage(){
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    return(
        <div className="container">
            <form>
                <h1>Login</h1>
                <input type="email" placeholder="Enter email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
                <input type="password" placeholder="Enter password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} />
                <button>Submit</button>
            </form>
            <Link className="back_link" href="/signup">Back to signup</Link>
        </div>
    )
}