import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const MemberCard = ({ name, profilePic }) => {
  console.log(profilePic)
  return (
    <Card style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
      <Card.Img
        variant="left"
        style={{maxHeight:'100px'}}
        src={
          profilePic
            ? profilePic
            : "https://www.bing.com/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&w=187&h=97&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
        }
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default MemberCard;
