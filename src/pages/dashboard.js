import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Container, Alert, Spinner, Badge, Row, Col, Card, Placeholder } from "react-bootstrap";
import api from "../api/api";
import Navbar from "../components/navbar";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchData = async () => {
    try {
      setFetchLoading(true);
      const res = await api.get("/items");
      setItems(res.data);
    } catch (err) {
      setMessage({
        type: "danger",
        text: "Failed to load data. Please refresh the page.",
      });
    } finally {
      setFetchLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    } else if (form.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    } else if (form.description.trim().length < 5) {
      newErrors.description = "Description must be at least 5 characters";
    }

    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        await api.put(`/items/${editId}`, form);
        setMessage({ type: "success", text: "Data updated successfully!" });
      } else {
        await api.post("/items", form);
        setMessage({ type: "success", text: "Data added successfully!" });
      }

      setForm({ title: "", description: "" });
      setErrors({});
      setEditId(null);
      setShow(false);
      fetchData();

      // Auto hide message setelah 3 detik
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to save data";
      setMessage({ type: "danger", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await api.delete(`/items/${id}`);
      setMessage({ type: "success", text: "Data deleted successfully!" });
      fetchData();

      // Auto hide message setelah 3 detik
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);
    } catch (err) {
      setMessage({ type: "danger", text: "Failed to delete data" });
    }
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, description: item.description });
    setEditId(item.id);
    setErrors({});
    setShow(true);
  };

  const handleAdd = () => {
    setForm({ title: "", description: "" });
    setEditId(null);
    setErrors({});
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setForm({ title: "", description: "" });
    setErrors({});
    setEditId(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error saat user mulai mengetik
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Container className="py-4">
        <Row className="mb-4">
          <Col xs={12} md={8}>
            <h2 className="fw-bold mb-1">Dashboard</h2>
            <p className="text-muted mb-0">
              Manage your data <Badge bg="primary" className="px-3 py-2">{items.length} Items</Badge>
            </p>
          </Col>
          <Col xs={12} md={4} className="d-flex justify-content-md-end">
            <Button 
              variant="primary" 
              onClick={handleAdd}
              className="d-flex align-items-center justify-content-center px-4 py-2"
            >
              <i className="bi bi-plus-circle me-2"></i> Add New Item
            </Button>
          </Col>
        </Row>

        {message.text && (
          <Alert variant={message.type} dismissible onClose={() => setMessage({ type: "", text: "" })} className="mb-4 rounded-3">
            {message.text}
          </Alert>
        )}

        {fetchLoading ? (
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <Placeholder as="div" animation="glow">
                <Placeholder xs={12} size="lg" className="mb-4" />
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="d-flex align-items-center mb-3">
                    <Placeholder xs={1} className="me-3" />
                    <Placeholder xs={3} className="me-3" />
                    <Placeholder xs={6} />
                  </div>
                ))}
              </Placeholder>
            </Card.Body>
          </Card>
        ) : items.length === 0 ? (
          <Card className="border-0 shadow-sm text-center p-5">
            <div className="d-flex justify-content-center mb-4">
              <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                <i className="bi bi-inbox" style={{ fontSize: '40px', color: '#6c757d' }}></i>
              </div>
            </div>
            <h4 className="text-muted">No Data Available</h4>
            <p className="text-muted mb-4">Click the "Add New Item" button to create your first item</p>
            <Button 
              variant="outline-primary" 
              onClick={handleAdd}
              className="mx-auto d-flex align-items-center justify-content-center px-4"
            >
              <i className="bi bi-plus-circle me-2"></i> Create First Item
            </Button>
          </Card>
        ) : (
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table className="mb-0" striped hover>
                  <thead className="table-light">
                    <tr>
                      <th className="border-top-0" style={{ width: "60px" }}>#</th>
                      <th className="border-top-0">Title</th>
                      <th className="border-top-0">Description</th>
                      <th className="border-top-0" style={{ width: "200px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, i) => (
                      <tr key={item.id}>
                        <td className="align-middle text-center">{i + 1}</td>
                        <td className="align-middle">
                          <strong className="text-primary">{item.title}</strong>
                        </td>
                        <td className="align-middle">{item.description}</td>
                        <td className="align-middle">
                          <div className="d-flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline-warning" 
                              onClick={() => handleEdit(item)}
                              className="d-flex align-items-center"
                            >
                              <i className="bi bi-pencil me-1"></i> Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline-danger" 
                              onClick={() => handleDelete(item.id, item.title)}
                              className="d-flex align-items-center"
                            >
                              <i className="bi bi-trash me-1"></i> Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        )}

        {/* Modal untuk Tambah/Edit Data */}
        <Modal show={show} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton className="border-bottom-0">
            <Modal.Title className="fw-bold">
              {editId ? <><i className="bi bi-pencil me-2"></i> Edit Item</> : <><i className="bi bi-plus-circle me-2"></i> Add New Item</>}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-4" controlId="formTitle">
                <Form.Label className="fw-semibold">
                  Title <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control 
                  name="title" 
                  placeholder="Enter title" 
                  value={form.title} 
                  onChange={handleChange} 
                  isInvalid={!!errors.title} 
                  disabled={loading} 
                  className="rounded-2 py-2"
                />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-0" controlId="formDescription">
                <Form.Label className="fw-semibold">
                  Description <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={5} 
                  name="description" 
                  placeholder="Enter description" 
                  value={form.description} 
                  onChange={handleChange} 
                  isInvalid={!!errors.description} 
                  disabled={loading} 
                  className="rounded-2 py-2"
                />
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-top-0 pt-0">
            <Button variant="outline-secondary" onClick={handleClose} disabled={loading} className="px-4">
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSave} 
              disabled={loading}
              className="px-4 d-flex align-items-center"
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-save me-2"></i>
                  {editId ? "Update" : "Save"}
                </>
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Dashboard;
