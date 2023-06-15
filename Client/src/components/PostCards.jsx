import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const PostCards = ({elem}) => {
  console.log(elem)
  return (
    <Card style={{ width: "25rem", marginTop:10 }}>
      <Card.Img variant="top" src="https://www.bing.com/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&w=187&h=97&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" />
      <Card.Body>
        <Card.Title>{elem.name}</Card.Title>
        <Card.Text>{elem.message}</Card.Text>
        <FavoriteBorderIcon sx={{marginRight:3}}/>
        <ChatBubbleOutlineIcon />
      </Card.Body>
    </Card>
  );
}

export default PostCards;
