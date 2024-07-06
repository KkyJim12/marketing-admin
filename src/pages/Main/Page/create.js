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

import icons from "./icons.json";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import ImageResize from "quill-image-resize-module-react";
import Quill from "quill";
Quill.register("modules/imageResize", ImageResize);

const CreatePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sortType, setSortType] = useState("upper");
  const [sortValue, setSortValue] = useState("");
  const [content, setContent] = useState();

  const [nameError, setNameError] = useState("");
  const [sortTypeError, setSortTypeError] = useState("");
  const [sortValueError, setSortValueError] = useState("");
  const [restError, setRestError] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("uil-chat");

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["link", "image"],
      ["clean"], // remove formatting button
    ],
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  const resetCreatePageError = () => {
    setNameError("");
    setSortTypeError("");
    setSortValueError("");
  };

  const handleSelectedIcon = (e) => {
    setSelectedIcon(e.target.value);
  };

  const createPage = async (e) => {
    e.preventDefault();
    resetCreatePageError();

    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/pages`,
        {
          name: name,
          sortType: sortType,
          sortValue: sortValue,
          icon: selectedIcon,
          content: content,
        },
        { headers }
      );

      navigate("/page");
    } catch (error) {
      const errors = error.response.data.errors;
      if (error.response.status === 422) {
        errors.map((error) => {
          if (error.key === "name") {
            return setNameError(error.message);
          } else if (error.key === "sortType") {
            return setSortTypeError(error.message);
          } else if (error.key === "sortValue") {
            return setSortValueError(error.message);
          } else {
            return false;
          }
        });
      } else {
        setRestError(error.response.data.message);
      }
    }
  };

  const handleSortType = (e) => {
    if (e.target.checked) {
      setSortType(e.target.value);
    }
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Form onSubmit={(e) => createPage(e)}>
              <Col md={12}>
                <Card>
                  <CardBody>
                    <CardTitle>Add Page</CardTitle>
                    {restError && (
                      <Alert className="text-danger alert-danger">
                        {restError}
                      </Alert>
                    )}
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          {nameError && (
                            <small className="text-danger">{nameError}</small>
                          )}
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
                                defaultChecked
                                onChange={handleSortType}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="upper"
                              >
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
                                onChange={handleSortType}
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
                                onChange={handleSortType}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="lower"
                              >
                                Lower
                              </label>
                            </div>
                          </div>
                        </div>
                        {sortTypeError && (
                          <small className="text-danger">{sortTypeError}</small>
                        )}
                      </Col>
                      <Col className="mt-2" md={12}>
                        {sortType === "upper" || sortType === "lower" ? (
                          <>
                            <div>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Sort"
                                value={sortValue}
                                onChange={(e) => setSortValue(e.target.value)}
                              />

                              {sortValueError && (
                                <small className="text-danger">
                                  {sortValueError}
                                </small>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <select
                              onChange={(e) => setSortValue(e.target.value)}
                              className="form-control"
                            >
                              <option value={null}>Select Position</option>
                              <option value={1}>
                                Between E-commerce and My Product
                              </option>
                              <option value={2}>
                                Between My Product and Order History
                              </option>
                            </select>
                            {sortValueError && (
                              <small className="text-danger">
                                {sortValueError}
                              </small>
                            )}
                          </>
                        )}
                      </Col>

                      <Col md={12}>
                        <div className="form-floating mb-3">
                          <select
                            className="form-select"
                            id="floatingSelectGrid"
                            aria-label="Floating label select example"
                            onChange={handleSelectedIcon}
                            value={selectedIcon}
                          >
                            {icons &&
                              icons.data.map((icon, index) => {
                                return (
                                  <option key={index} value={"uil-" + icon}>
                                    {icon}
                                  </option>
                                );
                              })}
                          </select>
                          <label htmlFor="floatingSelectGrid">
                            Select Icon ({icons.data.length})
                          </label>
                        </div>
                      </Col>

                      <Col style={{ height: 700 }} md={12}>
                        <ReactQuill
                          style={{ height: "90%" }}
                          modules={modules}
                          theme="snow"
                          value={content}
                          onChange={setContent}
                        />
                      </Col>

                      <Col className="gap-2 d-grid" md={12}>
                        <button className="btn btn-primary mt-3" type="submit">
                          Create Page
                        </button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Form>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CreatePage;
