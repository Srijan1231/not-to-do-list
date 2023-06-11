import { useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { postTask } from "../Helper/axiosHelper";

export const TaskForm = ({ getTaskList }) => {
  const [form, setForm] = useState({});
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const respPromise = postTask(form);
    toast.promise(respPromise, {
      pending: "please wait ....",
    });
    const { status, message } = await respPromise;

    toast[status](message);
    if (status === "success") {
      getTaskList();
    }
  };

  return (
    <Form className=" border p-2 bg-light rounded" onSubmit={handleOnSubmit}>
      <Row className="g-2">
        <Col md="6">
          <Form.Control
            required
            placeholder="Task"
            name="task"
            type="text"
            onChange={handleOnChange}
          />
        </Col>
        <Col md="2">
          <Form.Control
            required
            placeholder="hr/s"
            name="hr"
            type="number"
            onChange={handleOnChange}
          />
        </Col>
        <Col className="d-grid">
          <Button variant="primary" type="submit">
            Add Task
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
