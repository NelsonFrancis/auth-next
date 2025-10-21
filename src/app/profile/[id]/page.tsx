"use client"

import { useParams } from "next/navigation";

export default function ProfileDetails(){
    const params = useParams();
    return(
        <>
            <p>Profile detail page for {params.id}</p>
        </>
    )
}