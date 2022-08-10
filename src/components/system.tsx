import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { System } from "../utils/system";


export default function OneSystem() {
    const location = useLocation();
    const idSystem = location.state;
    const [system, setSystems] = useState();


    async function getSystemById() {
        try {
            const res = await axios.get('http://localhost:3333/system/' + idSystem)
            const system = await res.data;
            setSystems(system);
        } catch (error) { console.log(error); }
    }

    useEffect(() => {
        getSystemById();
    }, [])
    return (
        <div className="details">
            <span>{system}</span>
        </div>
    );
}


