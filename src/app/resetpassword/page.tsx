"use client"
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPassword(){
    const searchParams = useSearchParams();
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onResetPassword = async (e: any) => {
        e.preventDefault();
        if(newPassword !== confirmPassword){
            console.log("New password is not same as confirm password");
            return;
        }
        try {
            const res = await axios.post("/api/users/resetpassword", {token, newPassword, confirmPassword});
            console.log(res);
        } catch (error:any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const urlToken = searchParams.get("token") || "";
        console.log(urlToken);
        setToken(urlToken);
    },[])

    return(
        <div className="container">
            <form onSubmit={onResetPassword}>
                <h1>Reset password</h1>
                <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}