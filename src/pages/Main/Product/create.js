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

const CreateProduct = () => {
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col md={6}>
              <Card>
                <CardBody>
                  <CardTitle>Add Product</CardTitle>
                  <Row className="gap-2">
                    <Col md={12}>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-Label"
                      >
                        Product Name
                      </Label>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Product Name"
                        />
                      </div>
                    </Col>
                    <Col md={12}>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-Label"
                      >
                        Product Type
                      </Label>
                      <div>
                        <select className="form-control">
                          <option>Please choose product type</option>
                          <option value="fab">Floating Action Button</option>
                        </select>
                      </div>
                    </Col>
                    <Col md={12}>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-Label"
                      >
                        Domains
                      </Label>
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          placeholder="Domains"
                        />
                      </div>
                    </Col>
                    <Col md={12}>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-Label"
                      >
                        Duration
                      </Label>
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          placeholder="Duration"
                        />
                      </div>
                    </Col>
                    <Col md={12}>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-Label"
                      >
                        Price
                      </Label>
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          placeholder="Price"
                        />
                      </div>
                    </Col>
                    <Col md={12}>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-Label"
                      >
                        Image
                      </Label>
                      <div>
                        <input className="form-control" type="file" />
                      </div>
                    </Col>
                    <Col className="gap-2 d-grid" md={12}>
                      <button className="btn btn-success mt-3" type="submit">
                        Add Product
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

export default CreateProduct;
