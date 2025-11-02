import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 py-4">
      <Row className="justify-content-center text-center">
        <Col xs={12} md={8} lg={6}>
          <div className="d-flex justify-content-center mb-4">
            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
              <i className="bi bi-exclamation-triangle" style={{ fontSize: '60px', color: '#dc3545' }}></i>
            </div>
          </div>
          <h1 className="display-1 fw-bold text-primary mb-2">404</h1>
          <h2 className="mb-3">Page Not Found</h2>
          <p className="text-muted mb-4 fs-5">
            Sorry, we couldn't find the page you're looking for. It might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 fw-semibold d-flex align-items-center justify-content-center mx-auto"
          >
            <i className="bi bi-arrow-left-circle me-2"></i>
            Back to Dashboard
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
