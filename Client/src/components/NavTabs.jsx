import Nav from 'react-bootstrap/Nav';

export default function BasicExample({handleIssues, handlePost}) {
  return (
    <Nav
      variant="pills"
    >
      <Nav.Item onClick={handleIssues}>
        <Nav.Link>Posts</Nav.Link>
      </Nav.Item>
      <Nav.Item onClick={handlePost}>
        <Nav.Link>Issues</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

