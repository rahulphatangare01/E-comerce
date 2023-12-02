// import React from 'react'

// function Nav() {
//   return (
//     <div>Nav</div>
//   )
// }

// export default Nav
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Ecommerce App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Products</Nav.Link>
            <Nav.Link href="#action2">Contact</Nav.Link>
            <Nav.Link href="#action2">About</Nav.Link>

          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
          <Nav.Link href="#"><img src='../../images/logo.jpg' width={20} height={20}></img> </Nav.Link>
          <Nav.Link href="#"> <img src='../../images/id-badge-solid.svg' width={20} height={20}></img> </Nav.Link>
          <Nav.Link href="#">About</Nav.Link>
 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;