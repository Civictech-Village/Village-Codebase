/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchHandler } from "../utils";
import VillageHead from "../components/VillageHead";

export default function SingleOrg() {
    const [village, setVillage] = useState({});
    const {id} = useParams();
    useEffect(() => {
        const fetchVillage = async () => {
         const result = await fetch("/api/villages/" + id);
         const data = await result.json();
         setVillage(data);
        };
        fetchVillage();
    }, []);
    
    return (
        <div>
            <VillageHead village={village}></VillageHead>
        </div>
    );
}
