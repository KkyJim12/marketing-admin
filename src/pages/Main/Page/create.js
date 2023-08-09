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

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import icons from "./icons.json";

const CreatePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sortType, setSortType] = useState("upper");
  const [sortValue, setSortValue] = useState("");
  const [content, setContent] = useState(() => EditorState.createEmpty());

  const [nameError, setNameError] = useState("");
  const [sortTypeError, setSortTypeError] = useState("");
  const [sortValueError, setSortValueError] = useState("");
  const [restError, setRestError] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("fas message");

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
          content: JSON.stringify(
            draftToHtml(convertToRaw(content.getCurrentContent()))
          ),
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

  const onEditorStateChange = (editorState) => {
    setContent(editorState);
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
                                  <option key={index} value={icon}>
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

                      <Col md={12}>
                        <div className="wysiwyg-custom">
                          <Editor
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            editorState={content}
                            onEditorStateChange={onEditorStateChange}
                          />
                        </div>
                      </Col>

                      <Col className="gap-2 d-grid" md={12}>
                        <button className="btn btn-success mt-3" type="submit">
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
