import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const MemberCard = () => {
  return (
    <Card style={{ width: "28rem", display:"flex",flexDirection:"row"}}>
      <Card.Img roundedCircle variant="left" src="https://www.bing.com/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&w=187&h=97&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" />
      <Card.Body>
        <Card.Title>Member</Card.Title>
        <Card.Text>Description</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MemberCard;