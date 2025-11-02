import { Navbar as BootstrapNavbar, Container, Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <BootstrapNavbar bg="white" variant="light" expand="lg" className="shadow-sm mb-4" style={{ borderBottom: '1px solid #e9ecef' }}>
      <Container>
        <BootstrapNavbar.Brand href="#home" className="d-flex align-items-center fw-bold text-primary">
          <i className="bi bi-clipboard-data me-2"></i> CRUD Application
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="d-flex align-items-center">
            <Button variant="outline-primary" onClick={handleLogout} className="px-4 py-1 fw-semibold d-flex align-items-center">
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
