"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage(){
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("")
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data);
        setUsername(res.data.data.username);
    }

    useEffect(() => {
        getUserDetails();
    },[])

    return(
        <>
            <h1>Profile page</h1>
            <p>Welcome {username}</p>
            <button onClick={logout} className="logout">Logout</button>
        </>
    )
}