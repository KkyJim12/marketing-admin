import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [domains, setDomains] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [nameError, setNameError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [domainsError, setDomainsError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageError, setImageError] = useState("");
  const [restError, setRestError] = useState("");

  const resetEditProductError = () => {
    setNameError("");
    setTypeError("");
    setDomainsError("");
    setDurationError("");
    setPriceError("");
    setImageError("");
  };

  useEffect(() => {
    getProduct(); // eslint-disable-next-line
  }, []);

  const uploadImage = async (e) => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/images`,
        formData,
        { headers }
      );
      setImageUrl(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/products/${id}/edit`,
        { headers }
      );

      const product = response.data.data;

      setName(product.name);
      setType(product.type);
      setDomains(product.domains);
      setDuration(product.duration);
      setPrice(product.price);
      setImageUrl(product.image);
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = async (e) => {
    e.preventDefault();
    resetEditProductError();
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/products/${id}`,
        {
          name: name,
          type: type,
          domains: domains,
          duration: duration,
          price: price,
          image: imageUrl,
        },
        { headers }
      );

      navigate("/product");
    } catch (error) {
      const errors = error.response.data.errors;
      if (error.response.status === 422) {
        errors.map((error) => {
          if (error.key === "name") {
            return setNameError(error.message);
          } else if (error.key === "type") {
            return setTypeError(error.message);
          } else if (error.key === "domains") {
            return setDomainsError(error.message);
          } else if (error.key === "duration") {
            return setDurationError(error.message);
          } else if (error.key === "price") {
            return setPriceError(error.message);
          } else if (error.key === "image") {
            return setImageError(error.message);
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
                  <CardTitle>Edit Product</CardTitle>
                  {restError && <Alert color="danger">{restError}</Alert>}
                  <Form onSubmit={editProduct}>
                    <Row className="gap-2">
                      <Col md={12}>
                        <Label className="col-md-2 col-form-Label">
                          Product Name
                        </Label>
                        <div>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          {nameError && (
                            <small className="text-danger">{nameError}</small>
                          )}
                        </div>
                      </Col>
                      <Col md={12}>
                        <Label className="col-md-2 col-form-Label">
                          Product Type
                        </Label>
                        <div>
                          <select
                            onChange={(e) => setType(e.target.value)}
                            className="form-control"
                          >
                            <option value="">Please choose product type</option>
                            <option value="Floating Action Button">
                              Floating Action Button
                            </option>
                          </select>
                          {typeError && (
                            <small className="text-danger">{typeError}</small>
                          )}
                        </div>
                      </Col>
                      <Col md={12}>
                        <Label className="col-md-2 col-form-Label">
                          Domains
                        </Label>
                        <div>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Domains"
                            value={domains}
                            onChange={(e) => setDomains(e.target.value)}
                          />
                          {domainsError && (
                            <small className="text-danger">
                              {domainsError}
                            </small>
                          )}
                        </div>
                      </Col>
                      <Col md={12}>
                        <Label className="col-md-2 col-form-Label">
                          Duration
                        </Label>
                        <div>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                          />
                          {durationError && (
                            <small className="text-danger">
                              {durationError}
                            </small>
                          )}
                        </div>
                      </Col>
                      <Col md={12}>
                        <Label className="col-md-2 col-form-Label">Price</Label>
                        <div>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                          {priceError && (
                            <small className="text-danger">{priceError}</small>
                          )}
                        </div>
                      </Col>
                      <Col md={12}>
                        <Label
                          className="col-md-2 col-form-Label"
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                        >
                          Image
                        </Label>
                        <div>
                          <input
                            onChange={uploadImage}
                            className="form-control"
                            type="file"
                          />
                          {imageError && (
                            <small className="text-danger">{imageError}</small>
                          )}
                        </div>
                      </Col>
                      <Col className="gap-2 d-grid" md={12}>
                        <button className="btn btn-success mt-3" type="submit">
                          Edit Product
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

export default EditProduct;
