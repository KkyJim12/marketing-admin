import React from "react";
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

const EditPage = () => {
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle>Edit Page</CardTitle>
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
                    <Col md={12}>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-Label"
                      >
                        Sort
                      </Label>
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          placeholder="sort"
                        />
                      </div>
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
                        Update Page
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

export default EditPage;
