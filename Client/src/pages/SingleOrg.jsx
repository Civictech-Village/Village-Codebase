/* eslint-disable func-style */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteOptions,
  fetchHandler,
  getPostOptions,
  serializeFormData,
} from "../utils";
import VillageHead from "../components/VillageHead";
import { Accordion, Icon, toggleButtonClasses } from "@mui/material";
import RemadePosts from "../components/RemadePosts";
import "../accordian.css";
import * as React from "react";
import CommentModal from "../components/CommentModal/CommentModal";
import VillageBody from "../components/VillageBody";
import VillageLocation from "../components/VillageLocation";
import VillageMembers from "../components/VillageMembers";
import Footer from "../components/LandingPage/Footer";

export default function SingleOrg() {
  const [village, setVillage] = useState({});
  const [members, setMembers] = useState([]);
  const [userJoined, setUserJoined] = useState(false);
  const [userType, setUserType] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (post) => {
    setSelectedPost(post);
    console.log('sup')
    setShow(true);
  };

  const { id } = useParams();

  const handleJoin = async () => {
    const responseData = await fetchHandler(
      "/api/villages/" + id,
      getPostOptions()
    );
    console.log(responseData);
    setUserJoined(true);
    const arr = [...members];
    if (!members.includes(userData[0].username)) {
      arr.push(userData[0].username);
      setMembers(arr);
    }
  };

  const handleLeave = async () => {
    const responseData = await fetchHandler(
      "/api/villages/" + id,
      deleteOptions
    );
    console.log(responseData);
    setUserJoined(false);
  };

  useEffect(() => {
    const doFetch = async () => {
      const responseData = await fetchHandler("/api/villageget/" + id);
      if (responseData) {
        console.log(responseData);
        if (responseData[0]) {
          setUserJoined(true);
          setUserType(responseData[0].user_type);
          const userData = await getUser(responseData[0]["user_id"]);
          console.log(userData);
          const arr = [...members];
          if (!members.includes(userData[0].username)) {
            arr.push(userData[0].username);
            setMembers(arr);
          }
        }
      }
    };
    doFetch();
  }, []);

  useEffect(() => {
    const fetchVillage = async () => {
      const result = await fetch("/api/villages/" + id);
      const data = await result.json();
      setVillage(data);
    };
    fetchVillage();
  }, []);

  return (
    <div style={{ backgroundColor: "#f7f7f8", width: "100%" }}>
      <CommentModal
        isOpen={show}
        closeModal={handleClose}
        post={selectedPost}
      />
      <VillageHead
        village={village}
        members={members.length}
        handler={handleJoin}
        leaveHandle={handleLeave}
        userJoined={userJoined}
        userType={userType}
      ></VillageHead>
      <div style={{ padding: "20px", display: "flex" }}>
        <VillageLocation></VillageLocation>
        <VillageBody handleShow={handleShow}></VillageBody>
        <VillageMembers></VillageMembers>
      </div>
      <div style={{ width: "100%", marginTop: "20px" }}>
        <Footer />
      </div>
    </div>
  );
}
