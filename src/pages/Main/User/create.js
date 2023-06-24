import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  Label,
} from "reactstrap";

const CreateUser = () => {
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col md={6}>
              <Card>
                <CardBody>
                  <CardTitle>Add User</CardTitle>
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
                        />
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
                        />
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
                        />
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
                            type="password"
                            placeholder="Password"
                          />
                        </Col>
                        <Col className="d-grid gap-2" md={1}>
                          <button className="btn btn-warning">
                            <i className="uil-eye"></i>
                          </button>
                        </Col>
                        <Col className="d-grid gap-2" md={2}>
                          <button className="btn btn-primary">Generate</button>
                        </Col>
                      </Row>
                    </Col>

                    <Col className="gap-2 d-grid" md={12}>
                      <button className="btn btn-success mt-3" type="submit">
                        Add User
                      </button>
                    </Col>
                  </Row>
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
