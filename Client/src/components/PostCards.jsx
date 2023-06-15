import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";

const PostCards = () => {
  return (
    <Card style={{ width: "25rem" }}>
      <Card.Img variant="top" src="https://www.bing.com/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&w=187&h=97&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" />
      <Card.Body>
        <Card.Title>Issue</Card.Title>
        <Card.Text>Description</Card.Text>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>{" "}
      </Card.Body>
    </Card>
  );
}

export default PostCards;
