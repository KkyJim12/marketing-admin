import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  Label,
  Form,
  Alert,
} from "reactstrap";

const CreateUser = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInputType, setPasswordInputType] = useState("password");

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [restError, setRestError] = useState("");

  const showPassword = () => {
    if (passwordInputType === "password") {
      setPasswordInputType("text");
    } else {
      setPasswordInputType("password");
    }
  };

  const generatePassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    setPassword(randomPassword);
  };

  const resetCreateUserError = () => {
    setFullNameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setRestError("");
  };

  const createUser = async (e) => {
    e.preventDefault();
    resetCreateUserError();
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/users`,
        { fullName: fullName, email: email, phone: phone, password: password },
        { headers }
      );
      console.log(response);

      navigate("/user");
    } catch (error) {
      const errors = error.response.data.errors;
      if (error.response.status === 422) {
        errors.map((error) => {
          if (error.key === "fullName") {
            return setFullNameError(error.message);
          } else if (error.key === "email") {
            return setEmailError(error.message);
          } else if (error.key === "phone") {
            return setPhoneError(error.message);
          } else if (error.key === "password") {
            return setPasswordError(error.message);
          } else {
            return false;
          }
        });
      } else {
        setRestError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col md={6}>
              <Card>
                <CardBody>
                  <CardTitle>Add User</CardTitle>
                  {restError && <Alert color="danger">{restError}</Alert>}
                  <Form onSubmit={(e) => createUser(e)}>
                    <Row className="gap-2">
                      <Col md={12}>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-Label"
                        >
                          Full Name
                        </Label>
                        <div>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                          {fullNameError && (
                            <small className="text-danger">
                              {fullNameError}
                            </small>
                          )}
                        </div>
                      </Col>
                      <Col md={12}>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-Label"
                        >
                          Email
                        </Label>
                        <div>
                          <input
                            className="form-control"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {emailError && (
                            <small className="text-danger">{emailError}</small>
                          )}
                        </div>
                      </Col>
                      <Col md={12}>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-Label"
                        >
                          Phone
                        </Label>
                        <div>
                          <input
                            className="form-control"
                            type="tel"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          {phoneError && (
                            <small className="text-danger">{phoneError}</small>
                          )}
                        </div>
                      </Col>
                      <Col md={12}>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-Label"
                        >
                          Password
                        </Label>
                        <Row>
                          <Col md={9}>
                            <input
                              className="form-control"
                              type={
                                passwordInputType === "password"
                                  ? "password"
                                  : "text"
                              }
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </Col>
                          <Col className="d-grid gap-2" md={1}>
                            <button
                              onClick={showPassword}
                              type="button"
                              className="btn btn-warning"
                            >
                              <i className="uil-eye"></i>
                            </button>
                          </Col>
                          <Col className="d-grid gap-2" md={2}>
                            <button
                              onClick={generatePassword}
                              type="button"
                              className="btn btn-primary"
                            >
                              Generate
                            </button>
                          </Col>
                        </Row>

                        {passwordError && (
                          <small className="text-danger">{passwordError}</small>
                        )}
                      </Col>

                      <Col className="gap-2 d-grid" md={12}>
                        <button className="btn btn-success mt-3" type="submit">
                          Create User
                        </button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CreateUser;
