import { Link } from "react-router-dom";
import MemberCard from "./MemberCard";

export default function UserLink({ user }) {
  return <Link to={`/users/${user.id}`}><MemberCard name={user.username} /></Link>;
}
