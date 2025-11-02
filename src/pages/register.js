import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, Container, Alert, Spinner, Row, Col } from "react-bootstrap";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error saat user mulai mengetik
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await api.post("/auth/register", form);
      setMessage({
        type: "success",
        text: "Registration successful! Redirecting to login page...",
      });

      // Redirect ke login setelah 2 detik
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed. Please try again.";
      setMessage({ type: "danger", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 py-4">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={5} xl={4}>
          <Card className="shadow-lg border-0 rounded-4 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
            <Card.Body>
              <div className="text-center mb-4">
                <div className="d-flex justify-content-center mb-3">
                  <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-person-plus-fill" style={{ fontSize: '30px', color: 'white' }}></i>
                  </div>
                </div>
                <h2 className="fw-bold mb-2">Create Account</h2>
                <p className="text-muted mb-0">Join us today</p>
              </div>

              {message.text && (
                <Alert variant={message.type} dismissible onClose={() => setMessage({ type: "", text: "" })} className="mt-3">
                  {message.text}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label className="fw-semibold">Full Name</Form.Label>
                  <Form.Control 
                    name="name" 
                    placeholder="Enter your full name" 
                    value={form.name} 
                    onChange={handleChange} 
                    isInvalid={!!errors.name} 
                    disabled={loading} 
                    className="rounded-pill py-2 px-3"
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="fw-semibold">Email Address</Form.Label>
                  <Form.Control 
                    name="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={form.email} 
                    onChange={handleChange} 
                    isInvalid={!!errors.email} 
                    disabled={loading} 
                    className="rounded-pill py-2 px-3"
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                  </div>
                  <Form.Control 
                    name="password" 
                    type="password" 
                    placeholder="Enter your password (min. 6 characters)" 
                    value={form.password} 
                    onChange={handleChange} 
                    isInvalid={!!errors.password} 
                    disabled={loading} 
                    className="rounded-pill py-2 px-3"
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="w-100 py-2 rounded-pill fw-semibold" disabled={loading} style={{ backgroundColor: '#0d6efd', border: 'none' }}>
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <small className="text-muted">
                  Already have an account? <Link to="/login" className="text-primary fw-semibold text-decoration-none">Sign in</Link>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
