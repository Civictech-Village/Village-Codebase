/* eslint-disable func-style */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchHandler } from "../utils";
import VillageHead from "../components/VillageHead";
import { Accordion, Icon, toggleButtonClasses } from "@mui/material";
import RemadePosts from "../components/RemadePosts";
import "../accordian.css";
import * as React from 'react';

import VillageBody from "../components/VillageBody";
import VillageLocation from "../components/VillageLocation";
import VillageMembers from "../components/VillageMembers";

export default function SingleOrg() {
    const [village, setVillage] = useState({});
    const { id } = useParams();
  
    useEffect(() => {
        const fetchVillage = async () => {
         const result = await fetch("/api/villages/" + id);
         const data = await result.json();
         setVillage(data);
        };
        fetchVillage();
    }, []);

    return (
        <div style={{ backgroundColor: "#f7f7f8" }}>
            <VillageHead village={village} ></VillageHead>
            <div style={{ padding: "20px", display: "flex" }}>
                <VillageLocation></VillageLocation>
                <VillageBody></VillageBody>
                <VillageMembers></VillageMembers>
            </div>
        </div>
    );
}
