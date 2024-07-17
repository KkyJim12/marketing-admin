import React, { useState, useEffect } from "react";
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
  const [sortValue, setSortValue] = useState("");
  const [mainPageId, setMainPageId] = useState(null);
  const [content, setContent] = useState("");

  const [pageChoices, setPageChoices] = useState([]);

  const [nameError, setNameError] = useState("");
  const [sortValueError, setSortValueError] = useState("");
  const [restError, setRestError] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("fas message");
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
    setSortValueError("");
  };

  const handleSelectedIcon = (e) => {
    setSelectedIcon(e.target.value);
  };

  const getPageChoices = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/pages`,
        { headers }
      );
      setPageChoices(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPageChoices(); // eslint-disable-next-line
  }, []);

  const createSubPage = async (e) => {
    e.preventDefault();
    resetCreatePageError();

    console.log(selectedIcon);

    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/sub-pages`,
        {
          name: name,
          sortValue: sortValue,
          mainPageId: mainPageId,
          icon: selectedIcon,
          content: content,
        },
        { headers }
      );

      navigate("/sub-page");
    } catch (error) {
      const errors = error.response.data.errors;
      if (error.response.status === 422) {
        errors.map((error) => {
          if (error.key === "name") {
            return setNameError(error.message);
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

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Form onSubmit={(e) => createSubPage(e)}>
              <Col md={12}>
                <Card>
                  <CardBody>
                    <CardTitle>Add Sub Page</CardTitle>
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
                          Sub Page Name
                        </Label>
                        <div>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Sub Page Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          {nameError && (
                            <small className="text-danger">{nameError}</small>
                          )}
                        </div>
                      </Col>
                      <Col className="mt-2" md={12}>
                        <div>
                          <Label className="col-md-2 col-form-Label">
                            Sort
                          </Label>
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
                      </Col>
                      <Col md={12}>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-Label"
                        >
                          Main Page
                        </Label>
                        <div>
                          <select
                            onChange={(e) => setMainPageId(e.target.value)}
                            className="form-control"
                          >
                            <option value={null}>
                              Please select main page
                            </option>
                            {pageChoices.map((pageChoice) => {
                              return (
                                <option
                                  key={pageChoice.id}
                                  value={pageChoice.id}
                                >
                                  {pageChoice.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
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
                          Create Sub Page
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
