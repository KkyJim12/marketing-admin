import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  Label,
  Form,
} from "reactstrap";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CreatePage = () => {
  const [sortType, setSortType] = useState("upper");
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle>Add Page</CardTitle>
                  <Row className="gap-2">
                    <Col md={12}>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-Label"
                      >
                        Page Name
                      </Label>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Page Name"
                        />
                      </div>
                    </Col>
                    <Col md={3}>
                      <Label className="col-md-2 col-form-Label">Sort</Label>
                      <div className="d-flex gap-2">
                        <div className="vstack gap-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="sortType"
                              id="upper"
                              value="upper"
                              onChange={e => setSortType("upper")}
                              checked={sortType === "upper"}
                            />
                            <label className="form-check-label" htmlFor="upper">
                              Upper
                            </label>
                          </div>
                        </div>
                        <div className="vstack gap-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="sortType"
                              id="middle"
                              value="middle"
                              onChange={e => setSortType("middle")}
                              checked={sortType === "middle"}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="middle"
                            >
                              Middle
                            </label>
                          </div>
                        </div>
                        <div className="vstack gap-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="sortType"
                              id="lower"
                              value="lower"
                              onChange={e => setSortType("lower")}
                              checked={sortType === "lower"}
                            />
                            <label className="form-check-label" htmlFor="lower">
                              Lower
                            </label>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col className="mt-2" md={12}>
                      {sortType === "upper" || sortType === "lower" ? (
                        <>
                          <div>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Sort"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <select className="form-control">
                            <option>Select Position</option>
                            <option>Between E-commerce and My Product</option>
                            <option>
                              Between My Product and Order History
                            </option>
                          </select>
                        </>
                      )}
                    </Col>
                    <Col md={12}>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-Label"
                      >
                        Sub menu of
                      </Label>
                      <div>
                        <select className="form-control">
                          <option>None</option>
                          <option>About us</option>
                        </select>
                      </div>
                    </Col>

                    <Col md={12}>
                      <Form method="post" className="wysiwyg-custom">
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                        />
                      </Form>
                    </Col>

                    <Col className="gap-2 d-grid" md={12}>
                      <button className="btn btn-success mt-3" type="submit">
                        Add Page
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

export default CreatePage;
