import Nav from 'react-bootstrap/Nav';

export default function BasicExample() {
  return (
    <Nav
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link href="/home">Posts</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Issues</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

