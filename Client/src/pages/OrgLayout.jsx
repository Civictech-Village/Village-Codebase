import { fetchHandler } from "../utils";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
export default function OrgLayoutPage() {
    console.log('hello')
    const [village, setVillage] = useState({ name: "", image: "" ,location:""});

  useEffect(() => {
    
    const doFetch = async () => {
      const responseData = await fetchHandler('/villages/:id');
      if (responseData) {
        const { name, image, location } = responseData;
        setVillage({ name, image, location });
      }
    };

    doFetch();
  },[]); 

  return (
    <>
      <div className="village">
        <h1>{village.name}</h1>
        <img src="{village.img}" alt="" />
        <h3>{village.location}</h3>
      </div>
    <>
    <div>
      <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Follow
              </Button>
    </div>
    <div>
        <h1>Posts</h1>
        <>
        <h2>Profile:</h2>
        <img src="" alt="" />
        <p>Issue description</p>
        <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Like
              </Button>
        </>
    </div>
    </>
    </>
  );
  }
