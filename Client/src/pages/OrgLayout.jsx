import { fetchHandler } from "../utils";
import React, { useRef } from "react";
import OrganizationPosts from "../components/OrganizationPosts";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import PostCards from "../components/PostCards";
import MemberCard from "../components/MemberCard";
import BackgroundVillage from "../components/BackgroundVillages";
import Example from "../components/Modal";
import BasicExample from "../components/NavTabs";
export default function OrgLayoutPage() {
  console.log("hello");

  //Village
  const [village, setVillage] = useState({ name: "", image: "", location: "" });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(() => {
    const doFetch = async () => {
      const responseData = await fetchHandler("/villages/:id");
      if (responseData) {
        const { name, image, location } = responseData;
        setVillage({ name, image, location });
      }
    };

    doFetch();
  }, []);

  //Posts
  const [posts, setPosts] = useState({ username: "", message: "", image: "" });

  useEffect(() => {
    const doFetch = async () => {
      const responseData = await fetchHandler("/posts");
      if (responseData) {
        const { username, message, image } = responseData;
        setPosts({ username, message, image });
      }
    };

    doFetch();
  }, []);
  const props = {
    profileUsername: "Williamsburg",
    currentUser: { id: 1 },
  };
  //Members
  const [members, setMembers] = useState({ username: "", profile_picture: "" });

  useEffect(() => {
    const doFetch = async () => {
      const responseData = await fetchHandler("/users");
      if (responseData) {
        const { username, profile_picture } = responseData;
        setMembers({ username, profile_picture });
      }
    };

    doFetch();
  }, []);

  return (
    <>
      <div>
        <div className="village">
          <h1>{village.name}</h1>
          <img src="{village.img}" alt="" />
          <h3>{village.location}</h3>
        </div>
      </div>
      <BackgroundVillage props={props} />
      <Example handleClose={handleClose} show={show}/>
      <div style={{ display: "flex", maxHeight:"600px" }}>
        <div
          className="posts"
          style={{borderRadius:"1px", display: "flex", backgroundColor:"grey",flexDirection: "column", width:"100%", justifyContent:"center", alignItems:"center" }}
        >
            <BasicExample></BasicExample>
          <h1>Posts</h1>
          <Button onClick={handleShow}>Create Post</Button>
          <div style={{overflowY:'scroll', maxHeight:"55%"}}>
          <PostCards />
          <PostCards />
          <PostCards />
          <PostCards />

          </div>

          <h3>{posts.username}</h3>
          <h3>{posts.message}</h3>
        </div>

        <div className="members" style={{textAlign:'center'}}>
          <h1>Members</h1>
          {/* <h2>{members.username}</h2>
        <img src="{members.profile_picture}" alt="" /> */}
          <MemberCard />
          <MemberCard />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Show More
          </Button>
        </div>
      </div>
    </>
  );
}
