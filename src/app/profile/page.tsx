"use client"
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage(){
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
            <h1>Profile page</h1>
            <button onClick={logout} className="logout">Logout</button>
        </>
    )
}