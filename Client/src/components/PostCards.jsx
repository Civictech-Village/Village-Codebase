import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { fetchHandler } from "../utils";
import { getPostOptions } from "../utils";
import { useEffect, useState } from "react";
import { deleteOptions } from "../utils";
const PostCards = ({elem}) => {
  const [like, setLikes] = useState(0)
  const [hasliked, setHasLiked] = useState(false)
  useEffect(() => {
    const fetch = async () => {
      const result = await fetchHandler('/api/like/' + elem.post_id)
      const hasLiked = await fetchHandler('/api/hasliked/' + elem.post_id)
      setLikes(result)
      setHasLiked(hasLiked[0])
    }
    fetch()
  },[])
  console.log(elem)
  const handleClick = async () => {
    const result = await fetchHandler('/api/like/' + elem.post_id, getPostOptions())
    console.log(result)
    return result
  }
  const handleDelete = async () => {
    const result = await fetchHandler('/api/destroylike/' + elem.post_id, deleteOptions)
    console.log(result)
    return result
  }
  return (
    <Card style={{ width: "25rem", marginTop:10 }}>
      <Card.Img variant="top" src="https://www.bing.com/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&w=187&h=97&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" />
      <Card.Body>
        <Card.Title>{elem.name}</Card.Title>
        <Card.Text>{elem.message}</Card.Text>
        {hasliked ? <FavoriteIcon onClick={handleDelete}/> : <FavoriteBorderIcon onClick={handleClick} sx={{marginRight:'5px',}}/> }
        {like}
        <ChatBubbleOutlineIcon  sx={{marginLeft:3}}/>
      </Card.Body>
    </Card>
  );
}

export default PostCards;
