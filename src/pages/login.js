import React, { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, Container, Alert, Spinner, Row, Col } from "react-bootstrap";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
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

    if (!form.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!form.password) {
      newErrors.password = "Password harus diisi";
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
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);

      setMessage({
        type: "success",
        text: "Login berhasil! Mengalihkan ke dashboard...",
      });

      // Redirect ke dashboard setelah 1 detik
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Email atau password salah";
      setMessage({ type: "danger", text: errorMsg });
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
                    <i className="bi bi-person-fill" style={{ fontSize: '30px', color: 'white' }}></i>
                  </div>
                </div>
                <h2 className="fw-bold mb-2">Welcome Back</h2>
                <p className="text-muted mb-0">Sign in to your account</p>
              </div>

              {message.text && (
                <Alert variant={message.type} dismissible onClose={() => setMessage({ type: "", text: "" })} className="mt-3">
                  {message.text}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} className="mt-4">
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
                    placeholder="Enter your password" 
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
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <small className="text-muted">
                  Don't have an account? <Link to="/register" className="text-primary fw-semibold text-decoration-none">Sign up</Link>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
