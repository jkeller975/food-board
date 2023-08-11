import React, { useState } from "react";

import "./Register.css";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Registration = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { register } = useAuth();
  let navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const registerUser = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await register(email, password);
      console.log("User registered successfully!");
      setError(null);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error registering user:", error);
    }
    setEmail("");
    setPassword("");
    setError(null);
    props.setPopup(false);
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={registerUser}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Registration;
