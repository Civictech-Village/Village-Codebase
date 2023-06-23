import { useEffect, useState } from "react";
import { getAllUsers } from "../adapters/user-adapter";
import UserLink from "../components/UserLink";
import React from 'react'

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return <>
    <h1>Users</h1>
    <ul style={{width:"100%", display:"flex"}}>
      {
        users.map((user) => <li style={{listStyle:"none", margin:"0 20px"}} key={user.id}><UserLink user={user} /></li>)
      }
    </ul>
  </>;
}
